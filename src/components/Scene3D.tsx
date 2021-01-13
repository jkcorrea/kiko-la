import React, { FC, useEffect, useState } from 'react'
import { directstyled, useDirectStyle } from 'direct-styled'
import styled from 'styled-components'

import { GetProductsQuery } from '@/graphql'

import { ProductContainer } from './Product'
import WelcomeSign from './WelcomeSign'

const SCENE_PERSPECTIVE = 1
const PERSPECTIVE_SHIFT = 2
const CAMERA_SPEED = 150
const ITEM_GAP_Z = 2
const ORIGIN_X = 50
const ORIGIN_Y = 55

const SceneContainer = directstyled(styled.div`
  will-change: perspective-origin;
  transform: translate3d(0, 0, 0); /* Allows hardware accelerated css */
`)

const Scene = directstyled(styled.div`
  transform-style: preserve-3d;
`)

interface Props {
  products: GetProductsQuery['products']['edges']
}

const Scene3D: FC<Props> = ({ products }) => {
  const [viewportDepth, setViewportDepth] = useState(0)

  const [sceneContainerStyle, setSceneContainerStyle] = useDirectStyle()
  const [sceneStyle, setSceneStyle] = useDirectStyle()

  setSceneContainerStyle({
    perspective: `${SCENE_PERSPECTIVE * CAMERA_SPEED}px`,
    perspectiveOrigin: `${ORIGIN_X}% ${ORIGIN_Y}%`,
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
      const x = ORIGIN_X + (xGap * PERSPECTIVE_SHIFT) / 100
      const y = ORIGIN_Y + (yGap * PERSPECTIVE_SHIFT) / 100

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
  }, [setSceneStyle, setSceneContainerStyle])

  return (
    <div style={{ height: `${viewportDepth}px` }}>
      <SceneContainer
        style={sceneContainerStyle}
        className="fixed top-0 left-0 w-full h-full"
      >
        <Scene style={sceneStyle} className="absolute top-0 h-screen w-full">
          {products.map(({ node: p }, ix) => (
            <ProductContainer
              // addVariantToCart={addVariantToCart}
              key={p.id}
              product={p}
              z={ITEM_GAP_Z * CAMERA_SPEED * (ix + 1) * -1}
            />
          ))}

          <WelcomeSign />
        </Scene>
      </SceneContainer>
    </div>
  )
}

export default Scene3D
