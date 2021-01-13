import React, { FC, useState } from 'react'
import {
  Button,
  Fieldset,
  Panel,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from 'react95'

import { ProductFieldsFragment } from '@/graphql'

import { VariantPicker } from './VariantPicker'

interface Props {
  product: ProductFieldsFragment
}

export const Product: FC<Props> = ({
  product: {
    images,
    variants: { edges: variants },
    title,
    priceRange: {
      minVariantPrice: { amount: minPrice },
      maxVariantPrice: { amount: maxPrice },
    },
    descriptionHtml,
  },
}) => {
  const [imageIndex, _setImageIndex] = useState(0)
  const [imageUrl, setImageUrl] = useState(
    images.edges[imageIndex].node.originalSrc,
  )
  const [variantIndex, _setVariantIndex] = useState<number>(null)
  const [priceLabel, setPriceLabel] = useState(
    minPrice !== maxPrice ? `$${minPrice} - $${maxPrice}` : `$${minPrice}`,
  )

  const exeTitle = `${title
    .replace(/\s/g, '_') // replace spaces with _
    .replace(/\W/g, '') // remove non-alphanumeric
    .slice(0, 25) // chomp down to len == 25
    .toLowerCase()}.exe` // add suffix and lowercase it

  const setVariantIndex = (i: number) => {
    const {
      priceV2: { amount },
      image,
    } = variants[i].node

    setPriceLabel(`$${amount}`)
    setImageUrl(image.originalSrc)
    _setVariantIndex(i)
  }

  return (
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
      <WindowContent className="h-64 overflow-y-auto space-y-5 flex flex-col">
        <Fieldset label="Gallery" className="w-full h-32 self-center">
          {images.edges.length > 0 ? (
            <img
              className="block h-full w-full object-contain object-center"
              src={imageUrl}
              alt={title}
            />
          ) : null}
        </Fieldset>

        {variants.length > 1 ? (
          <VariantPicker
            variants={variants}
            variantIndex={variantIndex}
            setVariantIndex={setVariantIndex}
          />
        ) : null}

        <div className="px-2">
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </div>
      </WindowContent>
      <Panel className="w-full text-right px-2" variant="well">
        <div className="flex justify-between">
          <p>Price:</p>
          <p>{priceLabel}</p>
        </div>
      </Panel>
    </Window>
  )
}
