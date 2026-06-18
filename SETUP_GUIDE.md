# Portfolio Project - Setup & Deployment Guide

## Quick Start - Development Mode

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Gmail Account** with 2-Factor Authentication enabled

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Email (IMPORTANT!)

To enable email notifications when someone submits the contact form:

1. **Enable 2-Factor Authentication on Gmail:**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the 16-character password generated

3. **Update `.env` file:**
   ```
   SMTP_USER=tharanishbalaa@gmail.com
   SMTP_PASS=<paste_your_16_char_password_here>
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   PORT=5000
   ```
   - Replace `<paste_your_16_char_password_here>` with your actual App Password
   - **DO NOT commit `.env` to git** (it's already in .gitignore)

### Step 3: Run Development Server

**Option A - Both Client & Server (Recommended):**
```bash
npm run dev
```
This starts:
- React client on http://localhost:5173
- Express server on http://localhost:5000
- Auto-reload on file changes

**Option B - Client Only:**
```bash
npm run dev:client
```
Runs Vite dev server on http://localhost:5173

**Option C - Server Only:**
```bash
npm run dev:server
```
Runs Express server on http://localhost:5000

### Step 4: Test Contact Form
1. Open http://localhost:5173/contact
2. Fill out the form with test data
3. Submit the form
4. Check your inbox (tharanishbalaa@gmail.com) for the email

---

## Production Build & Deployment

### Build Process
```bash
npm run build
```
This creates:
- `dist/client/` - Compiled React app
- `dist/server/` - Compiled Express server

### Run Production Server
```bash
npm run build:server
npm start
```

The server will:
- Serve the compiled React client from `dist/client`
- Listen on port 5000 (or `PORT` env var)
- Handle API requests including `/api/contact`

---

## Contact Form Features

### Current Configuration
- **Your Email:** tharanishbalaa@gmail.com
- **Phone:** +91 9159850002
- **Location:** Coimbatore, Tamil Nadu, India

### Form Validation
- **Name:** Minimum 2 characters (required)
- **Email:** Valid email format (required)
- **Company:** Optional field
- **Message:** Minimum 10 characters (required)

### Email Notifications
When someone submits the contact form, you'll receive an email containing:
- Sender's name and email
- Company/Organization (if provided)
- Full message payload
- Timestamp of submission

### Contact Info Display
The contact information is displayed as clickable cards:
- **Email:** Clicking opens the user's default email client
- **Phone:** Clicking opens the user's default phone app (if on mobile)
- **Location:** Shows your address

---

## Troubleshooting

### Email Not Sending?

1. **Check .env file:**
   - Make sure `.env` file exists in the root directory
   - Verify all SMTP credentials are correct
   - No extra spaces in values

2. **Check Console:**
   - Start the dev server: `npm run dev`
   - Look for messages in the terminal
   - If you see: "⚠️ SMTP credentials missing", the .env file wasn't loaded

3. **Gmail App Password Issues:**
   - Make sure you're using the 16-character password (with spaces)
   - Don't copy-paste from email - retype or use password manager
   - Verify 2-Factor Authentication is enabled first

4. **Port Already in Use:**
   - Change PORT in .env file to a different number
   - Or kill the existing process using the port

### Form Not Submitting?

1. Check browser console for errors (F12)
2. Verify server is running (`npm run dev`)
3. Check that API proxy is configured (vite.config.ts)

### React Not Loading?

1. Clear browser cache (Ctrl+Shift+Delete)
2. Try incognito/private window
3. Check that Vite dev server is running on port 5173

---

## Environment Variables Reference

| Variable | Default | Purpose |
|----------|---------|---------|
| SMTP_USER | - | Gmail address (required for email) |
| SMTP_PASS | - | Gmail App Password (required for email) |
| SMTP_HOST | smtp.gmail.com | SMTP server address |
| SMTP_PORT | 587 | SMTP port (587 for TLS) |
| SMTP_SECURE | false | Use TLS (false = TLS, true = SSL) |
| PORT | 5000 | Express server port |

---

## Project Structure

```
Portfolio/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/       # Page components (Home, Contact, etc.)
│   │   ├── components/  # Reusable UI components
│   │   └── hooks/       # Custom React hooks
│   └── index.html       # Entry point
├── server/              # Express backend
│   └── index.ts         # API endpoints and email logic
├── shared/              # Shared types and constants
│   └── const.ts         # Portfolio content constants
├── .env                 # Environment variables (DO NOT COMMIT)
├── .env.example         # Template for .env file
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration

```

---

## Scripts Reference

```bash
npm run dev              # Start both client and server (best for development)
npm run dev:client      # Start only React client
npm run dev:server      # Start only Express server
npm run build           # Build client for production
npm run build:server    # Build server TypeScript
npm start               # Run production server
```

---

## Contact Information

**Portfolio Owner:** Balamurugan C
- **Email:** tharanishbalaa@gmail.com
- **Phone:** +91 9159850002
- **Location:** Coimbatore, Tamil Nadu, India

For any issues or questions about the setup, refer to the troubleshooting section above.
