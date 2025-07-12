import React from 'react';
import { FiCalendar } from 'react-icons/fi';

const Calendar = () => {
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
      <FiCalendar size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
      <h2>Content Calendar</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        This feature is coming soon! Schedule and manage your content calendar here.
      </p>
      <button className="btn btn-primary">
        Coming Soon
      </button>
    </div>
  );
};

export default Calendar;
