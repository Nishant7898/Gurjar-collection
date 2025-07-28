// src/features/cart/CartList.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/cartslice"; // ✅ Correct import

const CartList = () => {
 const cartItems = useSelector((state) => state.cart?.items || []);

  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 border-b"
          >
            <span>{item.name}</span>
            <button
              onClick={() => dispatch(removeFromCart(item.id))} 
              className="text-red-500 hover:text-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartList;
