// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/authSlice'; 
import cartReducer from '../Redux/Cartslice'
import productReducer from '../Redux/ProductSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;