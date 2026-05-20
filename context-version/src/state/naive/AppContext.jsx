import { createContext, useContext, useReducer } from 'react'
import { addOrIncrement, removeItem, setQuantity } from '../../lib/cartUtils'

const initialState = {
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
}

function reducer(state, action) {
  switch (action.type) {
    case 'cart/add':
      return {
        ...state,
        cart: {
          ...state.cart,
          items: addOrIncrement(state.cart.items, action.payload),
        },
        ui: {
          ...state.ui,
          notification: {
            message: `${action.payload.name} added to cart`,
            type: 'success',
          },
        },
      }
    case 'cart/toggle':
      return {
        ...state,
        cart: {
          ...state.cart,
          isOpen: !state.cart.isOpen,
        },
      }
    case 'cart/remove':
      return {
        ...state,
        cart: {
          ...state.cart,
          items: removeItem(state.cart.items, action.payload),
        },
      }
    case 'cart/setQuantity':
      return {
        ...state,
        cart: {
          ...state.cart,
          items: setQuantity(
            state.cart.items,
            action.payload.productId,
            action.payload.quantity,
          ),
        },
      }
    case 'ui/toggleTheme':
      return {
        ...state,
        ui: {
          ...state.ui,
          theme: state.ui.theme === 'light' ? 'dark' : 'light',
        },
      }
    case 'ui/clearNotification':
      return {
        ...state,
        ui: {
          ...state.ui,
          notification: null,
        },
      }
    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }

  return context
}
