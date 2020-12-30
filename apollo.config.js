require('dotenv').config()
const {
  STOREFRONT_API_URL,
  STOREFRONT_API_HEADERS,
} = require('./src/lib/constants')

module.exports = {
  client: {
    service: {
      name: 'shopify',
      url: STOREFRONT_API_URL,
      headers: STOREFRONT_API_HEADERS,
    },
    includes: ['src/**/*.{ts,tsx}'],
  },
}
