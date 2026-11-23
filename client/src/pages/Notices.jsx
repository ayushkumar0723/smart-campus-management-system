import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import { Megaphone, Search, Plus, Pin, Trash2, Calendar, UserCheck } from 'lucide-react';

const Notices = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [audience, setAudience] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Academic',
    isPinned: false,
    targetAudience: 'All'
  });

  const fetchNotices = async () => {
    try {
      const res = await api.get('/notices', {
        params: { search, category, audience }
      });
      if (res.data.success) {
        setNotices(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [search, category, audience]);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/notices', formData);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Notice published successfully!' });
        setIsModalOpen(false);
        setFormData({
          title: '',
          content: '',
          category: 'Academic',
          isPinned: false,
          targetAudience: 'All'
        });
        fetchNotices();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Publishing failed' });
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await api.delete(`/notices/${id}`);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Notice removed.' });
        fetchNotices();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Could not delete notice' });
    }
  };

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Megaphone size={28} color="var(--accent-cyan)" />
            Smart Campus Notice Board
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Official announcements, academic exam schedules, and placement drive notifications
          </p>
        </div>

        {(user?.role === 'admin' || user?.role === 'faculty') && (
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>Publish Circular</span>
          </button>
        )}
      </div>

      {alert.message && (
        <div style={{ 
          padding: '0.85rem 1.25rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '1.25rem',
          backgroundColor: alert.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
          color: alert.type === 'success' ? '#34d399' : '#fb7185'
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
            placeholder="Search circulars by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Academic">Academic</option>
          <option value="Placement">Placement</option>
          <option value="Event">Event</option>
          <option value="Urgent">Urgent</option>
          <option value="General">General</option>
        </select>

        <select className="filter-select" value={audience} onChange={(e) => setAudience(e.target.value)}>
          <option value="All">All Audiences</option>
          <option value="Students">Students Only</option>
          <option value="Faculty">Faculty Only</option>
        </select>
      </div>

      {/* Notices Feed */}
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading campus notices...</p>
      ) : notices.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No notices found matching the filters.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notices.map(notice => (
            <div 
              key={notice._id} 
              className="card"
              style={{
                borderLeft: notice.isPinned ? '4px solid #6366f1' : '1px solid var(--border-color)',
                backgroundColor: notice.isPinned ? 'rgba(79, 70, 229, 0.05)' : 'var(--bg-surface)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    {notice.isPinned && (
                      <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <Pin size={11} /> Pinned
                      </span>
                    )}
                    <span className="badge badge-blue">{notice.category}</span>
                    <span className="badge badge-green">For: {notice.targetAudience}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{notice.title}</h3>
                </div>

                {user?.role === 'admin' && (
                  <button 
                    onClick={() => handleDeleteNotice(notice._id)}
                    className="btn btn-danger btn-sm"
                    title="Remove Notice"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                {notice.content}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-subtle)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <span>✍️ Published by: <strong>{notice.author}</strong></span>
                <span>📅 {new Date(notice.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Publish Notice Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Publish Official Campus Circular">
        <form onSubmit={handleCreateNotice}>
          <div className="form-group">
            <label>Circular Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Mid-Term Examination Schedule"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Academic">Academic</option>
                <option value="Placement">Placement</option>
                <option value="Event">Event</option>
                <option value="Urgent">Urgent Alert</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="form-group">
              <label>Target Audience</label>
              <select
                className="form-control"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              >
                <option value="All">All Campus</option>
                <option value="Students">Students Only</option>
                <option value="Faculty">Faculty Only</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
              />
              <span>Pin this notice to top of campus board</span>
            </label>
          </div>

          <div className="form-group">
            <label>Circular Full Announcement Text</label>
            <textarea
              className="form-control"
              style={{ minHeight: '120px' }}
              placeholder="Enter full body text..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Publish Notice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Notices;
