import { createSlice } from '@reduxjs/toolkit'

export const intelligentSlice = createSlice({
  name: 'intelligent',
  initialState: {
    value: {}
  },
  reducers: {
    appendAnswer: (state, action) => {
      state.value = {...state.value, ...action.payload}
    },
    resetAnswer: (state, action) => {
      state.value = {}
    }
  }
})

export const {appendAnswer, resetAnswer} = intelligentSlice.actions;
export default intelligentSlice.reducer;