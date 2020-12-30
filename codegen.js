require('dotenv').config()
const {
  STOREFRONT_API_URL,
  STOREFRONT_API_HEADERS,
} = require('./src/lib/constants')

module.exports = {
  schema: [
    {
      [STOREFRONT_API_URL]: {
        headers: STOREFRONT_API_HEADERS,
      },
    },
  ],
  documents: ['src/**/*.{ts,tsx}'],
  overwrite: true,
  generates: {
    'src/graphql/shopify.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],

      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
}
