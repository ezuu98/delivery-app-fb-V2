const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const { currentUserMiddleware } = require('./middleware/currentUser');

const routes = require('./routes');

const app = express();

// Behind proxies (fly.dev) - trust X-Forwarded-Proto for secure cookies
app.set('trust proxy', 1);

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Populate req.user from Firebase session cookie
app.use(currentUserMiddleware());

// Set template locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = !!req.user;
  res.locals.currentUser = req.user;
  res.locals.hideHeader = false;
  next();
});

// Routes
app.use('/', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

module.exports = app;
