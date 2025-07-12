import React, { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiFileText, 
  FiBarChart2,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiClock,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiCalendar,
  FiEdit3,
  FiBell,
  FiActivity
} from 'react-icons/fi';
import { dashboardService } from '../services/dashboardService';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await dashboardService.getDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: FiInstagram,
      facebook: FiFacebook,
      twitter: FiTwitter,
      youtube: FiYoutube
    };
    return icons[platform] || FiFileText;
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'status-scheduled',
      draft: 'status-draft',
      published: 'status-published'
    };
    return colors[status] || 'status-draft';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  const { stats, upcomingPosts, recentPerformance, contentIdeas } = dashboardData;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back!</h1>
          <p>Here's what's happening with your social media empire today.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <FiCalendar />
            View Calendar
          </button>
          <button className="btn btn-primary">
            <FiEdit3 />
            Create Content
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon followers">
            <FiUsers />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.followers.toLocaleString()}</div>
            <div className="stat-label">Total Followers</div>
            <div className="stat-change positive">
              <FiTrendingUp />
              +{stats.growth}% this month
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon engagement">
            <FiActivity />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.engagement}%</div>
            <div className="stat-label">Engagement Rate</div>
            <div className="stat-change positive">
              <FiTrendingUp />
              +0.3% vs last week
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon posts">
            <FiFileText />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.posts}</div>
            <div className="stat-label">Posts This Month</div>
            <div className="stat-change neutral">
              <FiBarChart2 />
              On track for goal
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon growth">
            <FiTrendingUp />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.growth}%</div>
            <div className="stat-label">Growth Rate</div>
            <div className="stat-change positive">
              <FiTrendingUp />
              Above average
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Upcoming Posts */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>
              <FiClock />
              Upcoming Posts
            </h2>
            <button className="btn btn-sm btn-outline">View All</button>
          </div>
          <div className="upcoming-posts">
            {upcomingPosts.map((post) => {
              const PlatformIcon = getPlatformIcon(post.platform);
              return (
                <div key={post.id} className="post-item">
                  <div className="post-icon">
                    <PlatformIcon />
                  </div>
                  <div className="post-content">
                    <h4>{post.title}</h4>
                    <div className="post-meta">
                      <span className={`status-badge ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      <span className="post-time">
                        {formatDate(post.scheduledFor)}
                      </span>
                    </div>
                  </div>
                  <div className="post-actions">
                    <button className="btn btn-sm btn-outline">
                      <FiEdit3 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Performance */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>
              <FiBarChart2 />
              Recent Performance
            </h2>
            <button className="btn btn-sm btn-outline">View Analytics</button>
          </div>
          <div className="performance-list">
            {recentPerformance.map((item) => {
              const PlatformIcon = getPlatformIcon(item.platform);
              return (
                <div key={item.id} className="performance-item">
                  <div className="performance-header">
                    <div className="performance-icon">
                      <PlatformIcon />
                    </div>
                    <div className="performance-info">
                      <h4>{item.title}</h4>
                      <span className="performance-date">
                        {formatDate(item.publishedAt)}
                      </span>
                    </div>
                    <div className="engagement-score">
                      {item.engagement}%
                    </div>
                  </div>
                  <div className="performance-metrics">
                    <div className="metric">
                      <FiHeart />
                      <span>{item.likes}</span>
                    </div>
                    <div className="metric">
                      <FiMessageCircle />
                      <span>{item.comments}</span>
                    </div>
                    <div className="metric">
                      <FiShare2 />
                      <span>{item.shares}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Ideas */}
        <div className="dashboard-section content-ideas-section">
          <div className="section-header">
            <h2>
              <FiBell />
              AI Content Ideas
            </h2>
            <button className="btn btn-sm btn-primary">Generate More</button>
          </div>
          <div className="content-ideas">
            {contentIdeas.map((idea) => (
              <div key={idea.id} className="idea-item">
                <div className="idea-content">
                  <h4>{idea.title}</h4>
                  <span className="idea-pillar">{idea.contentPillar}</span>
                  <div className="idea-platforms">
                    {idea.platforms.map((platform) => {
                      const PlatformIcon = getPlatformIcon(platform);
                      return (
                        <div key={platform} className="platform-tag">
                          <PlatformIcon />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="idea-actions">
                  <div className={`confidence-badge ${idea.confidence}`}>
                    {idea.confidence} confidence
                  </div>
                  <button className="btn btn-sm btn-primary">
                    Create
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section quick-actions-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <button className="action-btn">
              <FiEdit3 />
              <span>Create Post</span>
            </button>
            <button className="action-btn">
              <FiCalendar />
              <span>Schedule Content</span>
            </button>
            <button className="action-btn">
              <FiBarChart2 />
              <span>View Analytics</span>
            </button>
            <button className="action-btn">
              <FiBell />
              <span>Generate Ideas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
