import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'Taylor Developer',
    isLoggedIn: true,
  },
  reducers: {},
})

export default userSlice.reducer
