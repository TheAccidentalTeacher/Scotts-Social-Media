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
import './Dashboard.css';

// Mock data - you can update this with your actual data
const mockDashboardData = {
  overview: {
    totalFollowers: 15420,
    totalPosts: 89,
    engagement: 4.2,
    reach: 28560
  },
  upcomingPosts: [
    {
      id: 1,
      title: "Teaching Math with Fun Games",
      platform: "instagram",
      scheduledTime: "2025-07-13T10:00:00Z",
      status: "scheduled",
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 2,
      title: "Science Experiment Friday",
      platform: "facebook",
      scheduledTime: "2025-07-13T14:30:00Z",
      status: "scheduled",
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 3,
      title: "Classroom Management Tips",
      platform: "twitter",
      scheduledTime: "2025-07-14T09:15:00Z",
      status: "draft",
      engagement: { likes: 0, comments: 0, shares: 0 }
    }
  ],
  recentPerformance: [
    {
      id: 1,
      title: "Creative Writing Prompts",
      platform: "instagram",
      publishedAt: "2025-07-11T08:00:00Z",
      engagement: { likes: 245, comments: 18, shares: 12 }
    },
    {
      id: 2,
      title: "Reading Comprehension Strategies",
      platform: "facebook",
      publishedAt: "2025-07-10T16:00:00Z",
      engagement: { likes: 189, comments: 24, shares: 8 }
    },
    {
      id: 3,
      title: "Quick Math Facts Practice",
      platform: "twitter",
      publishedAt: "2025-07-09T12:30:00Z",
      engagement: { likes: 156, comments: 9, shares: 15 }
    }
  ],
  contentIdeas: [
    {
      id: 1,
      title: "5 Quick Reading Games",
      contentPillar: "Literacy",
      platforms: ["instagram", "facebook"],
      confidence: "high"
    },
    {
      id: 2,
      title: "Math Facts with Music",
      contentPillar: "Mathematics",
      platforms: ["twitter", "youtube"],
      confidence: "medium"
    }
  ]
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const loadData = () => {
      setTimeout(() => {
        setDashboardData(mockDashboardData);
        setIsLoading(false);
      }, 500);
    };

    loadData();
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

  const stats = dashboardData?.overview || {};
  const upcomingPosts = dashboardData?.upcomingPosts || [];
  const recentPerformance = dashboardData?.recentPerformance || [];
  const contentIdeas = dashboardData?.contentIdeas || [];

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
