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
- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_PROJECT_ID
- FIREBASE_APP_ID
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_MEASUREMENT_ID (optional)

Server (Service Account) — used by firebase-admin:
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY  # use literal \n for newlines

Optional:
- PORT (default 3000)
- REDIS_URL (e.g. redis://:password@host:6379/0) — enables Redis-backed cache
- SHOPIFY_WEBHOOK_SECRET — used to verify Shopify webhooks

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
- Server (firebase-admin) issues session cookie (`__session`) with Secure; SameSite=None; Partitioned
- Protected pages require cookie: /dashboard, /orders, /riders, /customers, /reports
- Logout: POST /auth/logout (clears cookie)

## Standard API response schema
- Success:
```
{
  "statusCode": 200,
  "message": "OK",
  "data": { ... }
}
```
- Error:
```
{
  "statusCode": 400,
  "message": "Reason",
  "details": { ... optional ... },
  "code": "... optional ..."
}
```

## Mobile APIs
All endpoints are JSON.

- POST /api/mobile/register
  - Body: { email, password, fullName?, contactNumber? }
  - Response: { statusCode: 200, message: "Registered successfully", data: { registered: true } }

- POST /api/mobile/login
  - Body: either { email, password } OR { contactNumber, password }
  - Response: { statusCode: 200, message: "Logged in successfully", data: { idToken, uid, rider } }

- GET /api/mobile/me
  - Headers: Authorization: Bearer <Firebase idToken>
  - Response: { statusCode: 200, message: "OK", data: { rider } }

- PATCH /api/mobile/me
  - Headers: Authorization: Bearer <Firebase idToken>
  - Body: { displayName?, contactNumber? }
  - Response: { statusCode: 200, message: "Profile updated", data: { rider } }

- POST /api/mobile/bind-contact
  - Headers: Authorization: Bearer <Firebase idToken>
  - Body: { contactNumber }
  - Response: { statusCode: 200, message: "Contact number bound", data: { rider } }

- GET /api/mobile/orders
  - Headers: Authorization: Bearer <Firebase idToken>
  - Query: status=all|new|assigned|in-transit|delivered, q?, page?, limit?
  - Response: { statusCode: 200, message: "OK", data: { orders: [...] } }

- GET /api/mobile/orders/:id
  - Headers: Authorization: Bearer <Firebase idToken>
  - Response: { statusCode: 200, message: "OK", data: { order: { ... , events: [...] } } }

- POST /api/mobile/orders/:id/events
  - Headers: Authorization: Bearer <Firebase idToken>
  - Body: { type: 'eta'|'pickup'|'out_for_delivery'|'delivered'|'delay', expectedMinutes?, notes? }
  - Response: { statusCode: 200, message: "Event recorded", data: { event } }

Rider document (Firestore): collection "riders", doc id = Firebase UID.
Fields: uid, email, displayName, contactNumber, photoURL, createdAt, updatedAt.

## Orders & Shopify
- Local cache and demo models are provided.
- Real Shopify orders require configuration:
  - SHOPIFY_API_KEY, SHOPIFY_API_SECRET (for OAuth) OR SHOPIFY_ADMIN_TOKEN (private app/admin token)
  - SHOPIFY_SHOP (e.g. your-store.myshopify.com)
- Connect via OAuth: GET /shopify/install?shop=your-store.myshopify.com

## Firestore
- The server upserts riders on login/registration into `riders/{uid}`.
- Ensure FIREBASE_* env vars for Admin SDK are set.

## Caching
- Orders and assignments are cached in Redis when REDIS_URL is set.
- Without Redis, the app uses in-memory Maps (per-process ephemeral).

## Routes
- GET / → redirects to /dashboard if authenticated, else /auth/login
- GET /auth/login, /auth/register → public SPA routes
- POST /auth/session → exchange Firebase ID token for session cookie
- POST /auth/logout → clear cookie
- GET /firebase-config.js → runtime-injected Firebase client config from env
- GET /orders, /riders, /riders/:id, /customers, /reports, /dashboard → SPA routes (protected)
- GET /api/* → JSON APIs (orders, riders, reports)
- POST /webhooks/shopify/orders/create|updated|fulfilled|cancelled → Shopify webhooks (HMAC verified)
- All other paths → served public/index.html (handled by React Router)

## Styling & branding
- Navbar shows FreshBasket brand and logo
- Global background: #F7FAFC
- Inter font (700 on brand/title)
- Nav links scale on hover

## Security notes (production)
- Always serve over HTTPS; cookies use Secure + SameSite=None + Partitioned (CHIPS)
- Keep service account keys secret; never commit them
- Consider CSRF protection on session endpoints
- Add rate limiting and helmet headers
- Replace demo in-memory models with a real database

## Troubleshooting
- Cookie not sticking in embedded previews: open in a new tab or ensure HTTPS; CHIPS is enabled
- auth/network-request-failed: add your domain to Firebase Auth Authorized domains and API key referrers; disable VPN/ad-block
- Private key parse error: ensure FIREBASE_PRIVATE_KEY uses `\n` for newlines

## Scripts
- `npm run dev`        → start with nodemon
- `npm start`          → start without watch
- `npm run build:client` → build SPA to public/assets

## License
MIT
