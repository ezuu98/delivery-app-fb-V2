const { fail } = require('../utils/response');

function typeOf(v){
  if (Array.isArray(v)) return 'array';
  if (v === null) return 'null';
  return typeof v;
}

function validate(schemas = {}){
  // schemas: { body: { field: 'string'|'number'|'boolean'|'string?' }, query: { ... }, params: { ... } }
  return function(req, res, next){
    try{
      for (const part of ['params','query','body']){
        const schema = schemas[part];
        if (!schema) continue;
        const src = req[part] || {};
        for (const [key, rule] of Object.entries(schema)){
          const ruleStr = String(rule);
          const isOptional = ruleStr.endsWith('?');
          const expected = isOptional ? ruleStr.slice(0, -1) : ruleStr;
          const val = src[key];
          if ((val === undefined || val === null || val === '') && !isOptional){
            return res.status(400).json(fail(`Missing ${part}.${key}`));
          }
          if ((val === undefined || val === null || val === '')) continue;
          if (expected && expected !== 'any'){
            const got = typeOf(val);
            if (expected === 'number' && got === 'string' && val !== ''){
              const n = Number(val);
              if (Number.isFinite(n)) { src[key] = n; continue; }
            }
            if (got !== expected){
              return res.status(400).json(fail(`Invalid ${part}.${key} type: expected ${expected}, got ${got}`));
            }
          }
        }
      }
      next();
    }catch(e){ next(e); }
  };
}

function errorHandler(err, req, res, _next){
  const status = err.statusCode || err.status || 500;
  const message = err.expose ? err.message : (status === 500 ? 'Internal Server Error' : err.message || 'Error');
  res.status(status).json(fail(message));
}

module.exports = { validate, errorHandler };
