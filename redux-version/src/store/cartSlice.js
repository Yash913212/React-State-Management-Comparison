import { createSlice } from '@reduxjs/toolkit'

function addOrIncrement(items, product) {
  const existing = items.find((item) => item.productId === product.id)

  if (existing) {
    existing.quantity += 1
    return
  }

  items.push({
    productId: product.id,
    name: product.name,
    quantity: 1,
    price: product.price,
  })
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: true,
  },
  reducers: {
    addToCart(state, action) {
      addOrIncrement(state.items, action.payload)
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.productId !== action.payload)
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.productId !== productId)
        return
      }

      const existing = state.items.find((item) => item.productId === productId)
      if (existing) {
        existing.quantity = quantity
      }
    },
  },
})

export const { addToCart, toggleCart, removeFromCart, updateQuantity } =
  cartSlice.actions

export default cartSlice.reducer
