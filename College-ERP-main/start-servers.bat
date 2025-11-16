@echo off
echo Starting College ERP Application...

echo.
echo Starting MongoDB (make sure MongoDB is installed and running)
echo If MongoDB is not running, please start it manually

echo.
echo Setting up test data (teacher, students, course)...
cd backend
node setupTestData.js

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "npm start"

echo.
echo Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:4000
echo Frontend: http://localhost:5173
echo.
echo Login credentials:
echo Roll Number: 208024
echo Password: admin123
echo Role: Teacher
echo.
pause