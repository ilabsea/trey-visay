import { createSlice } from '@reduxjs/toolkit'

const schoolFilterSlice = createSlice({
  name: 'schoolFilter',
  initialState: {
    value: { province: '', category: '', major: '', department: ''}
  },
  reducers: {
    setSelectedOptions: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const { setSelectedOptions } = schoolFilterSlice.actions;

export default schoolFilterSlice.reducer;