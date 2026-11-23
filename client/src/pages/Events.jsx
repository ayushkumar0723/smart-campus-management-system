import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import { CalendarDays, Search, Plus, CheckCircle, Users, MapPin, Clock } from 'lucide-react';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tech Fest',
    venue: '',
    date: '2026-12-15',
    time: '10:00 AM - 03:00 PM',
    organizer: '',
    capacity: 150
  });

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events', {
        params: { search, category }
      });
      if (res.data.success) {
        setEvents(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, category]);

  const handleRsvpToggle = async (eventId) => {
    try {
      const res = await api.post(`/events/${eventId}/rsvp`);
      if (res.data.success) {
        setAlert({ type: 'success', message: res.data.message });
        fetchEvents();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'RSVP failed' });
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/events', formData);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Event organized successfully!' });
        setIsModalOpen(false);
        setFormData({
          title: '',
          description: '',
          category: 'Tech Fest',
          venue: '',
          date: '2026-12-15',
          time: '10:00 AM - 03:00 PM',
          organizer: '',
          capacity: 150
        });
        fetchEvents();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Failed to create event' });
    }
  };

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CalendarDays size={28} color="#f59e0b" />
            Campus Events & Hackathons
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Seminars, tech conventions, cultural events, and hackathon registration portals
          </p>
        </div>

        {(user?.role === 'admin' || user?.role === 'faculty') && (
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>Organize Event</span>
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
            placeholder="Search events by name, venue, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Event Categories</option>
          <option value="Tech Fest">Tech Fest</option>
          <option value="Workshop">Workshop</option>
          <option value="Cultural">Cultural</option>
          <option value="Seminar">Seminar</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      {/* Events Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading campus events...</p>
      ) : events.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No campus events match your search query.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {events.map(event => {
            const isAttending = event.attendees?.includes(user?.id);
            const attendeesCount = event.attendees?.length || 0;

            return (
              <div key={event._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-amber">{event.category}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                      📅 {event.date}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    {event.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
                    {event.description}
                  </p>

                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div>📍 <strong>Venue:</strong> {event.venue}</div>
                    <div>⏰ <strong>Time:</strong> {event.time}</div>
                    <div>🏛️ <strong>Host:</strong> {event.organizer}</div>
                  </div>
                </div>

                {/* RSVP registration control */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.6rem' }}>
                    <span>Registrations</span>
                    <span>{attendeesCount} / {event.capacity} seats</span>
                  </div>

                  <button
                    onClick={() => handleRsvpToggle(event._id)}
                    className={`btn ${isAttending ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                    style={{ width: '100%' }}
                  >
                    {isAttending ? (
                      <>
                        <CheckCircle size={15} color="#34d399" />
                        <span>Registered (Cancel RSVP)</span>
                      </>
                    ) : (
                      <>
                        <Users size={15} />
                        <span>RSVP Register</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Organize Event Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule New Campus Event">
        <form onSubmit={handleCreateEvent}>
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. AI & Cloud Native Hackathon"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Event Category</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Tech Fest">Tech Fest</option>
                <option value="Workshop">Workshop</option>
                <option value="Cultural">Cultural</option>
                <option value="Seminar">Seminar</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                className="form-control"
                min="10"
                max="2000"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Time Slot</label>
              <input
                type="text"
                className="form-control"
                placeholder="10:00 AM - 04:00 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Campus Venue Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Auditorium 1, Central Campus"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Event Details & Agenda</label>
            <textarea
              className="form-control"
              placeholder="Describe speakers, hands-on tasks, registration criteria..."
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
              Publish Event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Events;
