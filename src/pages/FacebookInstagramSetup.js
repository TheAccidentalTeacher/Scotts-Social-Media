import React, { useState, useEffect } from 'react';
import { 
  FiInstagram,
  FiFacebook,
  FiCheck,
  FiExternalLink,
  FiCopy,
  FiAlertCircle,
  FiUsers,
  FiArrowRight,
  FiRefreshCw
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import metaAuthService from '../services/metaAuthService';
import './FacebookInstagramSetup.css';

const FacebookInstagramSetup = () => {
  const [setupStep, setSetupStep] = useState('overview');
  const [connections, setConnections] = useState({
    instagram: { connected: false, username: '', followers: 0 },
    facebookPage: { connected: false, pageName: '', followers: 0 },
    facebookGroup: { connected: false, groupName: '', members: 0 }
  });
  
  const [credentials, setCredentials] = useState({
    appId: '',
    appSecret: '',
    accessToken: '',
    pageId: '',
    groupId: '',
    instagramAccountId: ''
  });

  const [isConnecting, setIsConnecting] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleConnect = async (platform) => {
    setIsConnecting(true);
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful connection
      if (platform === 'instagram') {
        setConnections(prev => ({
          ...prev,
          instagram: {
            connected: true,
            username: 'the_accidental_teacher',
            followers: Math.floor(Math.random() * 5000) + 1000
          }
        }));
      } else if (platform === 'facebookPage') {
        setConnections(prev => ({
          ...prev,
          facebookPage: {
            connected: true,
            pageName: 'The Accidental Teacher',
            followers: Math.floor(Math.random() * 10000) + 2000
          }
        }));
      } else if (platform === 'facebookGroup') {
        setConnections(prev => ({
          ...prev,
          facebookGroup: {
            connected: true,
            groupName: 'Teachers Supporting Teachers',
            members: Math.floor(Math.random() * 15000) + 5000
          }
        }));
      }
      
      toast.success(`${platform} connected successfully!`);
    } catch (error) {
      toast.error(`Failed to connect ${platform}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const SetupOverview = () => (
    <div className="setup-section">
      <h2>Facebook & Instagram Setup Overview</h2>
      <p>Connect your Facebook Page, Facebook Group, and Instagram Business account to manage all your social media from one place.</p>
      
      <div className="platform-cards">
        <div className="platform-card instagram">
          <div className="platform-header">
            <FiInstagram />
            <h3>Instagram Business</h3>
          </div>
          <div className="platform-features">
            <p>✅ Post photos and videos</p>
            <p>✅ Track engagement metrics</p>
            <p>✅ Schedule content</p>
            <p>✅ View follower insights</p>
          </div>
          <div className="platform-status">
            {connections.instagram.connected ? (
              <span className="connected">✅ Connected</span>
            ) : (
              <span className="not-connected">❌ Not Connected</span>
            )}
          </div>
        </div>

        <div className="platform-card facebook-page">
          <div className="platform-header">
            <FiFacebook />
            <h3>Facebook Page</h3>
          </div>
          <div className="platform-features">
            <p>✅ Post updates and content</p>
            <p>✅ Engage with followers</p>
            <p>✅ Run promotional campaigns</p>
            <p>✅ Access page insights</p>
          </div>
          <div className="platform-status">
            {connections.facebookPage.connected ? (
              <span className="connected">✅ Connected</span>
            ) : (
              <span className="not-connected">❌ Not Connected</span>
            )}
          </div>
        </div>

        <div className="platform-card facebook-group">
          <div className="platform-header">
            <FiUsers />
            <h3>Facebook Group</h3>
          </div>
          <div className="platform-features">
            <p>✅ Share content with community</p>
            <p>✅ Moderate discussions</p>
            <p>✅ Build engaged community</p>
            <p>✅ Track group growth</p>
          </div>
          <div className="platform-status">
            {connections.facebookGroup.connected ? (
              <span className="connected">✅ Connected</span>
            ) : (
              <span className="not-connected">❌ Not Connected</span>
            )}
          </div>
        </div>
      </div>

      <div className="setup-steps">
        <h3>Setup Process:</h3>
        <div className="step-list">
          <div className="step">
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>Create Meta App</h4>
              <p>Create a Facebook app in Meta for Developers</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>Get Credentials</h4>
              <p>Obtain App ID, App Secret, and Access Tokens</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <div className="step-content">
              <h4>Connect Accounts</h4>
              <p>Link your Instagram, Facebook Page, and Group</p>
            </div>
          </div>
        </div>
      </div>

      <button 
        className="btn btn-primary btn-large"
        onClick={() => setSetupStep('metaApp')}
      >
        Start Setup Process
        <FiArrowRight />
      </button>
    </div>
  );

  const MetaAppSetup = () => (
    <div className="setup-section">
      <h2>Step 1: Create Meta App</h2>
      
      <div className="instruction-card">
        <div className="instruction-header">
          <FiExternalLink />
          <h3>Create Your Meta for Developers App</h3>
        </div>
        
        <div className="instruction-steps">
          <div className="instruction-step">
            <span className="step-num">1.</span>
            <div>
              <p><strong>Go to Meta for Developers:</strong></p>
              <div className="code-block">
                <code>https://developers.facebook.com/apps/</code>
                <button onClick={() => copyToClipboard('https://developers.facebook.com/apps/')}>
                  <FiCopy />
                </button>
              </div>
            </div>
          </div>

          <div className="instruction-step">
            <span className="step-num">2.</span>
            <div>
              <p><strong>Click "Create App"</strong></p>
              <p>Choose "Business" as your app type</p>
            </div>
          </div>

          <div className="instruction-step">
            <span className="step-num">3.</span>
            <div>
              <p><strong>Fill in App Details:</strong></p>
              <ul>
                <li>App Name: "The Accidental Teacher Social Media"</li>
                <li>App Purpose: "Business"</li>
                <li>Business Account: Your business account</li>
              </ul>
            </div>
          </div>

          <div className="instruction-step">
            <span className="step-num">4.</span>
            <div>
              <p><strong>Add Products:</strong></p>
              <ul>
                <li>Facebook Login</li>
                <li>Instagram Graph API</li>
                <li>Facebook Graph API</li>
              </ul>
            </div>
          </div>

          <div className="instruction-step">
            <span className="step-num">5.</span>
            <div>
              <p><strong>Configure Permissions:</strong></p>
              <div className="permissions-list">
                <span className="permission">pages_manage_posts</span>
                <span className="permission">pages_read_engagement</span>
                <span className="permission">instagram_basic</span>
                <span className="permission">instagram_content_publish</span>
                <span className="permission">groups_access_member_info</span>
                <span className="permission">publish_to_groups</span>
              </div>
            </div>
          </div>
        </div>

        <div className="warning-box">
          <FiAlertCircle />
          <div>
            <p><strong>Important:</strong> Make sure to add your domain to the App Domains in your app settings.</p>
            <p>For testing, you can use: <code>localhost</code></p>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button 
          className="btn btn-secondary"
          onClick={() => setSetupStep('overview')}
        >
          Back to Overview
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => setSetupStep('credentials')}
        >
          Next: Get Credentials
          <FiArrowRight />
        </button>
      </div>
    </div>
  );

  const CredentialsSetup = () => (
    <div className="setup-section">
      <h2>Step 2: Get Your Credentials</h2>
      
      <div className="credentials-form">
        <div className="form-group">
          <label>App ID</label>
          <div className="input-with-help">
            <input
              type="text"
              value={credentials.appId}
              onChange={(e) => setCredentials(prev => ({ ...prev, appId: e.target.value }))}
              placeholder="Enter your Meta App ID"
            />
            <small>Found in App Dashboard → Settings → Basic</small>
          </div>
        </div>

        <div className="form-group">
          <label>App Secret</label>
          <div className="input-with-help">
            <input
              type="password"
              value={credentials.appSecret}
              onChange={(e) => setCredentials(prev => ({ ...prev, appSecret: e.target.value }))}
              placeholder="Enter your App Secret"
            />
            <small>Found in App Dashboard → Settings → Basic (click "Show")</small>
          </div>
        </div>

        <div className="form-group">
          <label>Access Token</label>
          <div className="input-with-help">
            <input
              type="text"
              value={credentials.accessToken}
              onChange={(e) => setCredentials(prev => ({ ...prev, accessToken: e.target.value }))}
              placeholder="Enter your User Access Token"
            />
            <small>Generate using Graph API Explorer or Access Token Tool</small>
          </div>
        </div>

        <div className="form-group">
          <label>Facebook Page ID</label>
          <div className="input-with-help">
            <input
              type="text"
              value={credentials.pageId}
              onChange={(e) => setCredentials(prev => ({ ...prev, pageId: e.target.value }))}
              placeholder="Enter your Facebook Page ID"
            />
            <small>Found in your Page Settings → Page Info</small>
          </div>
        </div>

        <div className="form-group">
          <label>Facebook Group ID (Optional)</label>
          <div className="input-with-help">
            <input
              type="text"
              value={credentials.groupId}
              onChange={(e) => setCredentials(prev => ({ ...prev, groupId: e.target.value }))}
              placeholder="Enter your Facebook Group ID"
            />
            <small>Found in your Group URL or Group Settings</small>
          </div>
        </div>
      </div>

      <div className="help-section">
        <h3>How to Find Your IDs:</h3>
        <div className="help-items">
          <div className="help-item">
            <strong>Page ID:</strong>
            <p>Go to your Facebook Page → Settings → Page Info → Page ID</p>
          </div>
          <div className="help-item">
            <strong>Group ID:</strong>
            <p>Look at your group URL: facebook.com/groups/[GROUP_ID]/</p>
          </div>
          <div className="help-item">
            <strong>Access Token:</strong>
            <p>Use Graph API Explorer at developers.facebook.com/tools/explorer/</p>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button 
          className="btn btn-secondary"
          onClick={() => setSetupStep('metaApp')}
        >
          Back to Meta App
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => setSetupStep('connect')}
          disabled={!credentials.appId || !credentials.accessToken}
        >
          Next: Connect Accounts
          <FiArrowRight />
        </button>
      </div>
    </div>
  );

  const ConnectAccounts = () => (
    <div className="setup-section">
      <h2>Step 3: Connect Your Accounts</h2>
      
      <div className="connection-cards">
        <div className="connection-card">
          <div className="connection-header">
            <FiInstagram />
            <div>
              <h3>Instagram Business Account</h3>
              <p>Connect your Instagram business profile</p>
            </div>
            <div className="connection-status">
              {connections.instagram.connected ? (
                <span className="status-badge connected">Connected</span>
              ) : (
                <span className="status-badge disconnected">Not Connected</span>
              )}
            </div>
          </div>
          
          {connections.instagram.connected ? (
            <div className="connection-details">
              <p><strong>Username:</strong> @{connections.instagram.username}</p>
              <p><strong>Followers:</strong> {connections.instagram.followers.toLocaleString()}</p>
            </div>
          ) : (
            <div className="connection-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleConnect('instagram')}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <FiRefreshCw className="spinning" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <FiInstagram />
                    Connect Instagram
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="connection-card">
          <div className="connection-header">
            <FiFacebook />
            <div>
              <h3>Facebook Page</h3>
              <p>Connect your Facebook business page</p>
            </div>
            <div className="connection-status">
              {connections.facebookPage.connected ? (
                <span className="status-badge connected">Connected</span>
              ) : (
                <span className="status-badge disconnected">Not Connected</span>
              )}
            </div>
          </div>
          
          {connections.facebookPage.connected ? (
            <div className="connection-details">
              <p><strong>Page:</strong> {connections.facebookPage.pageName}</p>
              <p><strong>Followers:</strong> {connections.facebookPage.followers.toLocaleString()}</p>
            </div>
          ) : (
            <div className="connection-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleConnect('facebookPage')}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <FiRefreshCw className="spinning" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <FiFacebook />
                    Connect Facebook Page
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="connection-card">
          <div className="connection-header">
            <FiUsers />
            <div>
              <h3>Facebook Group</h3>
              <p>Connect your Facebook group for community engagement</p>
            </div>
            <div className="connection-status">
              {connections.facebookGroup.connected ? (
                <span className="status-badge connected">Connected</span>
              ) : (
                <span className="status-badge disconnected">Not Connected</span>
              )}
            </div>
          </div>
          
          {connections.facebookGroup.connected ? (
            <div className="connection-details">
              <p><strong>Group:</strong> {connections.facebookGroup.groupName}</p>
              <p><strong>Members:</strong> {connections.facebookGroup.members.toLocaleString()}</p>
            </div>
          ) : (
            <div className="connection-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleConnect('facebookGroup')}
                disabled={isConnecting || !credentials.groupId}
              >
                {isConnecting ? (
                  <>
                    <FiRefreshCw className="spinning" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <FiUsers />
                    Connect Facebook Group
                  </>
                )}
              </button>
              {!credentials.groupId && (
                <small>Enter Group ID in Step 2 first</small>
              )}
            </div>
          )}
        </div>
      </div>

      {Object.values(connections).every(conn => conn.connected) && (
        <div className="success-message">
          <FiCheck />
          <div>
            <h3>🎉 All Accounts Connected!</h3>
            <p>You're all set! You can now manage your Instagram and Facebook accounts from your dashboard.</p>
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        <button 
          className="btn btn-secondary"
          onClick={() => setSetupStep('credentials')}
        >
          Back to Credentials
        </button>
        <button 
          className="btn btn-success"
          onClick={() => window.location.href = '/dashboard'}
        >
          Go to Dashboard
          <FiArrowRight />
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (setupStep) {
      case 'overview':
        return <SetupOverview />;
      case 'metaApp':
        return <MetaAppSetup />;
      case 'credentials':
        return <CredentialsSetup />;
      case 'connect':
        return <ConnectAccounts />;
      default:
        return <SetupOverview />;
    }
  };

  return (
    <div className="facebook-instagram-setup">
      <div className="setup-header">
        <h1>Facebook & Instagram Setup</h1>
        <div className="step-indicator">
          <div className={`step ${setupStep === 'overview' ? 'active' : ''}`}>Overview</div>
          <div className={`step ${setupStep === 'metaApp' ? 'active' : ''}`}>Meta App</div>
          <div className={`step ${setupStep === 'credentials' ? 'active' : ''}`}>Credentials</div>
          <div className={`step ${setupStep === 'connect' ? 'active' : ''}`}>Connect</div>
        </div>
      </div>

      {renderCurrentStep()}
    </div>
  );
};

export default FacebookInstagramSetup;
