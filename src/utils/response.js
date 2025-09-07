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

// Standard response helpers (do not break existing clients)
function stdOk(data = null, message = 'Success', statusCode = 200){
  return { statusCode, message, data };
}
function stdFail(message = 'Error', statusCode = 400, details = null, code = null){
  const res = { statusCode, message };
  if (details) res.details = details;
  if (code) res.code = code;
  return res;
}

module.exports = { ok, fail, stdOk, stdFail };
