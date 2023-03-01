import { createSlice } from '@reduxjs/toolkit'

export const quizOneSlice = createSlice({
  name: 'personalUnderstanding',
  initialState: {
    value: {},
  },
  reducers: {
    setQuizOneAnswer: (state, action) => {
      params = action.payload || {};
      state.value = { ...state.value, ...params }
    },
    resetQuizOne: (state) => {
      state.value = {}
    }
  },
})

// Action creators are generated for each case reducer function
export const { setQuizOneAnswer, resetQuizOne } = quizOneSlice.actions

export default quizOneSlice.reducer
