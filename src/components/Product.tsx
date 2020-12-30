import React, { FC, useEffect, useRef, useState } from 'react'
import { directstyled, useDirectStyle } from 'direct-styled'
import {
  Button,
  Panel,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from 'react95'
import styled from 'styled-components'

import { GetProductsQuery } from '@/graphql/shopify'

interface Props {
  product: GetProductsQuery['products']['edges'][number]['node']
  z: number
}

const Container = directstyled(styled.div`
  &:nth-child(2n) {
    left: 25%;
  }

  &:nth-child(2n + 1) {
    right: 25%;
  }
`)

const Product: FC<Props> = ({ product: { images, title, priceRange }, z }) => {
  const [imageIndex, _setImageIndex] = useState(0)
  const image = images.edges[imageIndex].node
  const price = priceRange.minVariantPrice.amount

  const exeTitle = `${title
    .replace(/\s/g, '_') // replace spaces with _
    .replace(/\W/g, '') // remove non-alphanumeric
    .slice(0, 25) // chomp down to len == 25
    .toLowerCase()}.exe` // add suffix and lowercase it

  const x = useRef(Math.round(Math.random() * 100) - 50)
  const y = useRef(Math.round(Math.random() * 100) - 50)

  const [containerStyle, setContainerStyle] = useDirectStyle()

  useEffect(() => {
    setContainerStyle({
      transform: `translate3d(${x.current}%, ${y.current}%, ${z}px)`,
    })
  }, [x, y, z, setContainerStyle])

  return (
    <Container
      style={containerStyle}
      className="absolute block top-1/2 w-full sm:w-1/6"
    >
      <Window>
        <WindowHeader>
          <span>{exeTitle}</span>
        </WindowHeader>
        <Toolbar>
          <Button variant="menu" size="sm">
            File
          </Button>
          <Button variant="menu" size="sm">
            Add to cart
          </Button>
          <Button variant="menu" size="sm" disabled>
            Share
          </Button>
        </Toolbar>
        <WindowContent>
          {images.edges.length > 0 ? (
            <img
              className="object-cover object-center w-full h-1/2 block"
              src={image.src}
              alt={title}
            />
          ) : null}
        </WindowContent>
        <Panel className="w-full text-right px-2" variant="well">
          <p>${price}</p>
        </Panel>
      </Window>
    </Container>
  )
}

export default Product
