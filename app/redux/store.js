import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './features/quiz/quizSlice';
import hollandReducer from './features/quiz/hollandSlice';

export default configureStore({
  reducer: {
    currentQuiz: quizReducer,
    currentHolland: hollandReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})
