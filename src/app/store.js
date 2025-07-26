// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/authSlice.js'; // Add .js extension
import cartReducer from '../Redux/Cartslice.js'; // Add .js extension if needed
import productReducer from '../Redux/ProductSlice.js'; // Add .js extension if needed

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;