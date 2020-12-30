// We make this file compatible with Node so we can import it in our Apollo/Graphql configs as well :)
module.exports = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  STOREFRONT_API_URL: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME}.myshopify.com/api/${process.env.NEXT_PUBLIC_STOREFRONT_API_VERSION}/graphql.json`,
  STOREFRONT_API_HEADERS: {
    'X-Shopify-Storefront-Access-Token':
      process.env.NEXT_PUBLIC_STOREFRONT_TOKEN,
    'Content-Type': 'application/json',
  },
}
