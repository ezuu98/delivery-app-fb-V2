const log = require('../utils/logger');

function reqStr(name, required = false) {
  const v = process.env[name];
  if (required && (!v || !String(v).trim())) {
    throw new Error(`Missing required env: ${name}`);
  }
  return v ? String(v).trim() : '';
}

function num(name, def) {
  const v = process.env[name];
  const n = v != null ? Number(v) : def;
  return Number.isFinite(n) ? n : def;
}

function loadEnv() {
  const config = {
    nodeEnv: process.env.NODE_ENV || 'production',
    server: {
      port: num('PORT', 3000),
    },
    firebase: {
      client: {
        apiKey: reqStr('FIREBASE_API_KEY'),
        authDomain: reqStr('FIREBASE_AUTH_DOMAIN'),
        projectId: reqStr('FIREBASE_PROJECT_ID'),
        appId: reqStr('FIREBASE_APP_ID'),
        messagingSenderId: reqStr('FIREBASE_MESSAGING_SENDER_ID'),
        measurementId: reqStr('FIREBASE_MEASUREMENT_ID'),
      },
      admin: {
        projectId: reqStr('FIREBASE_PROJECT_ID'),
        clientEmail: reqStr('FIREBASE_CLIENT_EMAIL'),
        privateKey: reqStr('FIREBASE_PRIVATE_KEY'),
      },
    },
    redis: {
      url: reqStr('REDIS_URL'),
    },
    shopify: {
      shop: reqStr('SHOPIFY_SHOP'),
      token: reqStr('SHOPIFY_ADMIN_TOKEN'),
      webhookSecret: reqStr('SHOPIFY_WEBHOOK_SECRET'),
      syncIntervalMs: num('SHOPIFY_SYNC_INTERVAL_MS', 300000),
    },
  };

  // Soft validation groups
  const missingCritical = [];
  if (!config.firebase.client.apiKey || !config.firebase.client.authDomain || !config.firebase.client.projectId || !config.firebase.client.appId) {
    missingCritical.push('Firebase client (FIREBASE_*)');
  }
  if (!config.firebase.admin.projectId || !config.firebase.admin.clientEmail || !config.firebase.admin.privateKey) {
    log.warn('env.missing.firebaseAdmin', { note: 'Admin features will be disabled until FIREBASE_* are set' });
  }
  if (!config.shopify.shop || !config.shopify.token) {
    log.warn('env.missing.shopify', { note: 'Shopify sync disabled until SHOPIFY_* are set' });
  }
  if (missingCritical.length) {
    log.warn('env.partial.firebaseClient', { missing: missingCritical });
  }

  return config;
}

const config = loadEnv();
module.exports = { config };
