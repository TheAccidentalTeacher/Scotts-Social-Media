const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https://placeholder.com', 'https://via.placeholder.com'],
      connectSrc: ["'self'"]
    }
  }
}));

// Enable CORS
app.use(cors());

// Compress responses
app.use(compression());

// Parse JSON bodies
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mock API for authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple mock authentication
  if (email === 'admin@accidentalteacher.com' && password === 'password') {
    res.json({
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: '1',
        name: 'The Accidental Teacher',
        email: 'admin@accidentalteacher.com',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
});

// Mock API for dashboard data
app.get('/api/dashboard', (req, res) => {
  res.json({
    stats: {
      followers: 5280,
      engagement: 4.7,
      posts: 127,
      growth: 8.3
    },
    upcomingPosts: [
      {
        id: 'post1',
        title: '3 Simple Steps to Teach Variables to 8-Year-Olds',
        platform: 'instagram',
        scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled',
        contentType: 'carousel'
      },
      {
        id: 'post2',
        title: 'The Ninja Method for Teaching Loops',
        platform: 'facebook',
        scheduledFor: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
        status: 'draft',
        contentType: 'post'
      },
      {
        id: 'post3',
        title: 'FREE DOWNLOAD: Coding Concept Cards for K-3',
        platform: 'twitter',
        scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'scheduled',
        contentType: 'thread'
      }
    ],
    recentPerformance: [
      {
        id: 'perf1',
        title: 'Classroom Mission: Debug the Story',
        platform: 'instagram',
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        engagement: 6.8,
        likes: 245,
        comments: 37,
        shares: 18
      },
      {
        id: 'perf2',
        title: 'Behind the Scenes: Creating Next Week\'s Vibe-Coding Challenge',
        platform: 'facebook',
        publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        engagement: 5.2,
        likes: 178,
        comments: 24,
        shares: 12
      },
      {
        id: 'perf3',
        title: 'POLL: Biggest Coding Teaching Challenge?',
        platform: 'twitter',
        publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        engagement: 4.9,
        likes: 132,
        comments: 45,
        shares: 8
      }
    ],
    contentIdeas: [
      {
        id: 'idea1',
        title: 'How to Use Gamification in Coding Classes',
        contentPillar: 'Vibe-Coding Tutorials',
        confidence: 'high',
        platforms: ['instagram', 'youtube']
      },
      {
        id: 'idea2',
        title: '5 Unplugged Coding Activities for Elementary Students',
        contentPillar: 'Resource Drops',
        confidence: 'medium',
        platforms: ['pinterest', 'facebook']
      },
      {
        id: 'idea3',
        title: 'Coding Vocabulary Cheat Sheet for Teachers',
        contentPillar: 'Resource Drops',
        confidence: 'high',
        platforms: ['instagram', 'pinterest']
      }
    ]
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});