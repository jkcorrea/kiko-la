import React, { FC, useEffect, useMemo, useState } from 'react'
// import Product from './components/Product';
// import Cart from './components/Cart';
// import CustomerAuthWithMutation from './components/CustomerAuth';
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'
import { directstyled, useDirectStyle } from 'direct-styled'
import styled from 'styled-components'

import Product from '@/components/Product'
import WelcomeSign from '@/components/WelcomeSign'
import { GetProductsQuery } from '@/graphql/shopify'

const Viewport = styled.div<{ depth: number }>`
  background: url('/images/background.jpg') #000 left bottom/cover no-repeat
    fixed;
  height: calc(${({ depth }) => depth} * 1px);
`

const SceneContainer = directstyled(styled.div`
  will-change: perspective-origin;
  transform: translate3d(0, 0, 0); /* Allows hardware accelerated css */
`)

const Scene = directstyled(styled.div`
  transform-style: preserve-3d;
`)

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
                src
              }
            }
          }
        }
      }
    }
  }
`

const Home: FC = () => {
  const {
    loading: productsLoading,
    error: productsError,
    data: { products: { edges: products } = {} } = {},
  } = useQuery<GetProductsQuery>(GET_PRODUCTS)

  const SCENE_PERSPECTIVE = 1
  const PERSPECTIVE_SHIFT = 2
  const CAMERA_SPEED = 150
  const ITEM_GAP_Z = 2
  const perspectiveOrigin = useMemo(() => ({ x: 50, y: 65 }), [])

  const [viewportDepth, setViewportDepth] = useState(0)

  const [sceneContainerStyle, setSceneContainerStyle] = useDirectStyle()
  const [sceneStyle, setSceneStyle] = useDirectStyle()

  setSceneContainerStyle({
    perspective: `${SCENE_PERSPECTIVE * CAMERA_SPEED}px`,
    perspectiveOrigin: `${perspectiveOrigin.x}% ${perspectiveOrigin.y}%`,
  })

  // Setup the scene (depth)
  useEffect(() => {
    if (!products) return
    const numProducts = products.length

    setViewportDepth(
      window.innerHeight +
        SCENE_PERSPECTIVE * CAMERA_SPEED +
        ITEM_GAP_Z * CAMERA_SPEED * numProducts,
    )
  }, [products])

  // Setup event handlers
  useEffect(() => {
    const onScroll = () => {
      setSceneStyle({
        transform: `translateZ(${window.pageYOffset}px);`,
      })
    }

    const onMousemove = ({ clientX, clientY }: MouseEvent) => {
      const xGap =
        (((clientX - window.innerWidth / 2) * 100) / (window.innerWidth / 2)) *
        -1
      const yGap =
        (((clientY - window.innerHeight / 2) * 100) /
          (window.innerHeight / 2)) *
        -1
      const x = perspectiveOrigin.x + (xGap * PERSPECTIVE_SHIFT) / 100
      const y = perspectiveOrigin.y + (yGap * PERSPECTIVE_SHIFT) / 100

      setSceneContainerStyle({
        perspective: `${SCENE_PERSPECTIVE * CAMERA_SPEED}px`,
        perspectiveOrigin: `${x}% ${y}%`,
      })
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('mousemove', onMousemove)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMousemove)
    }
  }, [
    perspectiveOrigin,
    SCENE_PERSPECTIVE,
    CAMERA_SPEED,
    setSceneStyle,
    setSceneContainerStyle,
  ])

  if (productsLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center text-white">
        <h1>Loading...</h1>
      </div>
    )
  }

  if (productsError) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center text-red">
        <h1>{productsError.message}</h1>
      </div>
    )
  }

  return (
    <Viewport depth={viewportDepth}>
      <SceneContainer
        style={sceneContainerStyle}
        className="fixed top-0 left-0 w-full h-full"
      >
        <Scene style={sceneStyle} className="absolute top-0 h-screen w-full">
          {products.map(({ node: p }, ix) => (
            <Product
              // addVariantToCart={addVariantToCart}
              key={p.id}
              product={p}
              z={ITEM_GAP_Z * CAMERA_SPEED * (ix + 1) * -1}
            />
          ))}

          <WelcomeSign />
        </Scene>
      </SceneContainer>
    </Viewport>
  )
}

export default Home
