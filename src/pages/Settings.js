import React from 'react';
import { FiSettings } from 'react-icons/fi';

const Settings = () => {
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
      <FiSettings size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
      <h2>Settings</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        This feature is coming soon! Manage your account settings and preferences here.
      </p>
      <button className="btn btn-primary">
        Coming Soon
      </button>
    </div>
  );
};

export default Settings;
