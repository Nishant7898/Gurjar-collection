// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/AuthSlice.jsx';     
import cartReducer from '../Redux/Cartslice.jsx';      
import productReducer from '../Redux/ProductSlice.jsx'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;