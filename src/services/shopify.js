const DEFAULT_VERSION = process.env.SHOPIFY_API_VERSION || '2024-07';

function getConfig() {
  const shop = process.env.SHOPIFY_SHOP; // e.g. your-store.myshopify.com
  const token = process.env.SHOPIFY_ADMIN_TOKEN; // Admin API access token
  return { shop, token, version: DEFAULT_VERSION };
}

function isConfigured() {
  const { shop, token } = getConfig();
  return !!(shop && token);
}

async function requestShopify(path, query = {}) {
  const { shop, token, version } = getConfig();
  if (!shop || !token) {
    // eslint-disable-next-line no-console
    console.warn('Shopify not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN.');
    return { ok: false, status: 503, data: null, error: 'Not configured' };
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
  if (!res.ok) return { ok: false, status: res.status, data, error: (data && (data.errors || data.error)) || text };
  return { ok: true, status: res.status, data };
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
  const pageInfo = null; // using simple page; can extend with Link header if needed
  return { orders, page_info: pageInfo, error: null, configured: true };
}

module.exports = { listOrders, isConfigured };
