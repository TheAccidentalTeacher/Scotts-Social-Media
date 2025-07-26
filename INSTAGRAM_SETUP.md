# Instagram Integration Setup Guide

This guide will walk you through setting up Instagram integration for your social media dashboard.

## 🔍 **Which Instagram API to Use?**

### Instagram Basic Display API (Read-Only)
- ✅ View your posts and basic analytics
- ❌ **Cannot post or schedule content**
- Good for: Personal dashboards, content analysis

### Instagram Graph API (Full Features) - **RECOMMENDED**
- ✅ **Post photos and videos directly to Instagram**
- ✅ **Schedule posts**
- ✅ Advanced analytics and insights
- ✅ Story posting and management
- Requires: Facebook Business Page + Instagram Business Account

**For The Accidental Teacher social media empire, we recommend the Graph API for full posting capabilities.**

---

## Step 1: Set Up Instagram Business Account

## Step 1: Set Up Instagram Business Account

**First, you need to convert your Instagram to a Business Account:**

1. Open Instagram app on your phone
2. Go to Settings > Account > Switch to Professional Account
3. Choose "Business" (not Creator)
4. Complete the business setup with your details

## Step 2: Create Facebook Business Page

1. Go to [Facebook](https://facebook.com)
2. Click "Create" > "Page"
3. Choose "Business or Brand"
4. Fill in details:
   - **Page Name**: "The Accidental Teacher"
   - **Category**: "Education" or "Teacher"
   - **Description**: Your teaching brand description

## Step 3: Connect Instagram to Facebook Page

1. Go to your Facebook Business Page
2. Go to Settings > Instagram
3. Click "Connect Account"
4. Log in with your Instagram Business Account credentials
5. Authorize the connection

## Step 4: Create a Facebook Developer Account

1. In Facebook Developer Console, click "Create App"
2. Choose "Consumer" as the app type
3. Fill in your app details:
   - **App Name**: "The Accidental Teacher Social Media"
   - **App Contact Email**: Your email
   - **Purpose**: Choose "Yourself or your own business"

## Step 4: Create a Facebook Developer Account

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Get Started" and create a developer account
3. Verify your account (you may need to add a phone number)

## Step 5: Create an App

1. In Facebook Developer Console, click "Create App"
2. Choose "Business" as the app type (not Consumer)
3. Fill in your app details:
   - **App Name**: "The Accidental Teacher Social Media"
   - **App Contact Email**: Your email
   - **Business Use Case**: "Manage and publish content"

## Step 6: Add Instagram Graph API

1. In your app dashboard, click "Add Product"
2. Find "Instagram Graph API" and click "Set Up"
3. This gives you posting capabilities (not just read-only)

## Step 7: Get Your Credentials and Permissions

1. Go to Settings > Basic in your app dashboard
2. Note down your **App ID** and **App Secret**
## Step 7: Get Your Credentials and Permissions

1. Go to Settings > Basic in your app dashboard
2. Note down your **App ID** and **App Secret**
3. Go to Instagram Graph API > Settings
4. Add your Instagram Business Account:
   - Click "Add Instagram Account"
   - Select your connected Instagram Business Account
5. Request permissions:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_read_engagement`
   - `pages_show_list`

## Step 8: Generate Access Token

For Instagram Graph API, you need a Page Access Token:

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Select your Facebook Page
4. Add permissions: `instagram_basic`, `instagram_content_publish`, `pages_show_list`
5. Click "Generate Access Token"
6. **Important**: Generate a long-lived token (60 days) using the Token Debugger

## Step 9: Configure Netlify Environment Variables

## Step 9: Configure Netlify Environment Variables

1. Go to your Netlify site dashboard
2. Go to Site settings > Environment variables
3. Add the following variables:
   ```
   INSTAGRAM_CLIENT_ID=your_app_id
   INSTAGRAM_CLIENT_SECRET=your_app_secret
   INSTAGRAM_ACCESS_TOKEN=your_page_access_token
   FACEBOOK_PAGE_ID=your_facebook_page_id
   INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id
   ```

## Step 10: Deploy and Test

1. Push your changes to GitHub
2. Netlify will automatically redeploy
3. Visit your site and check if Instagram data appears in the dashboard

## 📸 **Posting Capabilities with Instagram Graph API**

Once set up with Graph API, your dashboard can:

### ✅ **What You Can Post**:
- Single photos
- Video posts (up to 60 seconds)
- Carousel posts (multiple photos/videos)
- Stories (with additional permissions)

### ✅ **Posting Features**:
- **Direct posting**: Publish immediately
- **Scheduled posting**: Schedule for later (up to 75 days in advance)
- **Caption with hashtags**: Full caption support
- **Location tagging**: Add location to posts
- **Alt text**: Add accessibility descriptions

### ✅ **Analytics You Get**:
- Impressions, reach, engagement
- Profile visits, website clicks
- Story metrics
- Audience demographics
- Best posting times

### 🚫 **Limitations**:
- Cannot post Stories with music
- Cannot post Reels with original audio
- Some advanced Reels features not available via API
- Rate limits: 25 posts per user per 24 hours

## 🔧 **Development Roadmap**

**Phase 1**: Read Instagram data (current)
**Phase 2**: Post single photos with captions
**Phase 3**: Schedule posts for optimal times
**Phase 4**: Carousel posts and video support
**Phase 5**: Stories and advanced analytics

## Important Notes

- **Access Token Expiry**: User access tokens expire after 60 days. For production, you'll need to implement token refresh logic.
- **Rate Limits**: Instagram API has rate limits. Be mindful of how often you call the API.
- **Privacy**: Never commit access tokens to your repository. Always use environment variables.

## Troubleshooting

### Common Issues:

1. **"Invalid OAuth access token"**
   - Check if your access token is correct
   - Verify the token hasn't expired
   - Make sure you're using the token for the correct Instagram account

2. **"Application request limit reached"**
   - You've hit Instagram's rate limit
   - Wait before making more requests

3. **"Invalid redirect URI"**
   - Make sure the redirect URI in your Facebook app matches exactly
   - Check for trailing slashes and protocol (https://)

## Next Steps

Once Instagram integration is working:

1. Implement automatic token refresh
2. Add Facebook integration
3. Add other social media platforms
4. Implement posting capabilities
5. Add analytics and insights

## Resources

- [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Facebook App Development Guide](https://developers.facebook.com/docs/development/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
