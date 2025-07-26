// src/app/store.js
import authReducer from '../Redux/AuthSlice.js';     
import cartReducer from '../Redux/Cartslice.js';      
import productReducer from '../Redux/ProductSlice.js'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;