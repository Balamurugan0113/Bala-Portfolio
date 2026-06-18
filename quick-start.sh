#!/bin/bash
# Quick Start Script for Portfolio Project

echo "======================================"
echo "Portfolio Project - Quick Start Setup"
echo "======================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "======================================"
echo "📧 Email Configuration"
echo "======================================"
echo ""

if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "Please follow these steps to set up email:"
    echo ""
    echo "1. Enable 2-Factor Authentication:"
    echo "   → https://myaccount.google.com/security"
    echo ""
    echo "2. Generate App Password:"
    echo "   → https://myaccount.google.com/apppasswords"
    echo "   → Select 'Mail' and 'Windows Computer'"
    echo "   → Copy the 16-character password"
    echo ""
    echo "3. Create .env file with:"
    echo "   SMTP_USER=tharanishbalaa@gmail.com"
    echo "   SMTP_PASS=<your_16_char_password>"
    echo "   SMTP_HOST=smtp.gmail.com"
    echo "   SMTP_PORT=587"
    echo "   SMTP_SECURE=false"
    echo "   PORT=5000"
    echo ""
    read -p "Press Enter after creating .env file..."
else
    echo "✅ .env file found"
    if grep -q "SMTP_PASS=" .env && [ -z "$(grep '^SMTP_PASS=' .env | cut -d= -f2-)" ]; then
        echo "⚠️  SMTP_PASS is empty! Add your password to .env file"
        read -p "Press Enter after adding password..."
    fi
fi

echo ""
echo "======================================"
echo "🚀 Starting Development Server"
echo "======================================"
echo ""
echo "Starting both client and server..."
echo "  - Client: http://localhost:5173"
echo "  - Server: http://localhost:5000"
echo ""

npm run dev
