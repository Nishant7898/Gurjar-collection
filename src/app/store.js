// src/app/store.js
import authReducer from '../Redux/AuthSlice';     // Capital S
import cartReducer from '../Redux/CartSlice';     // lowercase s  
import productReducer from '../Redux/ProductSlice'; // Capital P and S

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;