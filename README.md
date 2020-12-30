# Kiko LA

Storefront for [Kiko LA](https://kiko-la.com).

## The stack

- NextJS
- Typescript
- [Shopify Storefront GraphQL API](https://help.shopify.com/en/api/storefront-api/getting-started) for the backend
- [Apollo Client](https://www.apollographql.com/docs/react/essentials/get-started/) for the graphql api
- [GraphQL Code Generator](https://graphql-code-generator.com/) to generate typings
- [React95](https://github.com/arturbien/React95) for the awesome Windows 95 UI :)
- [TailwindCSS](https://tailwindcss.com/) for sexy styling
- [Styled Components](https://github.com/styled-components/styled-components) for more styling
- [Unstated Next](https://github.com/jamiebuilds/unstated-next/) for simple state management
- Deployment on [Vercel](https://vercel.com/)

## Setup

```sh
# Install dependencies
yarn install

# Setup env
cp .env.example .env
# Edit as needed

# Run!
yarn dev
```

For production

```
yarn build
yarn start
```

## Deploy

Deployments should happen automatically on push to `main` via the Vercel integration.
