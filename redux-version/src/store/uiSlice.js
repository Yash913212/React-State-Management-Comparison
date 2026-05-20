import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'light',
    notification: null,
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setNotification(state, action) {
      state.notification = action.payload
    },
  },
})

export const { toggleTheme, setNotification } = uiSlice.actions

export default uiSlice.reducer
