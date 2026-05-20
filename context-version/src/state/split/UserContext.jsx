import { createContext, useContext, useReducer } from 'react'

const initialState = {
  name: 'Taylor Developer',
  isLoggedIn: true,
}

function reducer(state) {
  return state
}

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user] = useReducer(reducer, initialState)
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within UserProvider')
  }

  return context
}
