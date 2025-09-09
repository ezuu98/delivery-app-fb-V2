const { Router } = require('express');
const { newState, setState, getState, buildInstallUrl, exchangeCodeForToken, storeToken } = require('../services/shopifyAuth');
const log = require('../utils/logger');

const router = Router();
const { ensureAuthenticated } = require('../middleware/auth');
const { registerWebhook } = require('../services/shopify');

function getBaseUrl(req){
  const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'https');
  const host = req.headers['x-forwarded-host'] || req.get('host');
  return `${proto}://${host}`;
}

router.get('/install', (req, res) => {
  try{
    const shop = String(req.query.shop || '').trim();
    if (!shop || !/\.myshopify\.com$/i.test(shop)) return res.status(400).send('Missing or invalid ?shop=your-store.myshopify.com');
    const state = newState();
    setState(state, { shop });
    const redirectUri = `${getBaseUrl(req)}/shopify/callback`;
    const url = buildInstallUrl({ shop, scopes: ['read_orders','read_customers'], redirectUri, state });
    return res.redirect(url);
  }catch(e){
    log.error('shopify.install.failed', { message: e?.message });
    return res.status(500).send('Failed to start Shopify install');
  }
});

router.get('/callback', async (req, res) => {
  try{
    const { shop, code, state } = req.query || {};
    if (!shop || !code || !state) return res.status(400).send('Missing parameters');
    const st = getState(String(state));
    if (!st || st.shop !== shop) return res.status(400).send('Invalid state');
    const token = await exchangeCodeForToken({ shop, code });
    await storeToken(shop, token);
    log.info('shopify.oauth.success', { shop });
    return res.status(200).send('Shop connected. You can close this window.');
  }catch(e){
    log.error('shopify.callback.failed', { message: e?.message });
    return res.status(500).send('OAuth callback failed');
  }
});

// Admin endpoint to register required webhooks pointing to this app
router.post('/register-webhooks', ensureAuthenticated, async (req, res) => {
  try{
    const base = `${req.protocol}://${req.get('host')}`;
    const hooks = [
      { topic: 'orders/create', path: '/webhooks/shopify/orders/create' },
      { topic: 'orders/updated', path: '/webhooks/shopify/orders/updated' },
      { topic: 'orders/fulfilled', path: '/webhooks/shopify/orders/fulfilled' },
      { topic: 'orders/cancelled', path: '/webhooks/shopify/orders/cancelled' },
    ];
    const results = [];
    for (const h of hooks){
      const addr = base + h.path;
      const r = await registerWebhook(h.topic, addr, 'json');
      results.push({ topic: h.topic, addr, result: r });
    }
    return res.json({ ok: true, results });
  }catch(e){
    return res.status(500).json({ ok: false, error: e?.message || 'Failed' });
  }
});

module.exports = router;
