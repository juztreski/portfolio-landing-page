# juztrezky Portfolio Landing Page

Portfolio landing page dengan Firebase Firestore integration.

## Fitur

- 🎨 Modern responsive design
- 🔥 Firebase Firestore database
- 🔐 Secure email/password authentication
- 📱 Multi-device project management
- ⚡ Real-time project updates
- 🎯 Showcase deployed projects

## Setup Firebase

### 1. Create Firebase Project
- https://console.firebase.google.com
- Add Project → `portfolio-landing-page`

### 2. Enable Authentication
- Authentication → Get started
- Email/Password → Enable

### 3. Create Firestore Database
- Firestore Database → Create database
- Start in test mode
- Region: asia-southeast1

### 4. Get Firebase Config
- Project Settings → Your apps → Web
- Copy config object
- Paste ke `firebase-config.js`

### 5. Create Admin User
- Authentication → Users
- Add user
- Email: `admin@example.com`
- Password: `Admin123!`

## Deploy

### Netlify
1. Push ke GitHub
2. Connect repository ke Netlify
3. Deploy!

## Admin Access
- URL: `/admin.html`
- Email: `admin@example.com`
- Password: `Admin123!`

## Default Project
- Modul Ajarku: https://projectmodulajarku.netlify.app/
