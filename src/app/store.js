// src/app/store.js
import authReducer from '../Redux/authSlice.js';     
import cartReducer from '../Redux/cartslice.js';      
import productReducer from '../Redux/ProductSlice.js'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;