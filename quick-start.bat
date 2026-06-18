@echo off
REM Quick Start Script for Portfolio Project (Windows)

echo.
echo ======================================
echo Portfolio Project - Quick Start Setup
echo ======================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo ✅ Dependencies installed
) else (
    echo ✅ Dependencies already installed
)

echo.
echo ======================================
echo 📧 Email Configuration
echo ======================================
echo.

if not exist ".env" (
    echo ⚠️  .env file not found!
    echo Please follow these steps to set up email:
    echo.
    echo 1. Enable 2-Factor Authentication:
    echo    → https://myaccount.google.com/security
    echo.
    echo 2. Generate App Password:
    echo    → https://myaccount.google.com/apppasswords
    echo    → Select 'Mail' and 'Windows Computer'
    echo    → Copy the 16-character password
    echo.
    echo 3. Create .env file in this folder with:
    echo    SMTP_USER=tharanishbalaa@gmail.com
    echo    SMTP_PASS=^<your_16_char_password^>
    echo    SMTP_HOST=smtp.gmail.com
    echo    SMTP_PORT=587
    echo    SMTP_SECURE=false
    echo    PORT=5000
    echo.
    pause
) else (
    echo ✅ .env file found
)

echo.
echo ======================================
echo 🚀 Starting Development Server
echo ======================================
echo.
echo Starting both client and server...
echo   - Client: http://localhost:5173
echo   - Server: http://localhost:5000
echo.
echo Press Ctrl+C to stop the servers.
echo.

call npm run dev

pause
