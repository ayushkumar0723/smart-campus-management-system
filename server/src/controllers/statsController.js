const { Users, Courses, Classrooms, Issues, Notices, Events } = require('../models/dataStore');
const { getDBStatus } = require('../config/db');

// Aggregated Dashboard Statistics
const getDashboardStats = async (req, res, next) => {
  try {
    const users = await Users.find();
    const courses = await Courses.find();
    const classrooms = await Classrooms.find();
    const issues = await Issues.find();
    const notices = await Notices.find();
    const events = await Events.find();

    const studentsCount = users.filter(u => u.role === 'student').length;
    const facultyCount = users.filter(u => u.role === 'faculty').length;
    const adminCount = users.filter(u => u.role === 'admin').length;

    const availableRooms = classrooms.filter(c => c.status === 'Available').length;
    const occupiedRooms = classrooms.filter(c => c.status === 'Occupied').length;
    const maintenanceRooms = classrooms.filter(c => c.status === 'Maintenance').length;

    const openIssues = issues.filter(i => i.status === 'Open').length;
    const inProgressIssues = issues.filter(i => i.status === 'In Progress').length;
    const resolvedIssues = issues.filter(i => i.status === 'Resolved').length;
    const urgentIssues = issues.filter(i => i.priority === 'Urgent').length;

    const recentIssues = [...issues]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const pinnedNotices = notices.filter(n => n.isPinned);
    const recentNotices = [...notices]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);

    const upcomingEvents = [...events]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);

    res.json({
      success: true,
      systemStatus: getDBStatus(),
      counts: {
        totalUsers: users.length,
        students: studentsCount,
        faculty: facultyCount,
        admins: adminCount,
        courses: courses.length,
        classrooms: classrooms.length,
        availableRooms,
        occupiedRooms,
        maintenanceRooms,
        totalIssues: issues.length,
        openIssues,
        inProgressIssues,
        resolvedIssues,
        urgentIssues,
        totalNotices: notices.length,
        totalEvents: events.length
      },
      recentIssues,
      pinnedNotices,
      recentNotices,
      upcomingEvents
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats };
