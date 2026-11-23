import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LogOut, User, Bell, Shield, BookOpen, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="badge badge-purple"><Shield size={12} /> Admin</span>;
      case 'faculty':
        return <span className="badge badge-blue"><BookOpen size={12} /> Faculty</span>;
      default:
        return <span className="badge badge-green"><Sparkles size={12} /> Student</span>;
    }
  };

  return (
    <header className="top-navbar">
      <Link to="/" className="nav-brand">
        <div className="brand-icon-box">
          <GraduationCap size={22} />
        </div>
        <div>
          <span>SmartCampus</span>
          <span style={{ fontSize: '0.75rem', display: 'block', color: 'var(--accent-cyan)', fontWeight: 500, letterSpacing: '0.04em' }}>
            INTELLIGENT MANAGEMENT PORTAL
          </span>
        </div>
      </Link>

      <div className="nav-user-controls">
        {user ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingRight: '0.5rem', borderRight: '1px solid var(--border-color)' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.name}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
                  {getRoleBadge(user.role)}
                </div>
              </div>
              <Link to="/profile" style={{ display: 'flex' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>
                  {user.name.charAt(0)}
                </div>
              </Link>
            </div>

            <button onClick={logout} className="btn btn-secondary btn-sm" title="Sign Out">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
