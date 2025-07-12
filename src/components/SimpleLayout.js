import React from 'react';

const SimpleLayout = ({ children }) => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <header style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>The Accidental Teacher Dashboard</h1>
      </header>
      
      <main style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {children}
      </main>
    </div>
  );
};

export default SimpleLayout;
