class MetaAuthService {
  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL || '/.netlify/functions';
    this.tokenKey = 'meta_auth_tokens';
  }

  // Initialize OAuth flow
  async initiateAuth(platform) {
    try {
      const response = await fetch(`${this.apiUrl}/auth-init?platform=${platform}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Store platform in localStorage for callback handling
      localStorage.setItem('auth_platform', platform);
      
      // Redirect to Facebook OAuth
      window.location.href = data.authUrl;
      
      return data;
    } catch (error) {
      console.error('Failed to initiate auth:', error);
      throw error;
    }
  }

  // Handle OAuth callback (called from URL params)
  handleAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const platform = urlParams.get('platform');
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (error) {
      throw new Error(decodeURIComponent(error));
    }

    if (success === 'true' && token) {
      // Store token
      this.storeToken(platform, token);
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      return { success: true, platform, token };
    }

    return { success: false };
  }

  // Store authentication token
  storeToken(platform, token) {
    try {
      const tokens = this.getStoredTokens();
      tokens[platform] = {
        token,
        timestamp: Date.now()
      };
      localStorage.setItem(this.tokenKey, JSON.stringify(tokens));
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }

  // Get stored tokens
  getStoredTokens() {
    try {
      const stored = localStorage.getItem(this.tokenKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to get stored tokens:', error);
      return {};
    }
  }

  // Get token for specific platform
  getToken(platform) {
    const tokens = this.getStoredTokens();
    return tokens[platform]?.token || null;
  }

  // Verify token with backend
  async verifyToken(platform) {
    const token = this.getToken(platform);
    
    if (!token) {
      return { connected: false, error: 'No token found' };
    }

    try {
      const response = await fetch(`${this.apiUrl}/auth-verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Token verification failed:', error);
      this.removeToken(platform); // Remove invalid token
      return { connected: false, error: error.message };
    }
  }

  // Remove token for platform
  removeToken(platform) {
    try {
      const tokens = this.getStoredTokens();
      delete tokens[platform];
      localStorage.setItem(this.tokenKey, JSON.stringify(tokens));
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }

  // Check if platform is connected
  async isConnected(platform) {
    const verification = await this.verifyToken(platform);
    return verification.connected || false;
  }

  // Get connection status for all platforms
  async getConnectionStatus() {
    const platforms = ['facebook_page', 'facebook_group', 'instagram'];
    const status = {};

    for (const platform of platforms) {
      try {
        const verification = await this.verifyToken(platform);
        status[platform] = {
          connected: verification.connected,
          user: verification.user,
          platformData: verification.platformData,
          error: verification.error
        };
      } catch (error) {
        status[platform] = {
          connected: false,
          error: error.message
        };
      }
    }

    return status;
  }

  // Disconnect platform
  async disconnect(platform) {
    try {
      this.removeToken(platform);
      
      // Optional: Call backend to revoke token
      // const token = this.getToken(platform);
      // if (token) {
      //   await fetch(`${this.apiUrl}/auth-revoke`, {
      //     method: 'POST',
      //     headers: {
      //       'Authorization': `Bearer ${token}`,
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ platform })
      //   });
      // }

      return { success: true };
    } catch (error) {
      console.error('Failed to disconnect:', error);
      throw error;
    }
  }

  // Refresh connection data
  async refreshConnection(platform) {
    return await this.verifyToken(platform);
  }
}

export default new MetaAuthService();
