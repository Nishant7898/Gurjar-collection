import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
   
    addToCart: (state, action) => {
      const { id, desc, price, quantity, img, size, ...rest } = action.payload;
      if (quantity <= 0) return; 

      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
     
        state.items.push({ id, desc, price, quantity, img, size, ...rest });
      }
    },

  
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );
    },


    incrementQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find((item) => item.id === id && item.size === size);
      if (item) {
        item.quantity += 1;
      }
    },

    
    decrementQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find((item) => item.id === id && item.size === size);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartslice.actions;
export default cartslice.reducer;
