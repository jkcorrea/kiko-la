import React from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'

import Bsod from '@/components/Bsod'
import Loading from '@/components/Loading'
import Scene3D from '@/components/Scene3D'
import { useGetProductsQuery } from '@/graphql'

const Background = styled.div`
  background: url('/images/background.jpg') #000 left bottom/cover no-repeat
    fixed;
`

const Home: NextPage = () => {
  const {
    loading,
    error,
    data: { products: { edges: products } = {} } = {},
  } = useGetProductsQuery()

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
