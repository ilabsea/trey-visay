import { createSlice } from '@reduxjs/toolkit'

export const intelligentQuizSlice = createSlice({
  name: 'intelligentQuiz',
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
export const { setCurrentQuiz } = intelligentQuizSlice.actions

export default intelligentQuizSlice.reducer
