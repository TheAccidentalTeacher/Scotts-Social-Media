import React from 'react';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiFileText, 
  FiBarChart2,
  FiInstagram,
  FiFacebook,
  FiEdit3,
  FiPlus,
  FiActivity,
  FiClock
} from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color }}>
        <Icon />
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome Back, Scott! 👋</h1>
          <p>Ready to create amazing content for your teaching community?</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={FiUsers}
          title="Total Followers"
          value="0"
          subtitle="Connect your accounts to see data"
          color="#3498db"
        />
        <StatCard
          icon={FiTrendingUp}
          title="Engagement Rate"
          value="0%"
          subtitle="Start posting to track engagement"
          color="#2ecc71"
        />
        <StatCard
          icon={FiFileText}
          title="Posts This Month"
          value="0"
          subtitle="Create your first post!"
          color="#e74c3c"
        />
        <StatCard
          icon={FiBarChart2}
          title="Growth Rate"
          value="0%"
          subtitle="Track your growth over time"
          color="#9b59b6"
        />
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content">
        {/* Quick Actions */}
        <div className="quick-actions-card">
          <h2><FiEdit3 /> Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-btn primary">
              <FiPlus />
              <span>Create Content</span>
            </button>
            <button className="action-btn secondary">
              <FiInstagram />
              <span>Connect Instagram</span>
            </button>
            <button className="action-btn secondary">
              <FiFacebook />
              <span>Connect Facebook</span>
            </button>
            <button className="action-btn secondary">
              <FiActivity />
              <span>View Analytics</span>
            </button>
          </div>
        </div>

        {/* Upcoming Posts */}
        <div className="upcoming-posts-card">
          <div className="card-header">
            <h2><FiClock /> Upcoming Posts</h2>
          </div>
          <div className="empty-state">
            <FiFileText size={48} />
            <h3>No scheduled posts</h3>
            <p>Create and schedule your first post to see it here!</p>
            <button className="btn btn-primary">
              Create Your First Post
            </button>
          </div>
        </div>

        {/* Recent Performance */}
        <div className="performance-card">
          <div className="card-header">
            <h2><FiBarChart2 /> Recent Performance</h2>
          </div>
          <div className="empty-state">
            <FiTrendingUp size={48} />
            <h3>No performance data yet</h3>
            <p>Connect your social media accounts and start posting to see analytics here.</p>
            <button className="btn btn-secondary">
              Connect Accounts
            </button>
          </div>
        </div>

        {/* Getting Started */}
        <div className="getting-started-card">
          <h2>🚀 Getting Started</h2>
          <div className="checklist">
            <div className="checklist-item">
              <input type="checkbox" id="step1" />
              <label htmlFor="step1">Connect your Instagram account</label>
            </div>
            <div className="checklist-item">
              <input type="checkbox" id="step2" />
              <label htmlFor="step2">Connect your Facebook page</label>
            </div>
            <div className="checklist-item">
              <input type="checkbox" id="step3" />
              <label htmlFor="step3">Create your first content piece</label>
            </div>
            <div className="checklist-item">
              <input type="checkbox" id="step4" />
              <label htmlFor="step4">Set up your content calendar</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
