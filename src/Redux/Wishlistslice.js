import { createSlice } from "@reduxjs/toolkit";

const Wishlistslice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.find(item => item.id === action.payload.id);
      if (!exists) state.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
    
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = Wishlistslice.actions;
export default Wishlistslice.reducer;
