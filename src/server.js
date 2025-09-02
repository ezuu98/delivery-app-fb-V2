const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const routes = require('./routes');

const app = express();

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

// Sessions (demo only, MemoryStore not for production)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax' },
  })
);

// Set template locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = !!(req.session && req.session.user);
  res.locals.currentUser = req.session ? req.session.user : null;
  next();
});

// Routes
app.use('/', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

module.exports = app;
