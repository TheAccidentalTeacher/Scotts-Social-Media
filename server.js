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

// API for authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // TODO: Implement real authentication with database
  // For now, return unauthorized for all attempts
  res.status(401).json({
    success: false,
    message: 'Authentication not yet implemented. Please configure your authentication system.'
  });
});

// API for dashboard data
app.get('/api/dashboard', (req, res) => {
  // TODO: Implement real dashboard data fetching from database
  // For now, return empty data structure
  res.json({
    stats: {
      followers: 0,
      engagement: 0,
      posts: 0,
      growth: 0
    },
    upcomingPosts: [],
    recentPerformance: [],
    contentIdeas: []
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