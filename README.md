# FreshBasket — Express API + React SPA + Firebase Auth

FreshBasket is a Node.js/Express app that serves a React Single Page Application (SPA) bundled with Vite, with Firebase Authentication (client) and Firebase Admin session cookies on the server.

## Tech Stack
- Node.js + Express (API, static serving)
- React 18 + React Router (SPA)
- Vite build (outputs to public/assets/app.js)
- Firebase Auth (Web SDK) + firebase-admin (session cookies)
- Cookie-based auth (Secure, SameSite=None)
- Redis cache (optional) for orders and assignments with in-memory fallback
- CSS (vanilla) with Inter font

## Project structure
```
./
├─ package.json
├─ public/                # static assets (index.html, styles.css, built app.js)
│  └─ assets/app.js       # built by Vite
├─ client/                # React source
│  ├─ main.jsx            # SPA entry
│  ├─ App.jsx             # routes
│  ├─ components/         # shared components
│  └─ pages/              # SPA pages (Login, Register, Riders, Orders, Reports, Customers, RiderProfile)
├─ src/
│  ├─ index.js            # app entry
│  ├─ server.js           # express server + middleware (SPA only)
│  ├─ routes/             # route definitions (auth, api, spa routing)
│  │   ├─ index.js
│  │   └─ auth.js
│  ├─ controllers/        # controllers for auth/api
│  │   ├─ homeController.js
│  │   ├─ firebaseAuthController.js
│  │   └─ apiController.js
│  ├─ middleware/
│  │   ├─ currentUser.js  # decodes Firebase session cookie
│  │   └─ auth.js         # ensureAuthenticated guard
│  ├─ models/             # demo data models
│  │   ├─ messageModel.js
│  │   └─ riderModel.js
│  └─ services/
│      ├─ firebaseAdmin.js
│      └─ shopify.js
├─ vite.config.js         # Vite build config (outputs to public/assets)
└─ nodemon.json
```

## Getting started
Requirements: Node 18+

1) Install dependencies
```
npm install
```

2) Configure environment variables
Set these via your hosting/platform env settings (avoid committing .env files):

Client (Web SDK) — used by React build and/or injected at runtime:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_MEASUREMENT_ID (optional)

Server (Service Account) — used by firebase-admin:
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY  # use literal \n for newlines

Optional:
- PORT (default 3000)
- REDIS_URL (e.g. redis://:password@host:6379/0) — enables Redis-backed cache

Firebase console setup:
- Enable Authentication → Email/Password
- Authentication → Settings → Authorized domains: add your deployed domain and localhost
- If your API key has HTTP referrer restrictions (GCP → Credentials), add the same domains

3) Build client (optional in dev; required for deployment if not prebuilt)
```
npm run build:client
```
This generates public/assets/app.js.

4) Run the app
```
npm run dev
```
Open: http://localhost:3000/

## Auth flow
- Client signs in via Firebase Web SDK on /auth/login or registers on /auth/register
- Client sends ID token to server: POST /auth/session
- Server (firebase-admin) issues session cookie (`__session`)
- Protected pages require cookie: /dashboard, /orders, /riders, /customers, /reports
- Logout: POST /auth/logout (clears cookie)

## Caching
- Orders and assignments are cached in Redis when REDIS_URL is set.
- Keys:
  - Hash "orders": field = orderId, value = JSON order
  - Hash "assignments": field = orderId, value = JSON { riderId, assignedAt, status }
  - String "orders:lastSyncAt": ISO timestamp
- Without Redis, the app uses in-memory Maps (per-process ephemeral).

## Routes
- GET / → redirects to /dashboard if authenticated, else /auth/login
- GET /auth/login, /auth/register → public SPA routes
- POST /auth/session → exchange Firebase ID token for session cookie
- POST /auth/logout → clear cookie
- GET /firebase-config.js → runtime-injected Firebase client config from env
- GET /orders, /riders, /riders/:id, /customers, /reports, /dashboard → SPA routes (protected)
- GET /api/* → JSON APIs (orders, riders, reports)
- All other paths → served public/index.html (handled by React Router)

## Styling & branding
- Navbar shows FreshBasket brand and logo
- Global background: #F7FAFC
- Inter font (700 on brand/title)
- Nav links scale on hover

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
- `npm run dev`        → start with nodemon
- `npm start`          → start without watch
- `npm run build:client` → build SPA to public/assets

## License
MIT
