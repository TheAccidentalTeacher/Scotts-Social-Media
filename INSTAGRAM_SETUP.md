# Instagram Integration Setup Guide

This guide will walk you through setting up Instagram integration for your social media dashboard.

## Step 1: Create a Facebook Developer Account

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Get Started" and create a developer account
3. Verify your account (you may need to add a phone number)

## Step 2: Create an App

1. In Facebook Developer Console, click "Create App"
2. Choose "Consumer" as the app type
3. Fill in your app details:
   - **App Name**: "The Accidental Teacher Social Media"
   - **App Contact Email**: Your email
   - **Purpose**: Choose "Yourself or your own business"

## Step 3: Add Instagram Basic Display

1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Go to Instagram Basic Display > Basic Display
4. Click "Create New App"
5. Fill in the required fields:
   - **Display Name**: "The Accidental Teacher"
   - **Valid OAuth Redirect URIs**: `https://your-site.netlify.app/auth/instagram/callback`
   - **Deauthorize Callback URL**: `https://your-site.netlify.app/auth/instagram/deauthorize`
   - **Data Deletion Request URL**: `https://your-site.netlify.app/auth/instagram/delete`

## Step 4: Get Your Credentials

1. Go to Settings > Basic in your app dashboard
2. Note down your **App ID** and **App Secret**
3. Add these to your Netlify environment variables:
   - `INSTAGRAM_CLIENT_ID` = Your App ID
   - `INSTAGRAM_CLIENT_SECRET` = Your App Secret

## Step 5: Add Test Users

1. Go to Instagram Basic Display > Basic Display
2. Scroll down to "Instagram Testers"
3. Click "Add Instagram Testers"
4. Enter your Instagram username
5. Go to your Instagram app and accept the tester invitation

## Step 6: Generate Access Token

You can generate a temporary access token for testing:

1. Go to Instagram Basic Display > Basic Display
2. Scroll down to "User Token Generator"
3. Click "Generate Token" next to your Instagram account
4. Copy the generated access token
5. Add it to your Netlify environment variables as `INSTAGRAM_ACCESS_TOKEN`

## Step 7: Configure Netlify Environment Variables

1. Go to your Netlify site dashboard
2. Go to Site settings > Environment variables
3. Add the following variables:
   ```
   INSTAGRAM_CLIENT_ID=your_app_id
   INSTAGRAM_CLIENT_SECRET=your_app_secret
   INSTAGRAM_ACCESS_TOKEN=your_generated_token
   ```

## Step 8: Deploy and Test

1. Push your changes to GitHub
2. Netlify will automatically redeploy
3. Visit your site and check if Instagram data appears in the dashboard

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
