require('dotenv').config()
var {
  STOREFRONT_API_URL,
  STOREFRONT_API_HEADERS,
} = require('./src/lib/constants')

console.log(__dirname)

module.exports = {
  schema: [
    {
      [STOREFRONT_API_URL]: {
        headers: STOREFRONT_API_HEADERS,
      },
    },
  ],
  documents: ['src/**/*.{ts,tsx}'],
  extensions: {
    endpoints: {
      default: {
        url: STOREFRONT_API_URL,
        headers: STOREFRONT_API_HEADERS,
      },
    },
    codegen: {
      overwrite: true,
      generates: {
        'src/generated/graphql.ts': {
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
    },
  },
}
