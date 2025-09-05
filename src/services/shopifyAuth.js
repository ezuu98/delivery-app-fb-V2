const crypto = require('crypto');
const { connect, getClient, isReady } = require('./redis');
const log = require('../utils/logger');

const STATE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const stateStore = new Map(); // fallback if no Redis

function getApiKey(){ return process.env.SHOPIFY_API_KEY || ''; }
function getApiSecret(){ return process.env.SHOPIFY_API_SECRET || ''; }

function now(){ return Date.now(); }
function cleanupStates(){
  const t = now();
  for (const [k, v] of stateStore.entries()) { if ((v.expiresAt||0) <= t) stateStore.delete(k); }
}

function setState(state, data){
  cleanupStates();
  stateStore.set(state, { ...data, expiresAt: now() + STATE_TTL_MS });
}
function getState(state){
  cleanupStates();
  const v = stateStore.get(state) || null; if (v && (v.expiresAt||0) > now()) return v; return null;
}

async function storeToken(shop, token){
  try{
    await connect();
    if (isReady()){
      await getClient().set(`shopify:token:${shop}`, token);
      await getClient().set('shopify:default_shop', shop);
      return true;
    }
  }catch(e){ log.warn('shopify.token.store.redis_failed', { message: e?.message }); }
  // Fallback to process memory (non-persistent)
  stateStore.set(`token:${shop}`, { token, expiresAt: Number.MAX_SAFE_INTEGER });
  stateStore.set('default_shop', { shop, expiresAt: Number.MAX_SAFE_INTEGER });
  return true;
}

async function getStoredToken(shop){
  try{
    await connect();
    if (isReady()){
      const v = await getClient().get(`shopify:token:${shop}`);
      return v || null;
    }
  }catch(e){ log.warn('shopify.token.get.redis_failed', { message: e?.message }); }
  const v = stateStore.get(`token:${shop}`);
  return v && v.token ? v.token : null;
}

async function getDefaultShop(){
  try{
    await connect();
    if (isReady()){
      const v = await getClient().get('shopify:default_shop');
      return v || process.env.SHOPIFY_SHOP || null;
    }
  }catch(e){ /* ignore */ }
  const mem = stateStore.get('default_shop');
  return (mem && mem.shop) || process.env.SHOPIFY_SHOP || null;
}

function buildInstallUrl({ shop, scopes = ['read_orders'], redirectUri, state }){
  const key = getApiKey();
  if (!key) throw new Error('Missing SHOPIFY_API_KEY');
  const u = new URL(`https://${shop}/admin/oauth/authorize`);
  u.searchParams.set('client_id', key);
  u.searchParams.set('scope', scopes.join(','));
  u.searchParams.set('redirect_uri', redirectUri);
  u.searchParams.set('state', state);
  return u.toString();
}

async function exchangeCodeForToken({ shop, code }){
  const key = getApiKey();
  const secret = getApiSecret();
  if (!key || !secret) throw new Error('Missing SHOPIFY_API_KEY/SHOPIFY_API_SECRET');
  const res = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ client_id: key, client_secret: secret, code }),
  });
  const data = await res.json().catch(()=>({}));
  if (!res.ok || !data.access_token) {
    const msg = data && (data.error || JSON.stringify(data));
    throw new Error(`Token exchange failed: ${msg || res.status}`);
  }
  await storeToken(shop, data.access_token);
  return data.access_token;
}

function newState(){ return crypto.randomBytes(16).toString('hex'); }

module.exports = { setState, getState, newState, buildInstallUrl, exchangeCodeForToken, getStoredToken, getDefaultShop, storeToken };
