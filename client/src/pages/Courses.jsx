import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import { BookOpen, Search, Plus, Trash2, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [semester, setSemester] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    code: '',
    title: '',
    department: 'Computer Science & Engineering',
    credits: 4,
    semester: 'Semester 5',
    instructor: '',
    description: '',
    schedule: 'Mon/Wed 10:00 AM - 11:30 AM',
    maxCapacity: 60
  });

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses', {
        params: { search, department, semester }
      });
      if (res.data.success) {
        setCourses(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [search, department, semester]);

  const handleEnrollToggle = async (courseId) => {
    try {
      const res = await api.post(`/courses/${courseId}/enroll`);
      if (res.data.success) {
        setAlert({ type: 'success', message: res.data.message });
        fetchCourses();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Enrollment failed' });
      setTimeout(() => setAlert({ type: '', message: '' }), 3000);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/courses', formData);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Course created successfully!' });
        setIsModalOpen(false);
        setFormData({
          code: '',
          title: '',
          department: 'Computer Science & Engineering',
          credits: 4,
          semester: 'Semester 5',
          instructor: '',
          description: '',
          schedule: 'Mon/Wed 10:00 AM - 11:30 AM',
          maxCapacity: 60
        });
        fetchCourses();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Failed to create course' });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await api.delete(`/courses/${courseId}`);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Course deleted successfully' });
        fetchCourses();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Could not delete course' });
    }
  };

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookOpen size={28} color="var(--primary)" />
            Course Catalog & Curriculum
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Browse accredited courses, syllabus specifications, and manage student enrollments
          </p>
        </div>

        {(user?.role === 'admin' || user?.role === 'faculty') && (
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>Add New Course</span>
          </button>
        )}
      </div>

      {alert.message && (
        <div style={{ 
          padding: '0.85rem 1.25rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '1.25rem',
          backgroundColor: alert.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
          color: alert.type === 'success' ? '#34d399' : '#fb7185',
          border: `1px solid ${alert.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {alert.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by course code, title, or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="filter-select" value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="Computer Science & Engineering">Computer Science & Engineering</option>
          <option value="Electronics & Communication">Electronics & Communication</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
        </select>

        <select className="filter-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="All">All Semesters</option>
          <option value="Semester 1">Semester 1</option>
          <option value="Semester 2">Semester 2</option>
          <option value="Semester 3">Semester 3</option>
          <option value="Semester 4">Semester 4</option>
          <option value="Semester 5">Semester 5</option>
          <option value="Semester 6">Semester 6</option>
          <option value="Semester 7">Semester 7</option>
          <option value="Semester 8">Semester 8</option>
        </select>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading course catalog...</p>
      ) : courses.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No courses match your active search filters.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {courses.map(course => {
            const isEnrolled = course.enrolledStudents?.includes(user?.id);
            const enrolledCount = course.enrolledStudents?.length || 0;
            const capacityRatio = (enrolledCount / (course.maxCapacity || 60)) * 100;

            return (
              <div key={course._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.825rem', fontWeight: 700 }}>
                      {course.code}
                    </span>
                    <span className="badge badge-blue">
                      {course.credits} Credits
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {course.department} &bull; {course.semester}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
                    {course.description || 'Comprehensive foundational course.'}
                  </p>

                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <div>👨‍🏫 <strong>Instructor:</strong> {course.instructor}</div>
                    <div style={{ marginTop: '3px' }}>⏰ <strong>Schedule:</strong> {course.schedule}</div>
                  </div>

                  {/* Enrollment Progress */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-subtle)', marginBottom: '4px' }}>
                      <span>Enrolled Capacity</span>
                      <span>{enrolledCount} / {course.maxCapacity || 60}</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${Math.min(capacityRatio, 100)}%`, 
                          height: '100%', 
                          backgroundColor: capacityRatio >= 90 ? '#f43f5e' : '#10b981',
                          borderRadius: 'var(--radius-full)'
                        }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                  {user?.role === 'student' && (
                    <button
                      onClick={() => handleEnrollToggle(course._id)}
                      className={`btn ${isEnrolled ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                      style={{ flex: 1 }}
                    >
                      {isEnrolled ? (
                        <>
                          <CheckCircle2 size={15} color="#34d399" />
                          <span>Enrolled (Drop)</span>
                        </>
                      ) : (
                        <>
                          <UserCheck size={15} />
                          <span>Enroll Course</span>
                        </>
                      )}
                    </button>
                  )}

                  {user?.role === 'admin' && (
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="btn btn-danger btn-sm"
                      title="Delete Course"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Course Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Course Module">
        <form onSubmit={handleCreateCourse}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Course Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. CS-450"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Course Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Cloud Native DevOps"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Department</label>
              <select
                className="form-control"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label>Credits</label>
              <input
                type="number"
                className="form-control"
                min="1"
                max="6"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Semester</label>
              <select
                className="form-control"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              >
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Semester 3">Semester 3</option>
                <option value="Semester 4">Semester 4</option>
                <option value="Semester 5">Semester 5</option>
                <option value="Semester 6">Semester 6</option>
                <option value="Semester 7">Semester 7</option>
                <option value="Semester 8">Semester 8</option>
              </select>
            </div>
            <div className="form-group">
              <label>Lead Instructor</label>
              <input
                type="text"
                className="form-control"
                placeholder="Prof. Name"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Weekly Schedule</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Mon/Wed 10:00 AM - 11:30 AM"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Course Syllabus Overview</label>
            <textarea
              className="form-control"
              placeholder="Describe core topics covered, prerequisites..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Course
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Courses;
