import React from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'
import { NextPage } from 'next'
import styled from 'styled-components'

import Bsod from '@/components/Bsod'
import Loading from '@/components/Loading'
import Scene3D from '@/components/Scene3D'
import { GetProductsQuery } from '@/generated/graphql'

const Background = styled.div`
  background: url('/images/background.jpg') #000 left bottom/cover no-repeat
    fixed;
`

const GET_PRODUCTS = gql`
  query getProducts($first: Int = 100, $cursor: String) {
    products(first: $first, after: $cursor, sortKey: UPDATED_AT) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                originalSrc
              }
            }
          }
        }
      }
    }
  }
`

const Home: NextPage = () => {
  const {
    loading,
    error,
    data: { products: { edges: products } = {} } = {},
  } = useQuery<GetProductsQuery>(GET_PRODUCTS)

  if (error) {
    return (
      <Bsod
        title="Something bad happened :("
        message={
          <>
            unclear. pls reach out so we can fix it:{' '}
            <a
              href="mailto:hello@kiko-la.com?subject=pls fix"
              target="_blank"
              rel="noreferrer"
            >
              hello@kiko-la.com
            </a>
          </>
        }
      />
    )
  }

  return (
    <Background>
      {!products || loading ? <Loading /> : <Scene3D products={products} />}
    </Background>
  )
}

export default Home
