import axios from 'axios';

// Instagram API configuration
const INSTAGRAM_API_BASE = 'https://graph.instagram.com';
const INSTAGRAM_BASIC_API_BASE = 'https://api.instagram.com';

class InstagramService {
  constructor() {
    this.accessToken = null;
    this.userId = null;
  }

  // Initialize with access token (you'll get this from OAuth flow)
  initialize(accessToken, userId) {
    this.accessToken = accessToken;
    this.userId = userId;
  }

  // Get user's basic profile info
  async getProfile() {
    if (!this.accessToken) {
      throw new Error('Instagram access token not set');
    }

    try {
      const response = await axios.get(`${INSTAGRAM_BASIC_API_BASE}/v1/me`, {
        params: {
          fields: 'id,username,account_type,media_count',
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Instagram profile:', error);
      throw error;
    }
  }

  // Get user's media (posts)
  async getMedia(limit = 10) {
    if (!this.accessToken) {
      throw new Error('Instagram access token not set');
    }

    try {
      const response = await axios.get(`${INSTAGRAM_BASIC_API_BASE}/v1/me/media`, {
        params: {
          fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count',
          limit: limit,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Instagram media:', error);
      throw error;
    }
  }

  // Get specific media details
  async getMediaById(mediaId) {
    if (!this.accessToken) {
      throw new Error('Instagram access token not set');
    }

    try {
      const response = await axios.get(`${INSTAGRAM_BASIC_API_BASE}/v1/${mediaId}`, {
        params: {
          fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count',
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Instagram media details:', error);
      throw error;
    }
  }

  // Get Instagram Insights (requires Instagram Graph API and business account)
  async getInsights(mediaId, metrics = ['impressions', 'reach', 'engagement']) {
    if (!this.accessToken) {
      throw new Error('Instagram access token not set');
    }

    try {
      const response = await axios.get(`${INSTAGRAM_API_BASE}/${mediaId}/insights`, {
        params: {
          metric: metrics.join(','),
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Instagram insights:', error);
      throw error;
    }
  }

  // Format media data for dashboard
  formatMediaForDashboard(mediaData) {
    return {
      id: mediaData.id,
      title: this.extractTitle(mediaData.caption),
      caption: mediaData.caption,
      platform: 'instagram',
      mediaType: mediaData.media_type.toLowerCase(),
      mediaUrl: mediaData.media_url,
      thumbnailUrl: mediaData.thumbnail_url,
      permalink: mediaData.permalink,
      publishedAt: mediaData.timestamp,
      likes: mediaData.like_count || 0,
      comments: mediaData.comments_count || 0,
      shares: 0, // Instagram doesn't provide share count through API
      engagement: this.calculateEngagement(mediaData.like_count, mediaData.comments_count)
    };
  }

  // Extract title from caption (first line or first sentence)
  extractTitle(caption) {
    if (!caption) return 'Instagram Post';
    
    // Get first line or first 50 characters
    const firstLine = caption.split('\n')[0];
    if (firstLine.length > 50) {
      return firstLine.substring(0, 47) + '...';
    }
    return firstLine || 'Instagram Post';
  }

  // Calculate engagement rate (simplified)
  calculateEngagement(likes = 0, comments = 0) {
    const totalEngagement = likes + (comments * 3); // Weight comments more
    // This is a simplified calculation - in reality you'd need follower count
    // For now, we'll return a percentage based on engagement volume
    return Math.min(((totalEngagement / 100) * 0.1), 10).toFixed(1);
  }

  // OAuth URL for Instagram authorization
  getAuthUrl(clientId, redirectUri, scopes = ['user_profile', 'user_media']) {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scopes.join(','),
      response_type: 'code'
    });

    return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(code, clientId, clientSecret, redirectUri) {
    try {
      const response = await axios.post('https://api.instagram.com/oauth/access_token', {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: code
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }
}

export const instagramService = new InstagramService();
export default InstagramService;
