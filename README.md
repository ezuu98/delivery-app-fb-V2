# FreshBasket — Express MVC + Firebase Auth

FreshBasket is a Node.js/Express MVC web app with EJS views and Firebase Authentication. It uses a single shared package.json and runs with one command.

## Tech Stack
- Node.js + Express (MVC)
- EJS + express-ejs-layouts
- Firebase Auth (Web SDK) with Admin session cookies (firebase-admin)
- Cookie-based auth (secure, SameSite=None)
- CSS (vanilla) with Inter font

## Project structure
```
./
├─ package.json
├─ public/                # static assets (styles.css, images)
├─ src/
│  ├─ index.js            # app entry
│  ├─ server.js           # express server + middleware
│  ├─ routes/             # route definitions
│  │   ├─ index.js
│  │   └─ auth.js
│  ├─ controllers/        # controllers for views and endpoints
│  │   ├─ homeController.js
│  │   ├─ firebaseAuthController.js
│  │   └─ pagesController.js
│  ├─ middleware/
│  │   ├─ currentUser.js  # decodes Firebase session cookie
│  │   └─ auth.js         # ensureAuthenticated guard
│  ├─ models/             # demo data models
│  │   ├─ messageModel.js
│  │   └─ riderModel.js
│  ├─ services/
│  │   └─ firebaseAdmin.js
│  └─ views/              # EJS templates (layouts + pages)
│      ├─ layout.ejs
│      ├─ home.ejs, 404.ejs, dashboard.ejs
│      ├─ auth/login.ejs, auth/register.ejs
│      └─ sections/{orders,riders,customers,reports}.ejs
└─ nodemon.json
```

## Getting started
Requirements: Node 18+

1) Install dependencies
```
npm install
```

2) Configure environment variables
Set these in your environment (recommended via the platform env settings, not a committed .env):

Client (Web SDK):
- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_PROJECT_ID
- FIREBASE_APP_ID
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_MEASUREMENT_ID (optional)

Admin (Service Account):
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY  # use literal \n for newlines

Optional:
- PORT (default 3000)

Firebase console setup:
- Enable Authentication → Email/Password
- Authentication → Settings → Authorized domains: add your deployed domain and localhost
- If your API key has HTTP referrer restrictions (GCP → Credentials), add the same domains

3) Run the app
```
npm run dev
```
Open: http://localhost:3000/

Note: The app sets a secure SameSite=None session cookie named `__session`. If running inside an iframe or with third‑party cookies blocked, open the preview in a new tab.

## Auth flow
- Client signs in via Firebase Web SDK on /auth/login or registers on /auth/register
- Client sends ID token to server: POST /auth/session
- Server (firebase-admin) issues session cookie (`__session`)
- Protected pages require cookie: /dashboard, /orders, /riders, /customers, /reports
- Logout: POST /auth/logout (clears cookie)

## Routes
- GET / → redirects to /dashboard if authenticated, else /auth/login
- GET /auth/login, /auth/register → public pages (header hidden)
- POST /auth/session → exchange Firebase ID token for session cookie
- POST /auth/logout → clear cookie
- GET /dashboard → Rider commissions dashboard (protected)
- GET /orders, /riders, /customers, /reports → placeholder pages (protected)
- GET /messages → demo JSON

## Styling & branding
- Navbar shows FreshBasket brand and logo
- Global background: #F7FAFC
- Inter font (700 on brand/title)
- Nav links scale on hover (no color change)

## Security notes (production)
- Always serve over HTTPS; cookies are `Secure` + `SameSite=None`
- Keep service account keys secret; never commit them
- Consider CSRF protection on session endpoints
- Add rate limiting and helmet headers
- Replace demo in-memory models with a real database

## Troubleshooting
- auth/network-request-failed: add your domain to Firebase Auth Authorized domains and API key referrers; disable VPN/ad-block
- Not redirected after login: ensure `__session` cookie exists; if embedded, open in a new tab
- Private key parse error: ensure FIREBASE_PRIVATE_KEY uses `\n` for newlines

## Scripts
- `npm run dev`  → start with nodemon
- `npm start`    → start without watch

## License
MIT
