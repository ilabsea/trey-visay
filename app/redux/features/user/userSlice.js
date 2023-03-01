import { createSlice } from '@reduxjs/toolkit'
import User from '../../../utils/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: User.getCurrent(),
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
