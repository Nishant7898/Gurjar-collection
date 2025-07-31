import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../Redux/cartslice';
import { toast } from 'react-toastify';

const CartPopup = ({ onClose, onViewCart }) => {
  
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to checkout");
      return;
    }
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }


    navigate("/checkout", { 
      state: { 
        items: cartItems.map(item => ({
          id: item.id,
          desc: item.desc,
          price: item.price,
          quantity: item.quantity,
          img: item.img,
          size: item.size,
          category: item.category // Ensure this exists in your cart items
        }))
      } 
    });
  };

  return (
    <div className="flex md:py-20 flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Cart ({cartItems.length})</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const price = Number(item.price) || 0;
              const totalPrice = price * item.quantity;

              return (
                <div key={`${item.id}-${item.size}`} className="flex border-b pb-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.desc || 'Product image'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.desc}</h3>
                    {item.size && <p className="text-gray-500 text-sm">Size: {item.size}</p>}
                    {item.category && <p className="text-gray-500 text-sm">Category: {item.category}</p>}
                    <p className="text-gray-800 font-medium mt-1">₹{price.toFixed(2)}</p>
                  
                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => dispatch(decrementQuantity({ id: item.id, size: item.size }))}
                        className={`w-8 h-8 rounded flex items-center justify-center text-white font-medium ${
                          item.quantity <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                        }`}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity({ id: item.id, size: item.size }))}
                        className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center justify-center font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Remove and Total Price */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

      {/* Footer with Checkout Button */}
      <div className="border-t p-4">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Subtotal:</span>
          <span className="font-bold">₹{calculateTotal().toFixed(2)}</span>
        </div>
        <div className="space-y-2">
          <button
            onClick={handleCheckout}
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
            onClick={() => {
              if (!isAuthenticated) {
                toast.error("Please log in to view your cart");
                return;
              }
              onViewCart();
            }}
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