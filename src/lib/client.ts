import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { STOREFRONT_API_HEADERS, STOREFRONT_API_URL } from '@/lib/constants'

const httpLink = createHttpLink({ uri: STOREFRONT_API_URL })

const middlewareLink = setContext(() => ({
  headers: STOREFRONT_API_HEADERS,
}))

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
