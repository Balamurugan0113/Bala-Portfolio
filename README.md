# Balamurugan C — Portfolio

AI & Security Engineer portfolio built with React, Three.js, and Express. Features a 3D particle scene, project showcase with live code inspector, and a contact form with email notifications.

## Tech Stack

**Frontend:** React 19, TypeScript, Tailwind CSS, Framer Motion, Three.js (R3F + OGL), Vite

**Backend:** Express.js, Nodemailer, TypeScript

**Deployment:** Vercel (SPA + serverless API)

## Features

- 3D animated hero scene with particle field
- Project showcase with modal code inspector
- Skills, certifications & proficiency bars
- Contact form with SMTP email notifications
- Smooth scroll navigation with active tracking
- Responsive design with glassmorphic UI

## Getting Started

```bash
npm install
cp .env.example .env   # configure SMTP credentials
npm run dev             # frontend :5173 + backend :5000
```

## Build

```bash
npm run build           # production build
```

## Project Structure

```
src/
  components/     # UI primitives, layout
  features/       # section components (hero, about, skills, projects, contact)
  hooks/          # custom hooks
  types/          # portfolio data & constants
projects/         # standalone project source code
server/           # Express API
api/              # Vercel serverless function
shared/           # shared types & project files
```

## License

Personal portfolio — Balamurugan C
