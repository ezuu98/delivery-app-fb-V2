function parseIntParam(v, def){
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : def;
}

function paginate(list, page = 1, limit = 20){
  const total = Array.isArray(list) ? list.length : 0;
  const pages = Math.max(1, Math.ceil(total / limit));
  const p = Math.min(Math.max(1, page), pages);
  const start = (p - 1) * limit;
  const end = Math.min(start + limit, total);
  const items = list.slice(start, end);
  return { items, meta: { total, page: p, limit, pages } };
}

module.exports = { parseIntParam, paginate };
