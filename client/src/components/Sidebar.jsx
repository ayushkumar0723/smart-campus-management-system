import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Building2, 
  AlertTriangle, 
  Megaphone, 
  CalendarDays, 
  Users, 
  UserCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Course Catalog', path: '/courses', icon: BookOpen },
    { name: 'Classrooms & Labs', path: '/classrooms', icon: Building2 },
    { name: 'Campus Grievances', path: '/issues', icon: AlertTriangle },
    { name: 'Notices & Circulars', path: '/notices', icon: Megaphone },
    { name: 'Campus Events', path: '/events', icon: CalendarDays },
    { name: 'People Directory', path: '/directory', icon: Users },
    { name: 'My Profile', path: '/profile', icon: UserCircle },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-nav">
        <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Portal Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end={item.path === '/'}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
          <div>Smart Campus OS v2.6</div>
          <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
            System Live & Ready
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
