import { createSlice } from "@reduxjs/toolkit";
const CartPopupSlice = createSlice({
  name: "cartpopup",
  initialState: {
    show: false,
  },
reducers:{
    openCartPopup:(state)=>{
        state.show=true;
    },
    closeCartPopup:(state)=>{
        state.show=false;
    },
}
})
export const {openCartPopup,closeCartPopup}=CartPopupSlice.actions
export default CartPopupSlice.reducer