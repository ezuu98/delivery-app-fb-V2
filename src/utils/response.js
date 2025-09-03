function ok(data = null, meta = null){
  const res = { ok: true };
  if (data && typeof data === 'object') Object.assign(res, data);
  if (meta) res.meta = meta;
  return res;
}

function fail(error = 'Error', code = null, details = null){
  const res = { ok: false, error };
  if (code) res.code = code;
  if (details) res.details = details;
  return res;
}

module.exports = { ok, fail };
