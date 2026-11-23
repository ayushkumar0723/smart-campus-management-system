import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import { Building2, Search, Plus, CheckCircle, Clock, Wrench, ShieldAlert } from 'lucide-react';

const Classrooms = () => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [type, setType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    roomNumber: '',
    building: 'Main Academic Block A',
    capacity: 60,
    type: 'Lecture Hall',
    features: '4K Projector, Central AC, Smart Board',
    status: 'Available'
  });

  const fetchClassrooms = async () => {
    try {
      const res = await api.get('/classrooms', {
        params: { search, status, type }
      });
      if (res.data.success) {
        setClassrooms(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching classrooms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, [search, status, type]);

  const handleToggleBooking = async (roomId, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'Occupied' : 'Available';
    try {
      const res = await api.post(`/classrooms/${roomId}/book`, {
        status: newStatus,
        currentClass: newStatus === 'Occupied' ? `${user?.name} Session` : ''
      });
      if (res.data.success) {
        setAlert({ type: 'success', message: res.data.message });
        fetchClassrooms();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Update failed' });
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/classrooms', {
        ...formData,
        features: formData.features.split(',').map(f => f.trim())
      });
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Classroom registered successfully!' });
        setIsModalOpen(false);
        setFormData({
          roomNumber: '',
          building: 'Main Academic Block A',
          capacity: 60,
          type: 'Lecture Hall',
          features: '4K Projector, Central AC, Smart Board',
          status: 'Available'
        });
        fetchClassrooms();
        setTimeout(() => setAlert({ type: '', message: '' }), 3000);
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Failed to add room' });
    }
  };

  const getStatusBadge = (roomStatus) => {
    switch (roomStatus) {
      case 'Available':
        return <span className="badge badge-green"><CheckCircle size={12} /> Available</span>;
      case 'Occupied':
        return <span className="badge badge-amber"><Clock size={12} /> Occupied</span>;
      default:
        return <span className="badge badge-red"><Wrench size={12} /> Maintenance</span>;
    }
  };

  return (
    <div className="page-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Building2 size={28} color="var(--primary)" />
            Classrooms & Computing Labs
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time occupancy tracking, smart scheduling, and facility infrastructure status
          </p>
        </div>

        {user?.role === 'admin' && (
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>Register Facility</span>
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
            placeholder="Search by room number, building, or features..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <select className="filter-select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="All">All Facility Types</option>
          <option value="Lecture Hall">Lecture Hall</option>
          <option value="Computer Lab">Computer Lab</option>
          <option value="Seminar Hall">Seminar Hall</option>
          <option value="Discussion Room">Discussion Room</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading campus facilities...</p>
      ) : classrooms.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No classrooms match the selected filters.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {classrooms.map(room => (
            <div key={room._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {room.roomNumber}
                  </span>
                  {getStatusBadge(room.status)}
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  {room.type} &bull; Capacity: {room.capacity} seats
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  🏛️ {room.building}
                </div>

                {room.status === 'Occupied' && room.currentClass && (
                  <div style={{ padding: '0.6rem 0.8rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-sm)', marginBottom: '0.85rem', fontSize: '0.8rem', color: '#fbbf24' }}>
                    <strong>In Session:</strong> {room.currentClass}
                    {room.bookedBy && <div><strong>Reserved by:</strong> {room.bookedBy}</div>}
                  </div>
                )}

                {/* Features Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {room.features && room.features.map((feat, idx) => (
                    <span key={idx} style={{ fontSize: '0.725rem', padding: '0.2rem 0.5rem', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', gap: '0.5rem' }}>
                {(user?.role === 'admin' || user?.role === 'faculty') ? (
                  <button
                    onClick={() => handleToggleBooking(room._id, room.status)}
                    className={`btn ${room.status === 'Available' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    style={{ width: '100%' }}
                    disabled={room.status === 'Maintenance'}
                  >
                    {room.status === 'Available' ? 'Reserve Facility' : 'Release Facility'}
                  </button>
                ) : (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', textAlign: 'center', width: '100%' }}>
                    {room.status === 'Available' ? 'Ready for academic sessions' : 'Currently in use'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Register Classroom Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register Facility / Classroom">
        <form onSubmit={handleCreateRoom}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Room Identifier</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Lab-4A"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Seating Capacity</label>
              <input
                type="number"
                className="form-control"
                min="10"
                max="1000"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Campus Building</label>
              <select
                className="form-control"
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
              >
                <option value="Main Academic Block A">Main Academic Block A</option>
                <option value="Turing Technology Tower">Turing Technology Tower</option>
                <option value="Central Campus Complex">Central Campus Complex</option>
                <option value="Central Library">Central Library</option>
              </select>
            </div>
            <div className="form-group">
              <label>Facility Category</label>
              <select
                className="form-control"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Lecture Hall">Lecture Hall</option>
                <option value="Computer Lab">Computer Lab</option>
                <option value="Seminar Hall">Seminar Hall</option>
                <option value="Discussion Room">Discussion Room</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Equipment & Features (comma-separated)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 4K Projector, Smart Board, AC, Dual Gigabit"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Register Facility
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Classrooms;
