import { createSlice } from '@reduxjs/toolkit'

export const hollandSlice = createSlice({
  name: 'holland',
  initialState: {
    value: {},
  },
  reducers: {
    appendAnswer: (state, action) => {
      state.value = {...state.value, ...action.payload }
    },
    resetAnswer: (state, action) => {
      state.value = {}
    }
  },
})

// Action creators are generated for each case reducer function
export const { appendAnswer, resetAnswer } = hollandSlice.actions

export default hollandSlice.reducer
