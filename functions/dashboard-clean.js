exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  console.log('Dashboard function called:', event.httpMethod);

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Return empty/initial state data until accounts are connected
    const dashboardData = {
      stats: {
        totalFollowers: 0,
        engagementRate: 0,
        postsThisMonth: 0,
        growthRate: 0
      },
      upcomingPosts: [],
      recentActivity: [],
      connectedAccounts: {
        instagram: false,
        facebook: false,
        twitter: false
      },
      lastUpdated: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(dashboardData)
    };

  } catch (error) {
    console.error('Dashboard error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch dashboard data',
        message: error.message 
      })
    };
  }
};
