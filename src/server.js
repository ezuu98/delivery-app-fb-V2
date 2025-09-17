const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { currentUserMiddleware } = require('./middleware/currentUser');
const routes = require('./routes');
const { config } = require('./config/env');

const app = express();
app.locals.config = config;

// Behind proxies - trust X-Forwarded-Proto for secure cookies across multi-proxy setups
app.set('trust proxy', true);

// SPA only - no server-side templates

// Middleware
app.use(cors());
app.use(morgan('dev'));

// Mount webhooks BEFORE JSON parser to preserve raw body for signature verification
app.use('/webhooks', require('./routes/webhooks'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Populate req.user from Firebase session cookie
app.use(currentUserMiddleware());

// Routes
app.use('/', routes);

// Set template locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = !!req.user;
  res.locals.currentUser = req.user;
  res.locals.hideHeader = false;
  next();
});


// Global error handler
app.use(require('./middleware/validate').errorHandler);

// Serve static assets
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "../public")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
