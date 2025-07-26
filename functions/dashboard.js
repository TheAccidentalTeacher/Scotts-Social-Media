exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

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
    // Mock dashboard data - replace with real data later
    const dashboardData = {
      stats: {
        followers: 12500,
        engagement: 4.2,
        posts: 24,
        growth: 8.5
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
      recentPerformance: [
        {
          id: 1,
          title: "10 Quick Classroom Hacks",
          platform: "instagram",
          publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          engagement: 5.8,
          likes: 342,
          comments: 28,
          shares: 15
        },
        {
          id: 2,
          title: "Why I Became an Accidental Teacher",
          platform: "youtube",
          publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          engagement: 3.2,
          likes: 156,
          comments: 42,
          shares: 8
        },
        {
          id: 3,
          title: "Homeschool Resources You Need",
          platform: "facebook",
          publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
          engagement: 4.1,
          likes: 89,
          comments: 12,
          shares: 6
        }
      ],
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
