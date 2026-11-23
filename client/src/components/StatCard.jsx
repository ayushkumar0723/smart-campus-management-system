import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'blue', subtitle }) => {
  const colorMap = {
    indigo: { bg: 'rgba(79, 70, 229, 0.15)', text: '#818cf8' },
    cyan: { bg: 'rgba(6, 182, 212, 0.15)', text: '#38bdf8' },
    emerald: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399' },
    amber: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24' },
    rose: { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185' },
    purple: { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc' }
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: scheme.bg, color: scheme.text }}>
        {Icon && <Icon size={26} />}
      </div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
        {subtitle && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '2px', display: 'block' }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
