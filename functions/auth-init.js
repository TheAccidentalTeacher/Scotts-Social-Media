const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { platform } = event.queryStringParameters || {};

    if (!platform) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Platform parameter required' })
      };
    }

    const appId = process.env.META_APP_ID;
    const redirectUri = process.env.META_REDIRECT_URI;

    if (!appId || !redirectUri) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Meta app configuration missing' })
      };
    }

    // Define permissions based on platform
    const permissions = {
      facebook_page: [
        'pages_manage_posts',
        'pages_read_engagement',
        'pages_show_list',
        'pages_manage_metadata',
        'public_profile'
      ],
      facebook_group: [
        'groups_access_member_info',
        'publish_to_groups',
        'public_profile'
      ],
      instagram: [
        'instagram_basic',
        'instagram_content_publish',
        'pages_show_list',
        'pages_read_engagement'
      ]
    };

    const scope = permissions[platform]?.join(',') || 'public_profile';

    // Generate OAuth URL
    const state = jwt.sign(
      { 
        platform,
        timestamp: Date.now(),
        nonce: Math.random().toString(36).substring(7)
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '10m' }
    );

    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?` +
      `client_id=${appId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${encodeURIComponent(state)}&` +
      `response_type=code`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        authUrl,
        state,
        platform,
        scope: scope.split(',')
      })
    };

  } catch (error) {
    console.error('Auth initiation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to initiate authentication',
        details: error.message 
      })
    };
  }
};
