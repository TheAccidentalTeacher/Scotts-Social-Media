const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

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
    const { code, state, error } = event.queryStringParameters || {};

    if (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'OAuth cancelled or failed',
          details: error 
        })
      };
    }

    if (!code || !state) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing authorization code or state' })
      };
    }

    // Verify state token
    let decodedState;
    try {
      decodedState = jwt.verify(state, process.env.JWT_SECRET || 'fallback-secret');
    } catch (jwtError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid state token' })
      };
    }

    const { platform } = decodedState;

    // Exchange code for access token
    const tokenResponse = await fetch('https://graph.facebook.com/v19.0/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.META_APP_ID,
        client_secret: process.env.META_APP_SECRET,
        redirect_uri: process.env.META_REDIRECT_URI,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(`Token exchange failed: ${tokenData.error.message}`);
    }

    const accessToken = tokenData.access_token;

    // Get user info
    const userResponse = await fetch(
      `https://graph.facebook.com/v19.0/me?fields=id,name,email&access_token=${accessToken}`
    );
    const userData = await userResponse.json();

    // Get long-lived token
    const longLivedResponse = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
      `grant_type=fb_exchange_token&` +
      `client_id=${process.env.META_APP_ID}&` +
      `client_secret=${process.env.META_APP_SECRET}&` +
      `fb_exchange_token=${accessToken}`
    );
    const longLivedData = await longLivedResponse.json();

    // Platform-specific data fetching
    let platformData = {};

    if (platform === 'facebook_page' || platform === 'instagram') {
      // Get user's pages
      const pagesResponse = await fetch(
        `https://graph.facebook.com/v19.0/me/accounts?access_token=${longLivedData.access_token || accessToken}`
      );
      const pagesData = await pagesResponse.json();
      platformData.pages = pagesData.data || [];

      if (platform === 'instagram') {
        // Get Instagram accounts connected to pages
        for (let page of platformData.pages) {
          try {
            const igResponse = await fetch(
              `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${page.access_token}`
            );
            const igData = await igResponse.json();
            if (igData.instagram_business_account) {
              page.instagram_account = igData.instagram_business_account;
            }
          } catch (igError) {
            console.log(`No Instagram account for page ${page.id}`);
          }
        }
      }
    }

    // Create session token
    const sessionToken = jwt.sign(
      {
        userId: userData.id,
        platform,
        accessToken: longLivedData.access_token || accessToken,
        expiresAt: longLivedData.expires_in ? 
          Date.now() + (longLivedData.expires_in * 1000) : 
          Date.now() + (60 * 24 * 60 * 60 * 1000), // 60 days default
        userData,
        platformData
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '30d' }
    );

    // Return success response with redirect
    const redirectUrl = `${process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'}/setup/facebook-instagram?success=true&platform=${platform}&token=${sessionToken}`;

    return {
      statusCode: 302,
      headers: {
        ...headers,
        'Location': redirectUrl
      },
      body: ''
    };

  } catch (error) {
    console.error('Auth callback error:', error);
    
    const errorRedirect = `${process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'}/setup/facebook-instagram?error=${encodeURIComponent(error.message)}`;
    
    return {
      statusCode: 302,
      headers: {
        ...headers,
        'Location': errorRedirect
      },
      body: ''
    };
  }
};
