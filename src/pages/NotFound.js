import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-animation">
          <div className="error-number">4</div>
          <div className="error-icon">👨‍🏫</div>
          <div className="error-number">4</div>
        </div>
        
        <h1>Oops! Page Not Found</h1>
        <p>
          Looks like this page went on an unplanned teaching adventure! 
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="not-found-actions">
          <Link to="/dashboard" className="btn btn-primary">
            <FiHome />
            Back to Dashboard
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-outline">
            <FiArrowLeft />
            Go Back
          </button>
        </div>
        
        <div className="helpful-links">
          <h3>Need help? Try these pages:</h3>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/calendar">Content Calendar</Link></li>
            <li><Link to="/creator">Content Creator</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
