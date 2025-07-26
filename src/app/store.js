// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '/@redux/authSlice.js'; 
import cartReducer from '@redux/Cartslice.js';
import productReducer from '@redux/ProductSlice.js'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;