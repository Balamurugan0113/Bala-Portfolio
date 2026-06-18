@echo off
REM Email Setup Verification Script for Windows

setlocal enabledelayedexpansion

echo.
echo ======================================
echo 📧 Email Configuration Verification
echo ======================================
echo.

REM Check .env file
if exist ".env" (
    echo [✓] .env file exists
) else (
    echo [✗] .env file not found
    echo    Create .env in root directory
)

REM Check SMTP_USER
findstr /I "SMTP_USER=tharanishbalaa@gmail.com" .env >nul 2>&1
if !errorlevel! equ 0 (
    echo [✓] SMTP_USER configured
) else (
    echo [✗] SMTP_USER not configured
    echo    Add: SMTP_USER=tharanishbalaa@gmail.com
)

REM Check if SMTP_PASS has value
for /f "tokens=2 delims==" %%A in ('findstr /I "SMTP_PASS" .env') do set "PASS_VALUE=%%A"
if "!PASS_VALUE!"=="" (
    echo [⚠] SMTP_PASS is empty
    echo    Add your 16-character Gmail App Password
) else (
    echo [✓] SMTP_PASS configured
)

REM Check node_modules
if exist "node_modules" (
    echo [✓] Dependencies installed
) else (
    echo [✗] Dependencies not installed
    echo    Run: npm install
)

REM Check server file
if exist "server\index.ts" (
    findstr /I "dotenv" server\index.ts >nul 2>&1
    if !errorlevel! equ 0 (
        echo [✓] Server has dotenv import
    )
    echo [✓] Server file exists
) else (
    echo [✗] Server file not found
)

REM Check Contact.tsx
if exist "client\src\pages\Contact.tsx" (
    echo [✓] Contact page exists
    findstr /I "tharanishbalaa@gmail.com" client\src\pages\Contact.tsx >nul 2>&1
    if !errorlevel! equ 0 (
        echo [✓] Email contact info integrated
    )
) else (
    echo [✗] Contact page not found
)

echo.
echo ======================================
echo Next Steps:
echo ======================================
echo.
echo 1. Get Gmail App Password:
echo    - https://myaccount.google.com/apppasswords
echo    - Copy the 16-character password
echo.
echo 2. Add to .env file:
echo    SMTP_PASS=xxxx xxxx xxxx xxxx
echo.
echo 3. Start development:
echo    npm run dev
echo.
echo 4. Test:
echo    http://localhost:5173/contact
echo.

pause
