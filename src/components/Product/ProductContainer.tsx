import React, { FC, useEffect, useRef } from 'react'
import { directstyled, useDirectStyle } from 'direct-styled'
import styled from 'styled-components'

import { ProductFieldsFragment } from '@/graphql'

import { Product } from './Product'

interface Props {
  product: ProductFieldsFragment
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

export const ProductContainer: FC<Props> = ({ product, z }) => {
  const x = useRef(Math.round(Math.random() * 100) - 50)
  const y = useRef(Math.round(Math.random() * 40) - 60)

  const [containerStyle, setContainerStyle] = useDirectStyle()

  useEffect(() => {
    setContainerStyle({
      transform: `translate3d(${x.current}%, ${y.current}%, ${z}px)`,
    })
  }, [x, y, z, setContainerStyle])

  return (
    <Container
      style={containerStyle}
      className="absolute block top-1/2 w-full sm:w-1/4 max-w-xs"
    >
      <Product product={product} />
    </Container>
  )
}
