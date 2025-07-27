import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../Redux/Cartslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPopup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  const totalAmount = items.reduce((total, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace("₹", "").replace(",", ""))
        : item.price;
    return total + price * item.quantity;
  }, 0);

  const getItemPrice = (item) => {
    return typeof item.price === "string"
      ? parseFloat(item.price.replace("₹", "").replace(",", ""))
      : item.price;
  };

  // Updated handlers to accept id and size
  const handleIncrement = (id, size) => {
    dispatch(incrementQuantity({ id, size }));
  };

  const handleDecrement = (id, size) => {
    dispatch(decrementQuantity({ id, size }));
  };

  const handleRemove = (id, size) => {
    const removedItem = items.find((item) => item.id === id && item.size === size);
    dispatch(removeFromCart({ id, size }));
    toast.error(
      <div className="flex items-center gap-2">
        <img
          src={removedItem?.img || "/placeholder-image.png"}
          alt="removed"
          className="w-10 h-10 object-cover border rounded"
          loading="lazy"
        />
        <div>
          <p className="font-semibold text-sm">Removed:</p>
          <p className="text-xs">{removedItem?.desc}</p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
      }
    );
  };

  

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto max-h-[80vh] bg-white rounded-lg shadow-xl p-4 z-50 border overflow-y-auto fixed right-4 top-20 sm:top-24 sm:right-6 md:right-10 lg:right-12 xl:right-16 transition-all duration-300">
      <h2 className="font-bold text-lg mb-3 text-gray-800 border-b pb-2">
        Shopping Cart
      </h2>

      {!isAuthenticated ? (
        <div className="text-center py-8">
          <p className="text-gray-500 font-medium mb-2">Please log in to see your cart.</p>
          <button
            className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold py-2 mt-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md text-sm"
            onClick={handleClickLogin}
          >
            Login
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 16a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
            {items.map((item, index) => {
              const itemPrice = getItemPrice(item);
              return (
                <div
                  key={`${item.id}-${item.size}` || `cart-item-${index}`}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={item.img || "/placeholder-image.png"}
                      alt={item.desc || "Product image"}
                      className="w-full h-full object-cover rounded border"
                      onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = "/placeholder-image.png";
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-medium text-sm text-gray-800 truncate"
                      title={item.desc}
                    >
                      {item.desc} {item.size && ` - Size: ${item.size}`}
                    </p>
                    <p className="text-xs text-gray-600 mb-1">₹{itemPrice.toFixed(2)}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(item.id, item.size)}
                        disabled={item.quantity <= 1}
                        className="w-6 h-6 flex items-center justify-center bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 border rounded text-sm font-bold transition-colors"
                        aria-label={`Decrease quantity of ${item.desc}, size ${item.size}`}
                      >
                        -
                      </button>
                      <span className="text-sm font-medium px-2 min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.id, item.size)}
                        className="w-6 h-6 flex items-center justify-center bg-white hover:bg-gray-100 border rounded text-sm font-bold transition-colors"
                        aria-label={`Increase quantity of ${item.desc}, size ${item.size}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-green-600 mb-1">
                      ₹{(itemPrice * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id, item.size)}
                      className="text-xs text-red-500 hover:text-red-700 hover:underline transition-colors"
                      aria-label={`Remove ${item.desc} size ${item.size} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-3 bg-gray-50 -mx-4 px-4 py-3 rounded-b-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-lg text-gray-800">Total:</span>
              <span className="font-bold text-xl text-green-600">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Proceed to Checkout
              </button>
              <button
                onClick={handleViewCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                View Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPopup;
