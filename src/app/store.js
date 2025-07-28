// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/authSlice.js';     
import cartReducer from '../Redux/cartslice.js';      
import productReducer from '../Redux/wishlistSlice.js;
import WishlistReducer from '../Redux/Wishlistslice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    wishlist:WishlistReducer,
  },
});

export default store;