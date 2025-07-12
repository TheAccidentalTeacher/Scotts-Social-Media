import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';

const Analytics = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '400px',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <FiBarChart2 size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
      <h2>Analytics</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        This feature is coming soon! View detailed analytics and insights here.
      </p>
      <button className="btn btn-primary">
        Coming Soon
      </button>
    </div>
  );
};

export default Analytics;
