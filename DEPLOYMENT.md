# Deployment Guide

## ✅ Pre-Deployment Checklist

- [x] All dependencies installed
- [x] Environment variables configured
- [x] Database connection tested
- [x] Build process verified
- [x] API endpoints tested

## 🚀 Vercel Deployment (Frontend)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect the configuration from `vercel.json`
4. Click "Deploy"

### Environment Variables (Vercel)
No environment variables needed for frontend static deployment.

## 🖥️ Backend Deployment Options

### Option 1: Railway
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Add MongoDB database
4. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT`
   - `FRONTEND_URL`

### Option 2: Render
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables

### Option 3: Heroku
```bash
heroku create your-app-name
heroku addons:create mongolab
git push heroku main
```

## 🔧 Post-Deployment

### Update Frontend API URL
After backend deployment, update `frontend/src/services/api.js`:
```javascript
export const BASE_URL = "https://your-backend-url.com";
```

### Test Deployment
1. Test admin login
2. Test student login
3. Test teacher login
4. Verify all API endpoints
5. Check file uploads

## 📊 Monitoring

- Check application logs regularly
- Monitor database performance
- Set up error tracking (Sentry)
- Configure uptime monitoring

## 🔄 Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and redeploy
npm run build
```

Vercel and Railway auto-deploy on git push.