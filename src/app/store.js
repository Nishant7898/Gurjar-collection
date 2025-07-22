import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../Redux/Cartslice'

export default configureStore({
  reducer: {
    cart:cartReducer,
  }
})