import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../redux/Filterslice'
import cartReducer from '../redux/Cartslice'
import CartPopupReducer from '../redux/CartPopupSlice'

const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        cartPopup: CartPopupReducer, 
    }
})

export default store