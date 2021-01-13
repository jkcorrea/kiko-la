import React from 'react'
import { Fieldset, Radio } from 'react95'

import { VariantFieldsFragment } from '@/graphql'

interface Props {
  variants: {
    node: VariantFieldsFragment
  }[]
  variantIndex: number
  setVariantIndex: (i: number) => void
}

export const VariantPicker = ({
  variants,
  variantIndex,
  setVariantIndex,
}: Props) => (
  <Fieldset label="Options">
    {variants.map(({ node: { title, id } }, i) => (
      <Radio
        key={id}
        checked={variantIndex === i}
        label={title}
        onChange={() => setVariantIndex(i)}
      />
    ))}
  </Fieldset>
)
