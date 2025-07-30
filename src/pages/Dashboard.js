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
  FiClock,
  FiTwitter,
  FiYoutube,
  FiLink
} from 'react-icons/fi';
import { 
  SiTiktok,
  SiPinterest,
  SiLinkedin
} from 'react-icons/si';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  // Mock platform data - replace with real data from connections
  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: FiInstagram, color: '#E4405F', followers: 0, connected: false },
    { id: 'facebook', name: 'Facebook', icon: FiFacebook, color: '#1877F2', followers: 0, connected: false },
    { id: 'tiktok', name: 'TikTok', icon: SiTiktok, color: '#000000', followers: 0, connected: false },
    { id: 'pinterest', name: 'Pinterest', icon: SiPinterest, color: '#BD081C', followers: 0, connected: false },
    { id: 'twitter', name: 'X (Twitter)', icon: FiTwitter, color: '#1DA1F2', followers: 0, connected: false },
    { id: 'youtube', name: 'YouTube', icon: FiYoutube, color: '#FF0000', subscribers: 0, connected: false },
    { id: 'linkedin', name: 'LinkedIn', icon: SiLinkedin, color: '#0A66C2', connections: 0, connected: false },
    { id: 'truthsocial', name: 'Truth Social', icon: FiTwitter, color: '#FF6B35', followers: 0, connected: false }
  ];

  const totalFollowers = platforms.reduce((sum, platform) => 
    sum + (platform.followers || platform.subscribers || platform.connections || 0), 0
  );

  const connectedPlatforms = platforms.filter(p => p.connected).length;
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

  const PlatformGauge = ({ platform }) => (
    <div className="platform-gauge">
      <div className="gauge-header">
        <div className="platform-icon" style={{ backgroundColor: platform.color }}>
          <platform.icon />
        </div>
        <div className="platform-info">
          <h4>{platform.name}</h4>
          <span className={`status ${platform.connected ? 'connected' : 'disconnected'}`}>
            {platform.connected ? 'Connected' : 'Not Connected'}
          </span>
        </div>
      </div>
      <div className="gauge-stats">
        {platform.connected ? (
          <>
            <div className="stat-number">
              {(platform.followers || platform.subscribers || platform.connections || 0).toLocaleString()}
            </div>
            <div className="stat-label">
              {platform.id === 'youtube' ? 'Subscribers' : 
               platform.id === 'linkedin' ? 'Connections' : 'Followers'}
            </div>
          </>
        ) : (
          <>
            <div className="stat-number">--</div>
            <div className="stat-label">Connect to view</div>
          </>
        )}
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
          value={totalFollowers.toLocaleString()}
          subtitle={connectedPlatforms > 0 ? `Across ${connectedPlatforms} platforms` : "Connect your accounts to see data"}
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

      {/* Platform Gauges */}
      <div className="platform-section">
        <div className="section-header">
          <h2>Platform Overview</h2>
          <Link to="/connections" className="btn btn-primary">
            <FiLink />
            Manage Connections
          </Link>
        </div>
        <div className="platform-gauges">
          {platforms.map(platform => (
            <PlatformGauge key={platform.id} platform={platform} />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content">
        {/* Quick Actions */}
        <div className="quick-actions-card">
          <h2><FiEdit3 /> Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/creator" className="action-btn primary">
              <FiPlus />
              <span>Create Content</span>
            </Link>
            <Link to="/connections" className="action-btn secondary">
              <FiInstagram />
              <span>Connect Instagram</span>
            </Link>
            <Link to="/connections" className="action-btn secondary">
              <FiFacebook />
              <span>Connect Facebook</span>
            </Link>
            <Link to="/analytics" className="action-btn secondary">
              <FiActivity />
              <span>View Analytics</span>
            </Link>
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
            <Link to="/creator" className="btn btn-primary">
              Create Your First Post
            </Link>
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
            <Link to="/connections" className="btn btn-secondary">
              Connect Accounts
            </Link>
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
