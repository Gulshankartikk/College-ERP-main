@echo off
echo 🔧 College ERP Quick Fix Tool
echo.

echo Checking system health...
node health-check.js
echo.

echo Applying common fixes...

echo ✅ Creating uploads directory...
cd backend
mkdir uploads 2>nul
cd ..

echo ✅ Installing missing dependencies...
cd backend
call npm install --silent
cd ../frontend  
call npm install --silent
cd ..

echo ✅ Clearing temporary files...
del /q /s node_modules\.cache 2>nul
del /q /s .next 2>nul

echo ✅ Setting up environment...
cd backend
if not exist .env (
    echo Creating .env file...
    copy .env.example .env 2>nul
)
cd ..

echo.
echo 🎉 Quick fixes applied!
echo 📖 Check TROUBLESHOOTING.md for specific issues
echo.
pause