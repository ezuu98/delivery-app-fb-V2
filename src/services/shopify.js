const DEFAULT_VERSION = process.env.SHOPIFY_API_VERSION || '2024-07';

const { getStoredToken, getDefaultShop } = require('./shopifyAuth');

function getConfig() {
  const shop = process.env.SHOPIFY_SHOP || null; // e.g. your-store.myshopify.com
  const token = process.env.SHOPIFY_ADMIN_TOKEN || null; // Admin API access token
  return { shop, token, version: DEFAULT_VERSION };
}

function isConfigured() {
  const { shop, token } = getConfig();
  return !!(shop && token);
}

function parseNextPageInfo(linkHeader) {
  if (!linkHeader || typeof linkHeader !== 'string') return null;
  // Link: <https://...page_info=abc>; rel="next", <https://...page_info=xyz>; rel="previous"
  const parts = linkHeader.split(',');
  for (const p of parts) {
    if (p.includes('rel="next"')) {
      const m = p.match(/<([^>]+)>/);
      const href = m && m[1];
      if (!href) continue;
      const u = new URL(href);
      const pi = u.searchParams.get('page_info');
      if (pi) return pi;
    }
  }
  return null;
}

async function requestShopify(path, query = {}) {
  let { shop, token, version } = getConfig();
  if (!shop) shop = await getDefaultShop();
  if (!token && shop) token = await getStoredToken(shop);
  if (!shop || !token) {
    // eslint-disable-next-line no-console
    console.warn('Shopify not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN or complete OAuth install.');
    return { ok: false, status: 503, data: null, error: 'Not configured', headers: {} };
  }
  const url = new URL(`https://${shop}/admin/api/${version}${path}`);
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), {
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (_) { /* ignore */ }
  const headers = { link: res.headers.get('link') || '' };
  if (!res.ok) return { ok: false, status: res.status, data, error: (data && (data.errors || data.error)) || text, headers };
  return { ok: true, status: res.status, data, headers };
}

async function listOrders(params = {}) {
  // params: { limit, status, created_at_min, created_at_max, fulfillment_status, financial_status, fields, since_id, page_info }
  const query = {
    limit: params.limit ?? 25,
    status: params.status ?? 'any',
    created_at_min: params.created_at_min,
    created_at_max: params.created_at_max,
    fulfillment_status: params.fulfillment_status,
    financial_status: params.financial_status,
    fields: params.fields,
    since_id: params.since_id,
    page_info: params.page_info,
    order: params.order,
  };
  const resp = await requestShopify('/orders.json', query);
  if (!resp.ok) return { orders: [], page_info: null, error: resp.error, configured: isConfigured() };
  const orders = (resp.data && resp.data.orders) || [];
  const pageInfo = parseNextPageInfo(resp.headers && resp.headers.link);
  return { orders, page_info: pageInfo, error: null, configured: true };
}

async function fetchAllOrders(params = {}) {
  // Iterates through all pages using cursor (page_info)
  const all = [];
  let pageInfo = params.page_info || null;
  let page = 0;
  const maxPages = Number(params.maxPages || 50); // safety cap
  while (page < maxPages) {
    const { orders, page_info, error } = await listOrders({ ...params, page_info: pageInfo });
    if (error) return { orders: all, error };
    all.push(...orders);
    if (!page_info) break;
    pageInfo = page_info;
    page += 1;
  }
  return { orders: all, error: null };
}

module.exports = { listOrders, isConfigured, fetchAllOrders };
