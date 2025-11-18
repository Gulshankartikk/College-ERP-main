# Troubleshooting Guide

## 🚨 Common Issues & Solutions

### 1. Server Won't Start
```bash
# Check if ports are in use
netstat -an | findstr :4000
netstat -an | findstr :5173

# Kill processes if needed
taskkill /f /im node.exe
```

### 2. Database Connection Failed
```bash
# Start MongoDB service
net start MongoDB

# Or use MongoDB Compass to verify connection
# Connection string: mongodb://localhost:27017/college-erp
```

### 3. File Upload Not Working
- Check if `uploads/` directory exists in backend
- Verify file size (max 10MB)
- Ensure proper file types (PDF, DOC, PPT, images)

### 4. Login Issues
**Default Credentials:**
- Admin: `admin` / `admin123`
- Teacher: `john.smith@college.edu` / `teacher123`
- Student: `alice@student.edu` / `student123`

### 5. 404 Errors
- Clear browser cache
- Check if backend server is running
- Verify route paths in browser URL

### 6. CORS Errors
- Backend configured for `http://localhost:5173`
- If using different port, update `.env` file

### 7. Token Expired
- Logout and login again
- Tokens expire after 24 hours

### 8. File Download Issues
- Check if file URL is accessible
- Verify file exists in uploads directory
- Check browser popup blocker

## 🔧 Quick Fixes

### Reset Database
```bash
cd backend
node clearDB.js
node setupCompleteERP.js
```

### Reinstall Dependencies
```bash
# Backend
cd backend && npm install

# Frontend  
cd frontend && npm install
```

### Clear Browser Data
- Clear cookies for localhost
- Clear localStorage
- Hard refresh (Ctrl+F5)

## 📞 Support Commands

### Check System Status
```bash
# Backend health check
curl http://localhost:4000

# Frontend check
curl http://localhost:5173
```

### View Logs
- Backend: Check terminal running `node index.js`
- Frontend: Check browser console (F12)
- Database: Check MongoDB logs

## ⚡ Performance Tips
1. Use Chrome/Firefox for best experience
2. Ensure stable internet connection
3. Close unnecessary browser tabs
4. Restart servers if sluggish