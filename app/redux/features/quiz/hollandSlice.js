import { createSlice } from '@reduxjs/toolkit'

export const hollandSlice = createSlice({
  name: 'holland',
  initialState: {
    value: {},
  },
  reducers: {
    appendAnswer: (state, action) => {
      state.value = {...state.value, ...action.payload }
    }
  },
})

// Action creators are generated for each case reducer function
export const { appendAnswer } = hollandSlice.actions

export default hollandSlice.reducer
