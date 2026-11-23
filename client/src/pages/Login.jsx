import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Shield, BookOpen, User, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, quickLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = async (role) => {
    setError('');
    setLoading(true);
    try {
      await quickLogin(role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="brand-icon-box" style={{ margin: '0 auto 1rem auto', width: '48px', height: '48px' }}>
            <GraduationCap size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Welcome to SmartCampus</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Integrated Full-Stack Campus Management Portal
          </p>
        </div>

        {/* Instant Evaluation Demo Buttons */}
        <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.08)', border: '1px dashed rgba(99, 102, 241, 0.4)', borderRadius: 'var(--radius-md)', padding: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', textAlign: 'center', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ⚡ 1-Click Evaluation Demo Logins
          </div>
          <div className="demo-login-grid" style={{ margin: 0 }}>
            <button
              type="button"
              className="demo-btn"
              onClick={() => handleDemoClick('admin')}
              disabled={loading}
            >
              <Shield size={16} color="#c084fc" />
              <span>Admin</span>
            </button>
            <button
              type="button"
              className="demo-btn"
              onClick={() => handleDemoClick('faculty')}
              disabled={loading}
            >
              <BookOpen size={16} color="#38bdf8" />
              <span>Faculty</span>
            </button>
            <button
              type="button"
              className="demo-btn"
              onClick={() => handleDemoClick('student')}
              disabled={loading}
            >
              <User size={16} color="#34d399" />
              <span>Student</span>
            </button>
          </div>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Campus Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="e.g. admin@campus.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.75rem' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none' }}>
            Create one here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
