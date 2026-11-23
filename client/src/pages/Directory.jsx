import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, Search, Mail, Phone, Shield, BookOpen, Sparkles, Building } from 'lucide-react';

const Directory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');
  const [department, setDepartment] = useState('All');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users', {
          params: { search, role, department }
        });
        if (res.data.success) {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching campus directory:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search, role, department]);

  const getRoleBadge = (userRole) => {
    switch (userRole) {
      case 'admin':
        return <span className="badge badge-purple"><Shield size={12} /> Administrator</span>;
      case 'faculty':
        return <span className="badge badge-blue"><BookOpen size={12} /> Faculty</span>;
      default:
        return <span className="badge badge-green"><Sparkles size={12} /> Student</span>;
    }
  };

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Users size={28} color="#a855f7" />
          Campus People Directory
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Searchable faculty roster, academic staff records, and enrolled student profiles
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, campus email, or roll/employee ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="filter-select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="student">Students</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Administrators</option>
        </select>

        <select className="filter-select" value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="Computer Science & Engineering">Computer Science & Engineering</option>
          <option value="Electronics & Communication">Electronics & Communication</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Campus Administration">Campus Administration</option>
        </select>
      </div>

      {/* Directory Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading directory profiles...</p>
      ) : users.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No members found matching your search.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {users.map(u => (
            <div key={u._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: u.role === 'admin' ? 'linear-gradient(135deg, #a855f7, #6366f1)' : u.role === 'faculty' ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : 'linear-gradient(135deg, #10b981, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  {u.name ? u.name.charAt(0) : 'U'}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{u.name}</h3>
                  <div style={{ marginTop: '3px' }}>{getRoleBadge(u.role)}</div>
                </div>
              </div>

              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building size={14} color="var(--accent-cyan)" />
                  <span>{u.department}</span>
                </div>
                <div>
                  <strong>ID:</strong> <span style={{ color: 'var(--text-main)' }}>{u.rollOrEmployeeId}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem' }}>
                <a href={`mailto:${u.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                  <Mail size={14} />
                  <span>{u.email}</span>
                </a>
                {u.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Phone size={14} />
                    <span>{u.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Directory;
