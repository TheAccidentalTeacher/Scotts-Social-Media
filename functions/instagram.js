const axios = require('axios');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get Instagram access token from environment variables
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.log('Instagram access token not configured');
      // Return mock data if no token is set
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          profile: {
            username: 'theaccidentalteacher',
            followers: 12500,
            following: 340,
            posts: 156
          },
          recentPosts: [
            {
              id: 'mock_1',
              title: '10 Quick Classroom Hacks',
              caption: '10 Quick Classroom Hacks that will save you time and sanity! 🎓✨ #TeacherLife #ClassroomHacks',
              mediaType: 'image',
              mediaUrl: 'https://via.placeholder.com/400x400/36A9E1/white?text=Classroom+Hacks',
              permalink: 'https://instagram.com/p/mock1',
              publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              likes: 342,
              comments: 28,
              engagement: 5.8
            },
            {
              id: 'mock_2',
              title: 'Ninja Teacher Morning Routine',
              caption: 'How I start my day as a Ninja Teacher! Morning routines that actually work 🥷☕ #NinjaTeacher #MorningRoutine',
              mediaType: 'video',
              mediaUrl: 'https://via.placeholder.com/400x400/F7941D/white?text=Morning+Routine',
              permalink: 'https://instagram.com/p/mock2',
              publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              likes: 456,
              comments: 34,
              engagement: 6.2
            },
            {
              id: 'mock_3',
              title: 'Vibe-Coding with Kids',
              caption: 'Teaching kids to code with good vibes only! 💻🎵 Check out this simple project #VibeCoding #KidsCode',
              mediaType: 'carousel_album',
              mediaUrl: 'https://via.placeholder.com/400x400/8DC63F/white?text=Vibe+Coding',
              permalink: 'https://instagram.com/p/mock3',
              publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              likes: 234,
              comments: 19,
              engagement: 4.1
            }
          ],
          isConnected: false,
          needsAuth: true
        })
      };
    }

    // If we have a token, fetch real data
    const [profileResponse, mediaResponse] = await Promise.all([
      axios.get('https://graph.instagram.com/v1/me', {
        params: {
          fields: 'id,username,account_type,media_count',
          access_token: accessToken
        }
      }),
      axios.get('https://graph.instagram.com/v1/me/media', {
        params: {
          fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count',
          limit: 10,
          access_token: accessToken
        }
      })
    ]);

    const profile = profileResponse.data;
    const media = mediaResponse.data.data || [];

    // Format the data for the dashboard
    const formattedPosts = media.map(post => ({
      id: post.id,
      title: extractTitle(post.caption),
      caption: post.caption,
      mediaType: post.media_type.toLowerCase(),
      mediaUrl: post.media_url,
      thumbnailUrl: post.thumbnail_url,
      permalink: post.permalink,
      publishedAt: post.timestamp,
      likes: post.like_count || 0,
      comments: post.comments_count || 0,
      engagement: calculateEngagement(post.like_count, post.comments_count)
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        profile: {
          username: profile.username,
          accountType: profile.account_type,
          posts: profile.media_count
        },
        recentPosts: formattedPosts,
        isConnected: true,
        needsAuth: false
      })
    };

  } catch (error) {
    console.error('Instagram API error:', error.response?.data || error.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch Instagram data',
        message: error.message,
        isConnected: false,
        needsAuth: true
      })
    };
  }
};

// Helper function to extract title from caption
function extractTitle(caption) {
  if (!caption) return 'Instagram Post';
  
  const firstLine = caption.split('\n')[0];
  if (firstLine.length > 50) {
    return firstLine.substring(0, 47) + '...';
  }
  return firstLine || 'Instagram Post';
}

// Helper function to calculate engagement
function calculateEngagement(likes = 0, comments = 0) {
  const totalEngagement = likes + (comments * 3);
  return Math.min(((totalEngagement / 100) * 0.1), 10).toFixed(1);
}
