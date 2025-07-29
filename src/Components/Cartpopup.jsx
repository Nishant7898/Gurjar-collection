import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../Redux/cartslice';

const CartPopup = ({ onClose, onViewCart, onCheckout }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Cart ({cartItems.length})</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              console.log('Image URL:', item.img); // Debug image URL
              const price = Number(item.price) || 0;
              const totalPrice = price * item.quantity;

              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex border-b pb-4"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.desc || 'Product image'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`Failed to load image: ${item.img}`);
                          // Hide the broken image and show placeholder
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200"
                      style={{ display: item.img ? 'none' : 'flex' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.desc}</h3>
                    {item.size && (
                      <p className="text-gray-500 text-sm">Size: {item.size}</p>
                    )}
                    <p className="text-gray-800 font-medium mt-1">
                      ${price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          dispatch(
                            decrementQuantity({ id: item.id, size: item.size })
                          )
                        }
                        className={`w-8 h-8 rounded flex items-center justify-center text-white font-medium ${
                          item.quantity <= 1
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-orange-500 hover:bg-orange-600'
                        }`}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            incrementQuantity({ id: item.id, size: item.size })
                          )
                        }
                        className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center justify-center font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() =>
                        dispatch(removeFromCart({ id: item.id, size: item.size }))
                      }
                      className="text-gray-500 hover:text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                    <p className="font-medium">₹{totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Subtotal:</span>
          <span className="font-bold">₹{calculateTotal().toFixed(2)}</span>
        </div>
        <div className="space-y-2">
          <button
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded font-medium ${
              cartItems.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            Checkout
          </button>
          <button
            onClick={onViewCart}
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded font-medium border-2 ${
              cartItems.length === 0
                ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                : 'text-orange-500 border-orange-500 hover:bg-orange-50'
            }`}
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;