function fmt(level, msg, extra){
  const ts = new Date().toISOString();
  const base = { ts, level, msg };
  const payload = extra && typeof extra === 'object' ? { ...extra } : undefined;
  return JSON.stringify(payload ? { ...base, ...payload } : base);
}

module.exports = {
  info(msg, extra){ console.log(fmt('info', msg, extra)); },
  warn(msg, extra){ console.warn(fmt('warn', msg, extra)); },
  error(msg, extra){ console.error(fmt('error', msg, extra)); },
};
