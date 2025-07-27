// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/AuthSlice.js';     
import cartReducer from '../Redux/Cartslice.js';      
import productReducer from '../Redux/ProductSlice.js'; 
import wishlistReducer from '../Redux/Wishlistslice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    wishlist:wishlistReducer,
  },
});

export default store;