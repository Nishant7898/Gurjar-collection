import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  category: "All",
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = FilterSlice.actions;
export default FilterSlice.reducer;
