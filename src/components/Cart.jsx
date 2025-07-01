import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RemovefromCart,
  IncreaseQuantity,
  DecreaseQuantity,
  ClearCart,
} from "../redux/Cartslice";
import { IoClose } from "react-icons/io5";
import { BiCartAdd } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import toast from "react-hot-toast";
import { IoTrashBin } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";

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
    toast.error(`${item.name} removed from cart`, { icon: "🌸" });
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
      toast.success("Cart cleared gently!", { icon: <IoTrashBin/> });
    }
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout ...", { icon: <IoBagCheckOutline/> });
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
          className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/40 to-purple-900/30 backdrop-blur-sm z-[998] transition-all duration-500"
          onClick={handleOverlayClick}
        />
      )}

      {/* Slide-in Panel - Peaceful Design */}
      <div
        className={`
          fixed top-0 right-0 h-full z-[999] bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 shadow-2xl border-l border-blue-200
          transform transition-all duration-500 ease-out
          w-full sm:w-[28rem] md:w-[30rem] lg:w-[32rem] xl:w-[34rem]
          ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
      >
        {/* Header - Peaceful Colors */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-white/95 to-blue-50/95 backdrop-blur-md border-b border-blue-200 shadow-sm">
          <div className="flex justify-between items-center p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl lg:text-2xl text-slate-700 font-bold">
                My Bag
              </h2>
              <span className="text-xl sm:text-2xl animate-bounce">🛍️</span>
              {cart.length > 0 && (
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-2 py-1 rounded-full min-w-[1.5rem] text-center shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-slate-600 cursor-pointer hover:text-rose-500 transition-all duration-300 p-2 rounded-full hover:bg-rose-50 hover:scale-110"
              aria-label="Close cart"
            >
              <IoClose className="text-xl sm:text-2xl lg:text-3xl" />
            </button>
          </div>

          {/* Subtitle */}
          {cart.length > 0 && (
            <div className="px-3 sm:px-4 pb-2">
              <p className="text-slate-500 text-xs sm:text-sm">
                {totalItems} beautiful item{totalItems !== 1 ? "s" : ""}{" "}
                awaiting you
              </p>
            </div>
          )}
        </div>

        {/* Cart Items - Peaceful Scrollable Area */}
        <div className="overflow-y-auto h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] p-3 sm:p-4 custom-scroll">
          {cart.length === 0 ? (
            // Empty Cart State - Peaceful
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 opacity-60 animate-pulse">
                 <BiCartAdd />
              </div>
              <h3 className="text-slate-700 text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
                Your cart is Empty
              </h3>
              <p className="text-slate-500 text-sm sm:text-base mb-6">
                Discover beautiful products and fill it with joy! ✨
              </p>
              <button
                onClick={onClose}
                className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 cursor-pointer text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Start Shopping 
              </button>
            </div>
          ) : (
            // Cart Items List - Peaceful Design
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-2xl p-3 sm:p-4 border border-blue-100 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen
                      ? "fadeInUp 0.5s ease-out forwards"
                      : "none",
                  }}
                >
                  <div className="flex gap-3 sm:gap-4">
                   
                    <div className="flex-shrink-0">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl object-cover border-2 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                      />
                    </div>

                 
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                  
                      <div className="mb-2">
                        <h3 className="text-slate-700 font-semibold text-sm sm:text-base lg:text-lg truncate mb-1">
                          {item.name}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm">
                          ₹{item.price.toLocaleString()} each
                        </p>
                      </div>

                      {/* Quantity Controls and Total - Peaceful Layout */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        {/* Quantity Controls - Soft Colors */}
                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-1 border border-blue-100">
                          <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer rounded-lg bg-white hover:bg-blue-50 disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-600 flex items-center justify-center transition-all duration-200 border border-blue-100 hover:border-blue-200 shadow-sm"
                          >
                            <FiMinus className="text-xs sm:text-sm" />
                          </button>
                          <span className="text-slate-700 font-semibold px-2 sm:px-3 text-sm sm:text-base min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="w-7  cursor-pointer h-7 sm:w-8 sm:h-8 rounded-lg bg-white hover:bg-blue-50 text-slate-600 flex items-center justify-center transition-all duration-200 border border-blue-100 hover:border-blue-200 shadow-sm"
                          >
                            <FiPlus className="text-xs sm:text-sm" />
                          </button>
                        </div>

                        {/* Item Total and Remove Button - Gentle Colors */}
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-indigo-600 font-bold text-sm  sm:text-base lg:text-lg">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="text-rose-400 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 transition-all duration-200 border border-transparent hover:border-rose-100"
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

        {/* Footer - Peaceful Checkout */}
        {cart.length > 0 && (
          <div className="sticky bottom-0 bg-gradient-to-r from-white/95 to-blue-50/95 backdrop-blur-md border-t border-blue-200 p-3 sm:p-4 shadow-lg">
            {/* Total - Peaceful Typography */}
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-slate-700 font-semibold text-base sm:text-lg lg:text-xl">
                Total Amount:
              </span>
              <span className="text-indigo-600 font-bold text-lg sm:text-xl lg:text-2xl">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Action Buttons - Peaceful Gradients */}
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full  py-3 sm:py-3.5 cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:from-emerald-700 active:to-teal-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">Checkout <IoBagCheckOutline /></span>
              
              </button>

              <button
                onClick={handleClearCart}
                className="w-full flex items-center justify-center gap-2 cursor-pointer py-2.5 sm:py-3 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-rose-200 hover:to-pink-200 text-slate-700 hover:text-rose-700 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                Clear Collections <IoTrashBin />
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
          background: rgba(219, 234, 254, 0.5);
          border-radius: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #93c5fd, #a5b4fc);
          border-radius: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #60a5fa, #818cf8);
        }

        @media (min-width: 640px) {
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Prevent text selection on quantity buttons */
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
