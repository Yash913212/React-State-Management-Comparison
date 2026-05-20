import { create } from 'zustand'

function addOrIncrement(items, product) {
  const existing = items.find((item) => item.productId === product.id)

  if (existing) {
    return items.map((item) =>
      item.productId === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    )
  }

  return [
    ...items,
    {
      productId: product.id,
      name: product.name,
      quantity: 1,
      price: product.price,
    },
  ]
}

function setQuantity(items, productId, quantity) {
  if (quantity <= 0) {
    return items.filter((item) => item.productId !== productId)
  }

  return items.map((item) =>
    item.productId === productId ? { ...item, quantity } : item,
  )
}

export const useAppStore = create((set) => ({
  cart: {
    items: [],
    isOpen: true,
  },
  user: {
    name: 'Taylor Developer',
    isLoggedIn: true,
  },
  ui: {
    theme: 'light',
    notification: null,
  },
  addToCart: (product) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: addOrIncrement(state.cart.items, product),
      },
      ui: {
        ...state.ui,
        notification: {
          message: `${product.name} added to cart`,
          type: 'success',
        },
      },
    })),
  toggleCart: () =>
    set((state) => ({
      cart: {
        ...state.cart,
        isOpen: !state.cart.isOpen,
      },
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.filter((item) => item.productId !== productId),
      },
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: setQuantity(state.cart.items, productId, quantity),
      },
    })),
  toggleTheme: () =>
    set((state) => ({
      ui: {
        ...state.ui,
        theme: state.ui.theme === 'light' ? 'dark' : 'light',
      },
    })),
}))
