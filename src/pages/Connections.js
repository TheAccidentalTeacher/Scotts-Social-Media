import React, { useState } from 'react';
import { 
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiCheck,
  FiX,
  FiExternalLink,
  FiSettings,
  FiRefreshCw,
  FiAlertCircle
} from 'react-icons/fi';
import { 
  SiTiktok,
  SiPinterest,
  SiLinkedin
} from 'react-icons/si';
import { toast } from 'react-toastify';
import './Connections.css';

const Connections = () => {
  const [connections, setConnections] = useState({
    instagram: { connected: false, username: '', followers: 0, lastSync: null },
    facebook: { connected: false, pageName: '', followers: 0, lastSync: null },
    tiktok: { connected: false, username: '', followers: 0, lastSync: null },
    pinterest: { connected: false, username: '', followers: 0, lastSync: null },
    twitter: { connected: false, username: '', followers: 0, lastSync: null },
    youtube: { connected: false, channelName: '', subscribers: 0, lastSync: null },
    linkedin: { connected: false, profileName: '', connections: 0, lastSync: null },
    truthsocial: { connected: false, username: '', followers: 0, lastSync: null }
  });

  const [isConnecting, setIsConnecting] = useState({});

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: FiInstagram,
      color: '#E4405F',
      description: 'Connect your Instagram business account',
      setupInstructions: 'Go to Meta for Developers, create an app, and get your access token'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: FiFacebook,
      color: '#1877F2',
      description: 'Connect your Facebook page',
      setupInstructions: 'Use the same Meta app to connect your Facebook page'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: SiTiktok,
      color: '#000000',
      description: 'Connect your TikTok for Business account',
      setupInstructions: 'Apply for TikTok for Business API access'
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: SiPinterest,
      color: '#BD081C',
      description: 'Connect your Pinterest business account',
      setupInstructions: 'Create a Pinterest app in the developer portal'
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: FiTwitter,
      color: '#1DA1F2',
      description: 'Connect your X/Twitter account',
      setupInstructions: 'Get API keys from the X Developer Portal'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: FiYoutube,
      color: '#FF0000',
      description: 'Connect your YouTube channel',
      setupInstructions: 'Use Google API Console to get YouTube Data API access'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: SiLinkedin,
      color: '#0A66C2',
      description: 'Connect your LinkedIn profile or page',
      setupInstructions: 'Create a LinkedIn app for API access'
    },
    {
      id: 'truthsocial',
      name: 'Truth Social',
      icon: FiTwitter, // Using Twitter icon as placeholder
      color: '#FF6B35',
      description: 'Connect your Truth Social account',
      setupInstructions: 'API access may be limited - check their developer documentation'
    }
  ];

  const handleConnect = async (platformId) => {
    setIsConnecting(prev => ({ ...prev, [platformId]: true }));
    
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, we'll simulate a successful connection
      // In reality, this would redirect to OAuth or open API setup instructions
      const platform = platforms.find(p => p.id === platformId);
      
      setConnections(prev => ({
        ...prev,
        [platformId]: {
          ...prev[platformId],
          connected: true,
          username: `your_${platformId}_handle`,
          followers: Math.floor(Math.random() * 10000),
          lastSync: new Date().toISOString()
        }
      }));
      
      toast.success(`${platform.name} connected successfully!`);
    } catch (error) {
      toast.error(`Failed to connect ${platforms.find(p => p.id === platformId).name}`);
    } finally {
      setIsConnecting(prev => ({ ...prev, [platformId]: false }));
    }
  };

  const handleDisconnect = (platformId) => {
    setConnections(prev => ({
      ...prev,
      [platformId]: {
        connected: false,
        username: '',
        followers: 0,
        lastSync: null
      }
    }));
    
    const platform = platforms.find(p => p.id === platformId);
    toast.info(`${platform.name} disconnected`);
  };

  const handleRefresh = async (platformId) => {
    if (!connections[platformId].connected) return;
    
    setIsConnecting(prev => ({ ...prev, [platformId]: true }));
    
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setConnections(prev => ({
        ...prev,
        [platformId]: {
          ...prev[platformId],
          lastSync: new Date().toISOString(),
          followers: prev[platformId].followers + Math.floor(Math.random() * 100)
        }
      }));
      
      toast.success('Data refreshed successfully!');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setIsConnecting(prev => ({ ...prev, [platformId]: false }));
    }
  };

  const ConnectionCard = ({ platform }) => {
    const connection = connections[platform.id];
    const isLoading = isConnecting[platform.id];

    return (
      <div className="connection-card">
        <div className="card-header">
          <div className="platform-info">
            <div 
              className="platform-icon" 
              style={{ backgroundColor: platform.color }}
            >
              <platform.icon />
            </div>
            <div className="platform-details">
              <h3>{platform.name}</h3>
              <p>{platform.description}</p>
            </div>
          </div>
          
          <div className="connection-status">
            {connection.connected ? (
              <div className="status-connected">
                <FiCheck />
                <span>Connected</span>
              </div>
            ) : (
              <div className="status-disconnected">
                <FiX />
                <span>Not Connected</span>
              </div>
            )}
          </div>
        </div>

        {connection.connected ? (
          <div className="connection-details">
            <div className="stats-row">
              <div className="stat">
                <span className="stat-label">Handle:</span>
                <span className="stat-value">@{connection.username}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Followers:</span>
                <span className="stat-value">{connection.followers.toLocaleString()}</span>
              </div>
            </div>
            
            {connection.lastSync && (
              <div className="last-sync">
                Last synced: {new Date(connection.lastSync).toLocaleString()}
              </div>
            )}

            <div className="connection-actions">
              <button
                onClick={() => handleRefresh(platform.id)}
                disabled={isLoading}
                className="btn btn-secondary"
              >
                {isLoading ? (
                  <>
                    <FiRefreshCw className="spinning" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <FiRefreshCw />
                    Refresh Data
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleDisconnect(platform.id)}
                className="btn btn-danger"
              >
                <FiX />
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="connection-setup">
            <div className="setup-instructions">
              <FiAlertCircle />
              <p>{platform.setupInstructions}</p>
            </div>
            
            <div className="connection-actions">
              <button
                onClick={() => handleConnect(platform.id)}
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? (
                  <>
                    <FiRefreshCw className="spinning" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <FiExternalLink />
                    Connect {platform.name}
                  </>
                )}
              </button>
              
              <button className="btn btn-secondary">
                <FiSettings />
                Setup Guide
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const connectedCount = Object.values(connections).filter(c => c.connected).length;
  const totalPlatforms = platforms.length;

  return (
    <div className="connections-page">
      <div className="page-header">
        <h1>Social Media Connections</h1>
        <p>Connect your social media accounts to track performance and manage content</p>
        
        <div className="connection-summary">
          <div className="summary-stat">
            <span className="number">{connectedCount}</span>
            <span className="label">Connected</span>
          </div>
          <div className="summary-divider">/</div>
          <div className="summary-stat">
            <span className="number">{totalPlatforms}</span>
            <span className="label">Total Platforms</span>
          </div>
        </div>
      </div>

      <div className="connections-grid">
        {platforms.map(platform => (
          <ConnectionCard key={platform.id} platform={platform} />
        ))}
      </div>

      <div className="help-section">
        <h2>Need Help?</h2>
        <p>Setting up social media API connections can be complex. Here are some resources:</p>
        <ul>
          <li><strong>Meta (Instagram/Facebook):</strong> Visit <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer">Meta for Developers</a></li>
          <li><strong>X (Twitter):</strong> Visit <a href="https://developer.twitter.com" target="_blank" rel="noopener noreferrer">X Developer Portal</a></li>
          <li><strong>YouTube:</strong> Visit <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
          <li><strong>TikTok:</strong> Visit <a href="https://developers.tiktok.com" target="_blank" rel="noopener noreferrer">TikTok for Developers</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Connections;
