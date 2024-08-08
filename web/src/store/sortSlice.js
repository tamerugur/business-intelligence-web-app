// src/store/sortSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    selectedSort: 'Sort By'
  },
  reducers: {
    setSort: (state, action) => {
      state.selectedSort = action.payload;
    }
  }
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;
