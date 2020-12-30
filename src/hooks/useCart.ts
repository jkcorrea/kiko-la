import { useState } from 'react'
import { createContainer } from 'unstated-next'
import { DeepPartial } from 'utility-types'

import { Checkout } from '@/graphql/shopify'

interface CartContainer {
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  checkout: DeepPartial<Checkout>
  setCheckout: (checkout: Checkout) => void
}

const initialState: Partial<Pick<CartContainer, 'isCartOpen' | 'checkout'>> = {
  isCartOpen: false,
  checkout: {
    id: '',
    lineItems: { edges: [] },
    webUrl: '',
    subtotalPrice: 0,
    totalTax: 0,
    totalPrice: 0,
  },
}

export const useCart = (initState: typeof initialState): CartContainer => {
  const state = { ...initialState, ...initState }
  const [isCartOpen, setIsCartOpen] = useState(state.isCartOpen)
  const [checkout, setCheckout] = useState(state.checkout)

  return { isCartOpen, setIsCartOpen, checkout, setCheckout }
}

const { Provider, useContainer } = createContainer(useCart)
export { Provider as CartProvider, useContainer as useCartContainer }
