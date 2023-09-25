import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './features/quiz/quizSlice';
import hollandReducer from './features/quiz/hollandSlice';
import intelligentReducer from './features/quiz/intelligentSlice';
import intelligentQuizReducer from './features/quiz/intelligentQuizSlice';
import schoolFilterReducer from './features/school/schoolFilterSlice';

export default configureStore({
  reducer: {
    currentQuiz: quizReducer,
    currentHolland: hollandReducer,
    currentIntelligent: intelligentReducer,
    currentIntelligentQuiz: intelligentQuizReducer,
    schoolFilterOptions: schoolFilterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})
