// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/authslice'; 
import cartReducer from '../Redux/cartslice'
import productReducer from '../Redux/ProductSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;