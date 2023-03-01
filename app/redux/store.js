// import { createStore, combineReducers } from 'redux';
// import { reducer as form } from 'react-final-form';

// const appReducer = combineReducers({
//   form
// })

// const rootReducer = (state, action) => {
//   if (action.type === 'RESET') {
//     state = undefined;
//   }

//   return appReducer(state, action)
// }

// export default createStore(rootReducer);

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import quizOneReducer from './features/careerAssessment/quizOneSlice';

export default configureStore({
  reducer: {
    currentUser: userReducer,
    quizOneAnswer: quizOneReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})
