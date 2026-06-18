# 🔐 Balamurugan C - Ethical Hacker Portfolio

## 📋 Overview

This is a full-stack portfolio website showcasing penetration testing expertise, security skills, and successful audit projects. It includes a contact form with automated email notifications.

**Your Contact Information:**
- **Name:** Balamurugan C
- **Email:** tharanishbalaa@gmail.com
- **Phone:** +91 9159850002
- **Location:** Coimbatore, Tamil Nadu, India

---

## 🚀 Quick Start Guide

### Option 1: Automated Setup (Recommended for Windows)

Simply run the quick-start script:
```bash
quick-start.bat
```

This will:
1. Install dependencies
2. Guide you through email setup
3. Start the development server

### Option 2: Manual Setup

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Configure Email
Create a `.env` file in the root directory with your Gmail App Password:

```env
SMTP_USER=tharanishbalaa@gmail.com
SMTP_PASS=your_16_character_app_password_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
PORT=5000
```

**⚠️ IMPORTANT - Get Your Gmail App Password:**

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" → "Windows Computer" (or your device)
5. Google will generate a 16-character password
6. Copy it and paste into `.env` as `SMTP_PASS`

#### Step 3: Start Development Server
```bash
npm run dev
```

This starts:
- **Frontend:** http://localhost:5173 (React)
- **Backend:** http://localhost:5000 (Express)

---

## 📊 Project Structure

```
Portfolio/
├── client/                      # React frontend
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx      ← Main contact page
│   │   │   └── NotFound.tsx
│   │   ├── components/          # UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── ui/              # UI primitives
│   │   └── index.html
│   └── public/
├── server/                      # Express backend
│   └── index.ts                 # API endpoints & email logic
├── shared/                      # Shared types & constants
│   └── const.ts                 # Portfolio content
├── .env                         # Environment variables (DO NOT COMMIT)
├── .env.example                 # Template for .env
├── .gitignore                   # Excludes .env from Git
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite config
└── SETUP_GUIDE.md               # Detailed setup guide
```

---

## 📨 Email Integration Features

### How It Works

1. **Visitor submits contact form** → Form validation on frontend
2. **Request sent to backend** → POST `/api/contact`
3. **Email sent to you** → Via Gmail SMTP
4. **Visitor sees confirmation** → Toast notification

### Contact Form Fields

- **Full Name** *(Required)* - Minimum 2 characters
- **Email Address** *(Required)* - Must be valid email
- **Company/Organization** *(Optional)* - Company name
- **Message** *(Required)* - Minimum 10 characters

### Email Notification Content

When someone submits the contact form, you'll receive an email with:
- Sender's name
- Sender's email address
- Company (if provided)
- Full message
- Timestamp

### Contact Information Display

The contact page displays your information as clickable cards:
- ✉️ **Email** - Click to open default email client
- 📞 **Phone** - Click to call (mobile) or open dialer
- 📍 **Location** - Your address display

---

## 🏗️ Building for Production

### Build Frontend
```bash
npm run build
```
Creates `dist/client/` with optimized React build

### Build Server
```bash
npm run build:server
```
Compiles TypeScript to JavaScript in `dist/server/`

### Run Production Server
```bash
npm start
```

The server will:
- Serve the compiled React frontend
- Listen on port 5000
- Handle all API requests
- Send emails via Gmail SMTP

**Set Environment Variables in Production:**
- `SMTP_USER` - Your Gmail address
- `SMTP_PASS` - Your Gmail App Password
- `PORT` - Server port (default 5000)

---

## 🛠️ Available Scripts

```bash
npm run dev              # Start client + server (development)
npm run dev:client      # Start only React client (port 5173)
npm run dev:server      # Start only Express server (port 5000)
npm run build           # Build client for production
npm run build:server    # Compile server TypeScript
npm start               # Run production server
```

---

## 🔍 DOM/Error Checking

The portfolio includes:

✅ **Error Boundary** - Catches React errors and prevents white screens
✅ **Form Validation** - Zod schema validation on all inputs
✅ **API Error Handling** - Try-catch blocks with user-friendly messages
✅ **Responsive Design** - Mobile-friendly layout
✅ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation

### Check for Errors
Open browser Developer Tools (F12) → Console tab to see any errors.

---

## 🐛 Troubleshooting

### Email Not Sending?

**Problem:** Contact form submits but no email received

**Solutions:**
1. **Check .env file exists** in root directory
2. **Verify credentials:**
   - `SMTP_USER=tharanishbalaa@gmail.com`
   - `SMTP_PASS` is not empty
3. **Check server logs** - Look for email errors in terminal
4. **Try a fresh password:**
   - Go to https://myaccount.google.com/apppasswords
   - Generate a new 16-character password
   - Update .env file
   - Restart server

### Form Not Submitting?

1. Check browser console (F12) for errors
2. Verify server is running on port 5000
3. Check that Vite proxy is working (should see in terminal)
4. Clear browser cache and try again

### Server Won't Start?

**Error: Port 5000 already in use**
- Change `PORT=5000` to `PORT=5001` in .env
- Restart server

**Error: Cannot find module**
- Run `npm install` again
- Delete `node_modules` and `.npmrc`, then run `npm install`

### React Page Not Loading?

1. Clear browser cache (Ctrl+Shift+Delete)
2. Try private/incognito window
3. Verify Vite is running on port 5173
4. Check that API proxy is configured

---

## 📱 Contact Information (Clickable)

On the contact page, your information is interactive:

```
✉️ Email: tharanishbalaa@gmail.com
   → Click to open email client
   
📞 Phone: +91 9159850002
   → Click to call (mobile) or dial

📍 Location: Coimbatore, Tamil Nadu, India
   → Displays your address
```

---

## 🔒 Security Notes

- **`.env` file:** Contains sensitive credentials - NEVER commit to Git
- **`.gitignore`:** Already configured to exclude `.env`
- **Gmail Password:** Only store App Passwords, never your actual Gmail password
- **Client-side:** Contact form is purely client→server, no exposure to frontend code

---

## 📚 Tech Stack

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS
- Vite
- React Hook Form + Zod validation
- Wouter (routing)

**Backend:**
- Express.js
- TypeScript
- Nodemailer (email)
- dotenv (environment variables)

**Development:**
- Concurrently (run both servers)
- tsx (TypeScript runner)

---

## 📄 License

This is a personal portfolio website for Balamurugan C.

---

## 📞 Support

For issues or questions about setup:
1. Check the **Troubleshooting** section above
2. Review `SETUP_GUIDE.md` for detailed instructions
3. Check browser console (F12) for error messages
4. Verify all environment variables in `.env`

**Happy testing! 🎯**
