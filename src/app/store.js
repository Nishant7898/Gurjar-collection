// src/app/store.js
import authReducer from '../Redux/authSlice';     
import cartReducer from '../Redux/CartSlice';      
import productReducer from '../Redux/ProductSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;