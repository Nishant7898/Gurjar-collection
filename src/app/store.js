import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../Redux/Cartslice'
import authReducer from '../Redux/Authslice'
export default configureStore({
  reducer: {
    cart:cartReducer,
    auth:authReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
