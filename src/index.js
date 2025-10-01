require('dotenv').config();
const app = require('./server');
const { config } = require('./config/env');
const log = require('./utils/logger');
const scheduler = require('./services/scheduler');

const PORT = process.env.PORT || 3000;

if (config?.shopify?.shop && config?.shopify?.token) {
  scheduler.start();
} else {
  log.warn('scheduler.shopify.disabled', { reason: 'Missing Shopify credentials' });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}`);
});
