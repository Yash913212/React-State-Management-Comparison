import { createContext, useContext, useReducer } from 'react'
import { addOrIncrement, removeItem, setQuantity } from '../../lib/cartUtils'

const initialState = {
  items: [],
  isOpen: true,
}

function reducer(state, action) {
  switch (action.type) {
    case 'cart/add':
      return {
        ...state,
        items: addOrIncrement(state.items, action.payload),
      }
    case 'cart/toggle':
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case 'cart/remove':
      return {
        ...state,
        items: removeItem(state.items, action.payload),
      }
    case 'cart/setQuantity':
      return {
        ...state,
        items: setQuantity(
          state.items,
          action.payload.productId,
          action.payload.quantity,
        ),
      }
    default:
      return state
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, initialState)

  const value = {
    cart,
    addToCart: (product) => dispatch({ type: 'cart/add', payload: product }),
    toggleCart: () => dispatch({ type: 'cart/toggle' }),
    removeFromCart: (productId) => dispatch({ type: 'cart/remove', payload: productId }),
    updateQuantity: (productId, quantity) =>
      dispatch({
        type: 'cart/setQuantity',
        payload: { productId, quantity },
      }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider')
  }

  return context
}
