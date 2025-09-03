const { createClient } = require('redis');

let client = null;
let ready = false;
let connecting = false;

function getRedisUrl() {
  return process.env.REDIS_URL || null;
}

async function connect() {
  if (ready || connecting) return client;
  const url = getRedisUrl();
  if (!url) return null;
  connecting = true;
  client = createClient({ url });
  client.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.warn('Redis error:', err && err.message ? err.message : err);
  });
  try {
    await client.connect();
    ready = true;
    return client;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Redis connect failed:', e && e.message ? e.message : e);
    client = null;
    ready = false;
    return null;
  } finally {
    connecting = false;
  }
}

function isReady() { return ready; }
function getClient() { return client; }

module.exports = { connect, isReady, getClient };
