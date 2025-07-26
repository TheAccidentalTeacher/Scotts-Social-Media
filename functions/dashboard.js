const axios = require('axios');

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
    // Get Instagram data by calling the Instagram function directly
    let instagramData = null;
    try {
      // Since we're in a serverless environment, we'll include the Instagram logic here
      // or make an internal call to the Instagram function
      const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
      
      if (accessToken) {
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

        instagramData = {
          profile: {
            username: profile.username,
            followers: 12500, // Instagram Basic Display API doesn't provide follower count
            posts: profile.media_count
          },
          recentPosts: media.map(post => ({
            id: post.id,
            title: extractTitle(post.caption),
            caption: post.caption,
            mediaType: post.media_type?.toLowerCase(),
            mediaUrl: post.media_url,
            thumbnailUrl: post.thumbnail_url,
            permalink: post.permalink,
            publishedAt: post.timestamp,
            likes: post.like_count || 0,
            comments: post.comments_count || 0,
            engagement: calculateEngagement(post.like_count, post.comments_count)
          }))
        };
      }
    } catch (error) {
      console.log('Could not fetch Instagram data:', error.message);
    }

    // Calculate stats based on real Instagram data or use defaults
    const instagramPosts = instagramData?.recentPosts || [];
    const totalLikes = instagramPosts.reduce((sum, post) => sum + (post.likes || 0), 0);
    const totalComments = instagramPosts.reduce((sum, post) => sum + (post.comments || 0), 0);
    const avgEngagement = instagramPosts.length > 0 
      ? (instagramPosts.reduce((sum, post) => sum + parseFloat(post.engagement || 0), 0) / instagramPosts.length).toFixed(1)
      : 4.2;

    // Mock dashboard data - now with some real Instagram integration
    const dashboardData = {
      stats: {
        followers: instagramData?.profile?.followers || 12500,
        engagement: parseFloat(avgEngagement),
        posts: instagramData?.profile?.posts || 24,
        growth: 8.5 // This would need historical data to calculate
      },
      upcomingPosts: [
        {
          id: 1,
          title: "5 Ninja Techniques for Classroom Management",
          platform: "instagram",
          status: "scheduled",
          scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Tomorrow
        },
        {
          id: 2,
          title: "Vibe-Coding: Making Math Fun",
          platform: "tiktok",
          status: "draft",
          scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // Day after tomorrow
        },
        {
          id: 3,
          title: "Teacher Hack: Organization Tips",
          platform: "facebook",
          status: "scheduled",
          scheduledFor: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
        }
      ],
      recentPerformance: instagramPosts.slice(0, 3).map(post => ({
        id: post.id,
        title: post.title,
        platform: 'instagram',
        publishedAt: post.publishedAt,
        engagement: parseFloat(post.engagement),
        likes: post.likes,
        comments: post.comments,
        shares: post.shares || 0
      })),
      contentIdeas: [
        {
          id: 1,
          title: "Back-to-School Ninja Prep",
          contentPillar: "Ninja Super Agent Missions",
          platforms: ["instagram", "tiktok", "facebook"],
          confidence: "high"
        },
        {
          id: 2,
          title: "Coding for Kids: Fun Projects",
          contentPillar: "Vibe-Coding Tutorials",
          platforms: ["youtube", "instagram"],
          confidence: "medium"
        },
        {
          id: 3,
          title: "Teacher Self-Care Tips",
          contentPillar: "Personal Updates",
          platforms: ["instagram", "facebook", "twitter"],
          confidence: "high"
        }
      ]
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(dashboardData)
    };

  } catch (error) {
    console.error('Dashboard function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
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
