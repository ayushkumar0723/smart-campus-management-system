process.env.NODE_ENV = 'test';

const request = require('supertest');
const { app } = require('../src/server');
const { connectDB } = require('../src/config/db');
const { initDataStore } = require('../src/models/dataStore');

async function runTests() {
  console.log('🧪 Starting Smart Campus Management System API Test Suite...\n');

  await connectDB();
  await initDataStore();

  let passed = 0;
  let total = 0;

  const assert = (condition, description) => {
    total++;
    if (condition) {
      console.log(`  ✅ [PASS] ${description}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${description}`);
      throw new Error(`Assertion failed: ${description}`);
    }
  };

  try {
    // 1. Health Check
    const health = await request(app).get('/api/health');
    assert(health.status === 200 && health.body.status === 'ok', 'Health Check endpoint (/api/health) returns 200 OK');

    // 2. Admin Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@campus.edu', password: 'Admin@123' });
    assert(loginRes.status === 200 && loginRes.body.token, 'Admin login returns 200 and valid JWT token');
    const adminToken = loginRes.body.token;

    // 3. Current User (/api/auth/me)
    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${adminToken}`);
    assert(meRes.status === 200 && meRes.body.user.role === 'admin', 'Fetch current user (/api/auth/me) verifies admin role');

    // 4. Student Login
    const studentLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@campus.edu', password: 'Student@123' });
    assert(studentLogin.status === 200 && studentLogin.body.user.role === 'student', 'Student login returns valid profile');
    const studentToken = studentLogin.body.token;

    // 5. Dashboard Stats
    const statsRes = await request(app).get('/api/stats');
    assert(statsRes.status === 200 && statsRes.body.counts.courses >= 5, 'Stats endpoint aggregates courses and counts accurately');

    // 6. Course List & Search Filter
    const coursesRes = await request(app).get('/api/courses?search=Full-Stack');
    assert(coursesRes.status === 200 && coursesRes.body.count >= 1, 'Course search by keyword "Full-Stack" finds matching courses');

    // 7. Course Enrollment Toggle by Student
    const firstCourse = coursesRes.body.data[0];
    const enrollRes = await request(app)
      .post(`/api/courses/${firstCourse._id}/enroll`)
      .set('Authorization', `Bearer ${studentToken}`);
    assert(enrollRes.status === 200, 'Student course enrollment toggle succeeds with 200 status');

    // 8. Classrooms List & Availability Filter
    const classRes = await request(app).get('/api/classrooms?status=Available');
    assert(classRes.status === 200 && classRes.body.data.every(c => c.status === 'Available'), 'Classroom filter by status "Available" returns only available rooms');

    // 9. Report Campus Grievance / Maintenance Ticket
    const issueRes = await request(app)
      .post('/api/issues')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        title: 'Lab 1A Workstation 08 Blue Screen error',
        description: 'System won\'t boot into Linux partition',
        category: 'IT & WiFi',
        priority: 'Medium',
        location: 'Turing Tower, Lab 1A'
      });
    assert(issueRes.status === 201 && issueRes.body.data.status === 'Open', 'Creating grievance ticket returns 201 Created');

    // 10. Admin Update Issue Status
    const newIssueId = issueRes.body.data._id;
    const updateIssue = await request(app)
      .put(`/api/issues/${newIssueId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        status: 'In Progress',
        resolutionNotes: 'Technician dispatched with recovery flash drive'
      });
    assert(updateIssue.status === 200 && updateIssue.body.data.status === 'In Progress', 'Admin updating issue status to In Progress succeeds');

    // 11. Notices Fetch & Pinned sorting
    const noticesRes = await request(app).get('/api/notices');
    assert(noticesRes.status === 200 && noticesRes.body.data[0].isPinned === true, 'Notices endpoint returns pinned notices at top of list');

    // 12. Campus Events List & RSVP
    const eventsRes = await request(app).get('/api/events');
    assert(eventsRes.status === 200 && eventsRes.body.data.length >= 3, 'Events endpoint lists campus events');
    const firstEvent = eventsRes.body.data[0];
    const rsvpRes = await request(app)
      .post(`/api/events/${firstEvent._id}/rsvp`)
      .set('Authorization', `Bearer ${studentToken}`);
    assert(rsvpRes.status === 200, 'RSVP registration toggle succeeds');

    console.log(`\n🎉 All ${passed}/${total} automated backend tests PASSED successfully!\n`);
    process.exit(0);
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exit(1);
  }
}

runTests();
