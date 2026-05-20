import { createContext, useContext, useReducer } from 'react'

const initialState = {
  theme: 'light',
  notification: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'ui/toggleTheme':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    case 'ui/setNotification':
      return {
        ...state,
        notification: action.payload,
      }
    case 'ui/clearNotification':
      return {
        ...state,
        notification: null,
      }
    default:
      return state
  }
}

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [ui, dispatch] = useReducer(reducer, initialState)

  const value = {
    ui,
    toggleTheme: () => dispatch({ type: 'ui/toggleTheme' }),
    setNotification: (message, type = 'info') =>
      dispatch({
        type: 'ui/setNotification',
        payload: { message, type },
      }),
    clearNotification: () => dispatch({ type: 'ui/clearNotification' }),
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUIContext() {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUIContext must be used within UIProvider')
  }

  return context
}
