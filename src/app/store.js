// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Redux/Cartslice";
import authReducer from "../Redux/authSlice";
import productSlice from "../Redux/ProductSlice"
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product:productSlice
 
    
  },
});
