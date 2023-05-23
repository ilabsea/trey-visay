import { createSlice } from '@reduxjs/toolkit'

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    value: '',
  },
  reducers: {
    setCurrentQuiz: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentQuiz } = quizSlice.actions

export default quizSlice.reducer
