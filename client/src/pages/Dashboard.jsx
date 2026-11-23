import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import StatCard from '../components/StatCard';
import { 
  BookOpen, 
  Building2, 
  AlertTriangle, 
  Megaphone, 
  CalendarDays, 
  Users, 
  PlusCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Database
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        if (res.data.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Urgent': return <span className="badge badge-red">Urgent</span>;
      case 'High': return <span className="badge badge-amber">High</span>;
      case 'Medium': return <span className="badge badge-blue">Medium</span>;
      default: return <span className="badge badge-purple">Low</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved': return <span className="badge badge-green"><CheckCircle2 size={12} /> Resolved</span>;
      case 'In Progress': return <span className="badge badge-amber"><Clock size={12} /> In Progress</span>;
      default: return <span className="badge badge-blue"><Clock size={12} /> Open</span>;
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem auto' }}></div>
        <p style={{ color: 'var(--text-muted)' }}>Loading smart campus analytics...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const counts = stats?.counts || {};

  return (
    <div className="page-wrapper">
      {/* Welcome Banner */}
      <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(6, 182, 212, 0.08))', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-purple"><Sparkles size={12} /> Campus Control Center</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Database size={12} /> {stats?.systemStatus?.mode === 'mongodb-connected' ? 'MongoDB Atlas Active' : 'Resilient High-Speed DB Engine'}
              </span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              Welcome back, {user?.name}!
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.2rem' }}>
              Department of {user?.department} &bull; ID: {user?.rollOrEmployeeId}
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/issues" className="btn btn-secondary btn-sm">
              <AlertTriangle size={15} />
              <span>Report Issue</span>
            </Link>
            <Link to="/courses" className="btn btn-primary btn-sm">
              <BookOpen size={15} />
              <span>Course Catalog</span>
            </Link>
            <Link to="/classrooms" className="btn btn-secondary btn-sm">
              <Building2 size={15} />
              <span>Classrooms & Labs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="stats-grid">
        <StatCard 
          title="Active Courses" 
          value={counts.courses || 0} 
          icon={BookOpen} 
          color="indigo" 
          subtitle="Accredited degree modules"
        />
        <StatCard 
          title="Available Classrooms" 
          value={`${counts.availableRooms || 0}/${counts.classrooms || 0}`} 
          icon={Building2} 
          color="emerald" 
          subtitle="Ready for scheduling"
        />
        <StatCard 
          title="Campus Grievances" 
          value={counts.openIssues || 0} 
          icon={AlertTriangle} 
          color="rose" 
          subtitle={`${counts.urgentIssues || 0} marked urgent`}
        />
        <StatCard 
          title="Official Notices" 
          value={counts.totalNotices || 0} 
          icon={Megaphone} 
          color="cyan" 
          subtitle={`${stats?.pinnedNotices?.length || 0} priority pinned`}
        />
        <StatCard 
          title="Campus Events" 
          value={counts.totalEvents || 0} 
          icon={CalendarDays} 
          color="amber" 
          subtitle="Workshops & conferences"
        />
        <StatCard 
          title="Directory Members" 
          value={counts.totalUsers || 0} 
          icon={Users} 
          color="purple" 
          subtitle={`${counts.students || 0} students, ${counts.faculty || 0} faculty`}
        />
      </div>

      {/* Main Two-Column Dashboard Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: Recent Campus Issues / Grievance Redressal */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Active Grievance Redressal</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>Facility & maintenance requests</p>
            </div>
            <Link to="/issues" className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.75rem' }}>
              View All <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {stats?.recentIssues && stats.recentIssues.length > 0 ? (
              stats.recentIssues.map(issue => (
                <div 
                  key={issue._id} 
                  style={{ 
                    padding: '0.9rem', 
                    borderRadius: 'var(--radius-md)', 
                    backgroundColor: 'var(--bg-surface-elevated)', 
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.925rem' }}>{issue.title}</span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {getPriorityBadge(issue.priority)}
                      {getStatusBadge(issue.status)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    <span>📍 {issue.location}</span>
                    <span>By {issue.reportedByName}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No active grievances logged.</p>
            )}
          </div>
        </div>

        {/* Right Column: Pinned & Recent Notices */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Notices & Announcements</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>Latest circulars from campus offices</p>
            </div>
            <Link to="/notices" className="btn btn-secondary btn-sm" style={{ padding: '0.35rem 0.75rem' }}>
              All Notices <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {stats?.recentNotices && stats.recentNotices.length > 0 ? (
              stats.recentNotices.map(notice => (
                <div 
                  key={notice._id}
                  style={{ 
                    padding: '0.9rem', 
                    borderRadius: 'var(--radius-md)', 
                    backgroundColor: notice.isPinned ? 'rgba(79, 70, 229, 0.08)' : 'var(--bg-surface-elevated)', 
                    border: notice.isPinned ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {notice.isPinned && <span className="badge badge-purple">📌 Pinned</span>}
                      <span className="badge badge-blue">{notice.category}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{notice.title}</h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {notice.content}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No announcements published.</p>
            )}
          </div>
        </div>

      </div>

      {/* Upcoming Campus Events Bar */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Upcoming Campus Events & Hackathons</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>Conferences, tech talks, and cultural festivals</p>
          </div>
          <Link to="/events" className="btn btn-secondary btn-sm">
            Event Calendar <ArrowUpRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {stats?.upcomingEvents && stats.upcomingEvents.map(evt => (
            <div 
              key={evt._id}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span className="badge badge-amber">{evt.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>📅 {evt.date}</span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem' }}>{evt.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  📍 {evt.venue} &bull; {evt.time}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '0.6rem' }}>
                <span>👥 {evt.attendees?.length || 0} Registered</span>
                <span style={{ color: '#38bdf8' }}>Max {evt.capacity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
