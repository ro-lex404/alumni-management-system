# Alumni Management System

A web platform that helps students connect with alumni for networking, mentorship, and job opportunities.

**Live Demo:** https://alumni-management-1.web.app/

## Features

- Google Sign-In authentication with Firebase Auth
- Alumni/student profile creation and updates
- Alumni directory view (dashboard)
- Job openings page
  - Alumni can post job opportunities
  - All users can browse available jobs
- Responsive navigation and layout

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Firebase
  - Authentication
  - Firestore
  - Hosting

## Repository Structure

This repository contains the app inside a nested directory:

```text
.
├── README.md
└── alumni-management-system/
    ├── src/
    ├── public/
    ├── package.json
    ├── firebase.json
    └── ...
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- A Firebase project configured for web

### Installation

```bash
cd /home/runner/work/alumni-management-system/alumni-management-system/alumni-management-system
npm install
```

### Environment Variables

Create a `.env` file in `/home/runner/work/alumni-management-system/alumni-management-system/alumni-management-system` with:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_MEASUREMENT_ID=
```

## Available Scripts

Run these commands from `/home/runner/work/alumni-management-system/alumni-management-system/alumni-management-system`:

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## App Routes

- `/` — Home
- `/profile` — User profile form
- `/dashboard` — Alumni listing
- `/JobOpenings` — Job opportunities

## Firebase Notes

- Firestore collections used:
  - `alumni`
  - `jobOpportunities`
- Hosting rewrites are configured to serve `index.html` for SPA routing.

## Deployment

The project includes Firebase Hosting configuration (`firebase.json`) targeting project `alumni-management-1` in `.firebaserc`.

