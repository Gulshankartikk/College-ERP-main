# College ERP System Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

## Quick Start

### Option 1: Windows Batch File
```bash
# Double-click start.bat or run in command prompt
start.bat
```

### Option 2: Manual Setup
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start backend server
cd ../backend
node index.js

# Start frontend server (in new terminal)
cd ../frontend
npm run dev
```

## Default Login Credentials

### Admin
- Username: `admin`
- Password: `admin123`

### Teacher
- Username: `john.smith@college.edu`
- Password: `teacher123`

### Student
- Username: `alice@student.edu`
- Password: `student123`

## System URLs
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- Database: mongodb://localhost:27017/college-erp

## Features
✅ Admin Dashboard & Management
✅ Teacher Content Upload
✅ Student Resource Access
✅ Attendance Management
✅ File Upload/Download
✅ Authentication & Authorization
✅ Responsive Design

## Troubleshooting

### MongoDB Connection Issues
1. Ensure MongoDB is running
2. Check connection string in `.env`
3. Verify database permissions

### Port Conflicts
- Backend: Change PORT in `.env`
- Frontend: Change port in `vite.config.js`

### File Upload Issues
- Check `uploads/` directory exists
- Verify file permissions
- Check file size limits (10MB max)

## Support
For issues, check the console logs in both frontend and backend terminals.