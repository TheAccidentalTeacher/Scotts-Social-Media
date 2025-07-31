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
    const authHeader = event.headers.authorization || event.headers.Authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Missing or invalid authorization header' })
      };
    }

    const token = authHeader.substring(7);

    // Verify and decode token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch (jwtError) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid or expired token' })
      };
    }

    const { userId, platform, accessToken, expiresAt, userData, platformData } = decodedToken;

    // Check if token is expired
    if (Date.now() > expiresAt) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Access token expired' })
      };
    }

    // Return connection status and user data
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        connected: true,
        platform,
        user: {
          id: userId,
          name: userData.name,
          email: userData.email
        },
        platformData,
        expiresAt,
        tokenValid: true
      })
    };

  } catch (error) {
    console.error('Token verification error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to verify token',
        details: error.message 
      })
    };
  }
};
