import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './features/quiz/quizSlice';
import hollandReducer from './features/quiz/hollandSlice';
import intelligentReducer from './features/quiz/intelligentSlice';

export default configureStore({
  reducer: {
    currentQuiz: quizReducer,
    currentHolland: hollandReducer,
    currentIntelligent: intelligentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})
