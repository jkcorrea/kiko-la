import React, { FC, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import {
  Button,
  Fieldset,
  Panel,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from 'react95'

import { ImageFieldsFragment, ProductFieldsFragment } from '@/graphql'

import { VariantPicker } from './VariantPicker'

import 'react-image-gallery/styles/css/image-gallery.css'

interface Props {
  product: ProductFieldsFragment
}

const shopifyImgToGalleryImg = ({
  originalSrc,
  transformedSrc,
}: ImageFieldsFragment) => ({
  original: originalSrc,
  thumbnail: transformedSrc,
})

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
    } = variants[i].node

    setPriceLabel(`$${amount}`)
    _setVariantIndex(i)
  }

  const allImages = [
    ...images.edges.map(img => shopifyImgToGalleryImg(img.node)),
    // Append variant images
    ...variants.map(v => shopifyImgToGalleryImg(v.node.image)),
  ]

  return (
    <Window>
      <WindowHeader>
        <span>{exeTitle}</span>
      </WindowHeader>
      <Toolbar className="asdf">
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
          <ImageGallery
            items={allImages}
            showThumbnails={false}
            useBrowserFullscreen={false}
            showIndex={false}
            showNav={false}
            showPlayButton={false}
            showFullscreenButton={false}
          />
        </Fieldset>

        {variants.length > 1 ? (
          <VariantPicker
            variants={variants}
            variantIndex={variantIndex}
            setVariantIndex={setVariantIndex}
          />
        ) : null}

        <div className="px-2">
          {/* eslint-disable-next-line react/no-danger */}
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
