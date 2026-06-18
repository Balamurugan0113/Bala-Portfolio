#!/usr/bin/env bash
# Email Setup Verification Script

echo "======================================"
echo "📧 Email Configuration Checklist"
echo "======================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check .env file
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
else
    echo -e "${RED}✗${NC} .env file not found"
    echo "   Create .env file in the root directory"
fi

# Check SMTP_USER
if grep -q "SMTP_USER=tharanishbalaa@gmail.com" .env 2>/dev/null; then
    echo -e "${GREEN}✓${NC} SMTP_USER configured"
else
    echo -e "${RED}✗${NC} SMTP_USER not configured"
    echo "   Add: SMTP_USER=tharanishbalaa@gmail.com"
fi

# Check SMTP_PASS
if grep -q "SMTP_PASS=" .env 2>/dev/null; then
    if [ -z "$(grep '^SMTP_PASS=' .env | cut -d= -f2-)" ]; then
        echo -e "${YELLOW}⚠${NC}  SMTP_PASS is empty"
        echo "   Add your 16-character Gmail App Password"
    else
        echo -e "${GREEN}✓${NC} SMTP_PASS configured"
    fi
else
    echo -e "${RED}✗${NC} SMTP_PASS not found"
fi

# Check node_modules
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed (node_modules exists)"
else
    echo -e "${RED}✗${NC} Dependencies not installed"
    echo "   Run: npm install"
fi

# Check server file
if [ -f "server/index.ts" ]; then
    if grep -q "dotenv" server/index.ts; then
        echo -e "${GREEN}✓${NC} dotenv imported in server"
    else
        echo -e "${YELLOW}⚠${NC}  dotenv might not be imported"
    fi
    echo -e "${GREEN}✓${NC} Server file exists"
else
    echo -e "${RED}✗${NC} Server file not found"
fi

# Check Contact.tsx
if [ -f "client/src/pages/Contact.tsx" ]; then
    echo -e "${GREEN}✓${NC} Contact page exists"
    if grep -q "tharanishbalaa@gmail.com" client/src/pages/Contact.tsx; then
        echo -e "${GREEN}✓${NC} Email contact info integrated"
    else
        echo -e "${YELLOW}⚠${NC}  Email not found in Contact page"
    fi
else
    echo -e "${RED}✗${NC} Contact page not found"
fi

echo ""
echo "======================================"
echo "Next Steps:"
echo "======================================"
echo ""
echo "1. Add Gmail App Password to .env"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:5173"
echo "4. Test contact form on /contact page"
echo ""
