import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RemovefromCart,
  IncreaseQuantity,
  DecreaseQuantity,
  ClearCart,
} from "../redux/Cartslice";
import { IoClose } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import toast from "react-hot-toast";

const Cart = ({ isOpen, onClose }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Enhanced handlers with toast notifications
  const handleRemoveItem = (item) => {
    dispatch(RemovefromCart(item.id));
    toast.error(`${item.name} removed from cart`, { icon: "🗑️" });
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(IncreaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(DecreaseQuantity(id));
  };

  const handleClearCart = () => {
    if (cart.length > 0) {
      dispatch(ClearCart());
      toast.success("Cart cleared!", { icon: "🧹" });
    }
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...", { icon: "💳" });
    // Add your checkout logic here
  };

  // Close cart when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent body scroll when cart is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-[998] transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
      )}

      {/* Slide-in Panel - Fully Responsive */}
      <div
        className={`
          fixed top-0 right-0 h-full z-[999] bg-gradient-to-b from-gray-900 to-black shadow-2xl
          transform transition-transform duration-300 ease-in-out
          w-full sm:w-[28rem] md:w-[30rem] lg:w-[32rem] xl:w-[34rem]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header - Responsive */}
        <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-700 shadow-lg">
          <div className="flex justify-between items-center p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl lg:text-2xl text-white font-bold">
                My Bag
              </h2>
              <span className="text-xl sm:text-2xl">🛍️</span>
              {cart.length > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[1.5rem] text-center">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-400 transition-colors duration-200 p-1 sm:p-2"
              aria-label="Close cart"
            >
              <IoClose className="text-xl sm:text-2xl lg:text-3xl" />
            </button>
          </div>

          {/* Subtitle - Hidden on very small screens */}
          {cart.length > 0 && (
            <div className="px-3 sm:px-4 pb-2">
              <p className="text-gray-400 text-xs sm:text-sm">
                {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
              </p>
            </div>
          )}
        </div>

        {/* Cart Items - Responsive Scrollable Area */}
        <div className="overflow-y-auto h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] p-3 sm:p-4 custom-scroll">
          {cart.length === 0 ? (
            // Empty Cart State - Responsive
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 opacity-50">
                🛒
              </div>
              <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-6">
                Discover amazing products and add them to your cart!
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            // Cart Items List - Responsive
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 hover:bg-gray-750 rounded-lg p-3 sm:p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Product Image - Responsive */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg object-cover"
                      />
                    </div>

                    {/* Product Details - Responsive */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      {/* Product Name and Price */}
                      <div className="mb-2">
                        <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg truncate mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm">
                          ₹{item.price.toLocaleString()} each
                        </p>
                      </div>

                      {/* Quantity Controls and Total - Responsive Layout */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
                          <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-gray-600 hover:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors duration-200"
                          >
                            <FiMinus className="text-xs sm:text-sm" />
                          </button>
                          <span className="text-white font-medium px-2 sm:px-3 text-sm sm:text-base min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-gray-600 hover:bg-gray-500 text-white flex items-center justify-center transition-colors duration-200"
                          >
                            <FiPlus className="text-xs sm:text-sm" />
                          </button>
                        </div>

                        {/* Item Total and Remove Button */}
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-blue-400 font-bold text-sm sm:text-base lg:text-lg">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="text-red-400 hover:text-red-300 p-1 sm:p-2 rounded-md hover:bg-red-900/20 transition-all duration-200"
                            aria-label="Remove item"
                          >
                            <HiOutlineTrash className="text-sm sm:text-base" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Responsive */}
        {cart.length > 0 && (
          <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-3 sm:p-4 shadow-lg">
            {/* Total - Responsive Typography */}
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-white font-semibold text-base sm:text-lg lg:text-xl">
                Total:
              </span>
              <span className="text-blue-400 font-bold text-lg sm:text-xl lg:text-2xl">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Action Buttons - Responsive Stack */}
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full py-2.5 sm:py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <span className="text-base sm:text-lg">💳</span>
              </button>

              <button
                onClick={handleClearCart}
                className="w-full cursor-pointer py-2 sm:py-2.5 bg-black hover:bg-white hover:text-black active:bg-red-800 text-white rounded-lg font-medium transition-all duration-200 text-sm sm:text-base transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Clear Cart 🗑️
              </button>
            </div>
          </div>
        )}
      </div>

      
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 2px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 2px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        @media (min-width: 640px) {
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
          }
        }

         Prevent text selection on quantity buttons 
        .quantity-btn {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
      `}</style>
    </>
  );
};

export default Cart;
