@echo off
echo Starting College ERP System...
echo.

echo Installing dependencies...
cd backend
call npm install
cd ../frontend
call npm install
cd ..

echo.
echo Starting servers...
start "Backend Server" cmd /k "cd backend && node index.js"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Backend: http://localhost:4000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul