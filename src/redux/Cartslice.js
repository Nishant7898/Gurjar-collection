import { createSlice } from "@reduxjs/toolkit";
const Cartslice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    AddtoCart: (state, action) => {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    RemovefromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    IncreaseQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    DecreaseQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((i) => i.id != action.payload);
        }
      }
    },
    ClearCart: (state) => {
      state.cart = [];
    },
  },
});
export const {
  AddtoCart,
  RemovefromCart,
  IncreaseQuantity,
  DecreaseQuantity,
  ClearCart,
} = Cartslice.actions;
export default Cartslice.reducer;
