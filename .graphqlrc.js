require('dotenv').config()
var {
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
  documents: ['src/queries/**/**.{gql,graphql}'],
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
        'src/graphql.ts': {
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
