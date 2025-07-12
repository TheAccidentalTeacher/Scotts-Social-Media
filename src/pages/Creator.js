import React from 'react';
import { FiEdit3 } from 'react-icons/fi';

const Creator = () => {
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
      <FiEdit3 size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
      <h2>Content Creator</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        This feature is coming soon! Create and edit your social media content here.
      </p>
      <button className="btn btn-primary">
        Coming Soon
      </button>
    </div>
  );
};

export default Creator;
