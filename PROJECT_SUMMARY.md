# The Accidental Teacher - Social Media Empire

## Project Summary

This project is a comprehensive, AI-powered social media marketing application for "The Accidental Teacher" brand. It automates content ideation, creation, scheduling, and posting across multiple social media platforms, focusing on educational content for teachers and homeschooling parents.

## What We've Built

1. **Core Application Architecture**
   - React-based frontend with React Router for navigation
   - Authentication system with JWT support
   - Responsive UI with custom CSS styling
   - Serverless functions for backend operations

2. **Key Features**
   - AI-powered content calendar generation
   - Multi-platform social media integration
   - Content generation for text, images, and video scripts
   - Analytics and performance tracking
   - Brand consistency tools

3. **Brand Identity**
   - Comprehensive brand style guide
   - Custom logo featuring a cheerful bearded teacher with colorful educational elements
   - Vibrant color palette (Blue, Orange, Green, Purple, Red, and Beige)
   - Typography system
   - Content templates for different platforms

4. **Content Strategy**
   - Six content pillars framework
   - Platform-specific content adaptation
   - Engagement strategy
   - Content calendar system

5. **Technical Components**
   - Serverless functions for content generation, social media posting, and analytics
   - Netlify deployment configuration
   - Development and build scripts
   - Demo page for showcasing the application

## Project Structure

```
/
├── public/                 # Public assets
├── src/
│   ├── assets/             # Static assets
│   │   └── brand/          # Brand assets (logo, colors, templates)
│   ├── components/         # Reusable components
│   │   └── Layout.js       # Main layout component
│   ├── context/            # React context providers
│   │   └── AuthContext.js  # Authentication context
│   ├── pages/              # Page components
│   │   ├── Dashboard.js    # Main dashboard
│   │   ├── Login.js        # Login page
│   │   └── NotFound.js     # 404 page
│   ├── services/           # API and service functions
│   │   ├── analyticsService.js     # Analytics service
│   │   ├── contentCalendar.js      # Content calendar service
│   │   ├── contentGenerator.js     # Content generation service
│   │   └── socialMediaIntegration.js # Social media integration
│   ├── styles/             # Global styles
│   │   └── global.css      # Global CSS styles
│   ├── App.js              # Main App component
│   └── index.js            # Entry point
├── functions/              # Netlify serverless functions
│   ├── analytics.js        # Analytics function
│   ├── generate-content.js # Content generation function
│   └── social-media-post.js # Social media posting function
├── demo/                   # Demo page
│   └── index.html          # Demo HTML page
├── build.sh                # Build script
├── start.sh                # Start script
├── server.js               # Express server for production
├── netlify.toml            # Netlify configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/the-accidental-teacher.git
   cd the-accidental-teacher
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   ./start.sh
   # or
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Using the Build Script

The build script helps with building the application for production:

```bash
./build.sh           # Default build
./build.sh --production  # Production build
./build.sh --skip-install  # Skip dependency installation
./build.sh --skip-tests    # Skip running tests
```

### Using the Start Script

The start script helps with starting the application:

```bash
./start.sh           # Start in development mode
./start.sh --prod    # Start in production mode
./start.sh --port=4000  # Start on a specific port
```

### Demo Credentials

- **Email**: admin@accidentalteacher.com
- **Password**: password

## Key Features

### AI-Powered Content Calendar

The content calendar service generates a rolling 3-month content calendar with:
- Weekly themes based on content pillars
- Platform-specific posting strategies
- Optimal posting times
- Content ideas tailored to each platform

### Content Generation

The content generation service creates:
- Text content for different platforms and content types
- Captions with hashtags
- Video scripts and storyboards
- Media content prompts

### Social Media Integration

The social media integration service handles:
- Authentication with social platforms
- Posting content to multiple platforms
- Scheduling posts for optimal times
- Retrieving analytics data

### Analytics and Insights

The analytics service provides:
- Cross-platform performance metrics
- Content performance analysis
- Audience insights
- Optimization recommendations

## Deployment

The application is configured for deployment on Netlify:

1. Connect your Netlify account to your GitHub repository
2. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Deploy the application

## Next Steps

1. **API Integration**: Implement real API integrations with social media platforms
2. **AI Services**: Connect to OpenAI or other AI services for content generation
3. **User Management**: Add multi-user support with role-based access control
4. **Enhanced Analytics**: Implement more sophisticated analytics and reporting
5. **Mobile App**: Develop a companion mobile application

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Social Media API Documentation](https://developers.facebook.com/)

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.