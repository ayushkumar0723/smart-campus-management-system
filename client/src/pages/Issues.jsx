import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import { AlertTriangle, Search, Plus, CheckCircle2, Clock, MapPin, Tag } from 'lucide-react';

const Issues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [category, setCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'IT & WiFi',
    priority: 'Medium',
    location: ''
  });

  const fetchIssues = async () => {
    try {
      const res = await api.get('/issues', {
        params: { search, status, priority, category }
      });
      if (res.data.success) {
        setIssues(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching issues:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [search, status, priority, category]);

  const handleCreateIssue = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/issues', formData);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Campus grievance logged successfully! Ticket generated.' });
        setIsModalOpen(false);
        setFormData({
          title: '',
          description: '',
          category: 'IT & WiFi',
          priority: 'Medium',
          location: ''
        });
        fetchIssues();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Failed to submit grievance' });
    }
  };

  const handleStatusChange = async (issueId, newStatus) => {
    try {
      const notes = prompt('Enter resolution or update remarks (optional):') || '';
      const res = await api.put(`/issues/${issueId}/status`, {
        status: newStatus,
        resolutionNotes: notes
      });
      if (res.data.success) {
        setAlert({ type: 'success', message: `Ticket status updated to ${newStatus}` });
        fetchIssues();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Could not update status' });
    }
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'Urgent': return <span className="badge badge-red">Urgent</span>;
      case 'High': return <span className="badge badge-amber">High</span>;
      case 'Medium': return <span className="badge badge-blue">Medium</span>;
      default: return <span className="badge badge-purple">Low</span>;
    }
  };

  const getStatusBadge = (s) => {
    switch (s) {
      case 'Resolved': return <span className="badge badge-green"><CheckCircle2 size={12} /> Resolved</span>;
      case 'In Progress': return <span className="badge badge-amber"><Clock size={12} /> In Progress</span>;
      default: return <span className="badge badge-blue"><Clock size={12} /> Open</span>;
    }
  };

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertTriangle size={28} color="#fb7185" />
            Campus Grievance & Maintenance System
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Report infrastructure defects, track maintenance resolution workflows, and notify campus facility teams
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={18} />
          <span>Report Campus Issue</span>
        </button>
      </div>

      {alert.message && (
        <div style={{ 
          padding: '0.85rem 1.25rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '1.25rem',
          backgroundColor: alert.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
          color: alert.type === 'success' ? '#34d399' : '#fb7185',
          border: `1px solid ${alert.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`
        }}>
          {alert.message}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by issue title, location, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select className="filter-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="IT & WiFi">IT & WiFi</option>
          <option value="Classroom Infrastructure">Classroom Infrastructure</option>
          <option value="Hostel">Hostel</option>
          <option value="Electrical">Electrical</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="Library">Library</option>
        </select>
      </div>

      {/* Issues Table or Cards */}
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading grievance records...</p>
      ) : issues.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No grievance tickets found for the specified filters.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {issues.map(issue => (
            <div key={issue._id} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span className="badge badge-purple">{issue.category}</span>
                    {getPriorityBadge(issue.priority)}
                    {getStatusBadge(issue.status)}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{issue.title}</h3>
                </div>

                {/* Workflow Status Controls for Staff/Admin */}
                {(user?.role === 'admin' || user?.role === 'faculty') && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {issue.status !== 'In Progress' && (
                      <button
                        onClick={() => handleStatusChange(issue._id, 'In Progress')}
                        className="btn btn-secondary btn-sm"
                      >
                        Set In Progress
                      </button>
                    )}
                    {issue.status !== 'Resolved' && (
                      <button
                        onClick={() => handleStatusChange(issue._id, 'Resolved')}
                        className="btn btn-primary btn-sm"
                      >
                        Resolve Ticket
                      </button>
                    )}
                  </div>
                )}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                {issue.description}
              </p>

              {issue.resolutionNotes && (
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', fontSize: '0.825rem', color: '#34d399' }}>
                  <strong>Resolution Update:</strong> {issue.resolutionNotes}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-subtle)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <span>📍 Location: <strong>{issue.location}</strong></span>
                <span>👤 Reported by: <strong>{issue.reportedByName || 'Student'}</strong></span>
                <span>🛠️ Assigned: <strong>{issue.assignedTo}</strong></span>
                <span>🕒 {new Date(issue.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Issue Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Campus Grievance / Maintenance">
        <form onSubmit={handleCreateIssue}>
          <div className="form-group">
            <label>Issue Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. WiFi down in Block C Room 204"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Issue Category</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="IT & WiFi">IT & WiFi</option>
                <option value="Classroom Infrastructure">Classroom Infrastructure</option>
                <option value="Hostel">Hostel</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Library">Library</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority Severity</label>
              <select
                className="form-control"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Low">Low (Informational)</option>
                <option value="Medium">Medium (Standard)</option>
                <option value="High">High (Impacting Study)</option>
                <option value="Urgent">Urgent (Safety / Critical)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Exact Location (Building, Room, Floor)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Central Library, 2nd Floor East Wing"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Detailed Description</label>
            <textarea
              className="form-control"
              placeholder="Provide symptoms, time observed, devices impacted..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Generate Ticket
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Issues;
