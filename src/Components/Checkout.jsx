import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Mock loadStripe function (frontend-only demo)
const loadStripe = async (publishableKey) => {
  // Normally, you import this from '@stripe/stripe-js'
  // Here, we mock redirectToCheckout to always throw because backend is missing
  return {
    redirectToCheckout: async ({ sessionId }) => {
      throw new Error(
        "Frontend-only demo: Backend required for actual Stripe checkout sessions"
      );
    },
  };
};

const CheckoutPage = () => {
  const location = useLocation();
  const cartItems = location.state?.items || [];

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Calculate subtotal, shipping and total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 100;
  const total = subtotal + shipping;

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "pincode",
    ];

    requiredFields.forEach((field) => {
      if (!address[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (address.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (address.phone && !/^\d{10}$/.test(address.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (address.pincode && !/^\d{6}$/.test(address.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Stripe payment click (frontend-only demo)
  const handleStripePayment = async () => {
    if (!validateForm()) {
      return;
    }
    setIsProcessing(true);

    try {
      // Mock loading stripe SDK
      const stripe = await loadStripe(
        "pk_test_51OSa1ASI94bxAiqNPhrns6JhCfkJwZf16TlX7iqylqmbCwUbYEThqtOzzdY5uRR8c1LSSk0CNSux0BXC8uEZsIO300Zf0OzWzp"
      );

      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      // You would normally call your backend here to create a session

      alert(`Frontend-only Demo:
      
In a real app, this would:
1. Send order data to backend
2. Create a Stripe Checkout session
3. Redirect to Stripe checkout page
4. Process actual payment

Order Total: ₹${total.toFixed(2)}
Items: ${cartItems.length}

This is a demo - no payment will be processed.`);

      setOrderComplete(true);
    } catch (error) {
      alert("Payment processing failed: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetOrder = () => {
    setOrderComplete(false);
    setAddress({
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    });
    setErrors({});
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 py-30 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Order Successful!
          </h2>
          <p className="text-green-700 mb-4">
            Thank you for your order. Your payment has been processed
            successfully.
          </p>
          <div className="bg-white p-4 rounded border mb-4">
            <h3 className="font-semibold mb-2">Order Details:</h3>
            <p>Total Amount: ₹{total.toFixed(2)}</p>
            <p>
              Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
            <p>
              Order ID: #{Math.random().toString(36).substring(7).toUpperCase()}
            </p>
            <p>
              Delivery Address: {address.street}, {address.city},{" "}
              {address.state} - {address.pincode}
            </p>
          </div>
          <button
            onClick={resetOrder}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl py-40 mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800">
          <strong>Frontend-Only Demo:</strong> Stripe integration shown but
          requires backend for real payments.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Address Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
          <div className="space-y-4">
            {[
              { name: "name", placeholder: "Full Name *" },
              { name: "email", placeholder: "Email Address *", type: "email" },
              {
                name: "phone",
                placeholder: "Phone Number (10 digits) *",
                type: "tel",
              },
              { name: "street", placeholder: "Street Address *" },
              { name: "city", placeholder: "City *" },
              { name: "state", placeholder: "State *" },
              {
                name: "pincode",
                placeholder: "Pincode (6 digits) *",
                type: "number",
              },
            ].map(({ name, placeholder, type = "text" }) => (
              <div key={name}>
                <input
                  name={name}
                  placeholder={placeholder}
                  type={type}
                  value={address[name]}
                  onChange={handleChange}
                  className={`w-full border p-3 rounded-lg ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cartItems.length === 0 && (
                <p className="text-gray-600 text-center">Your cart is empty.</p>
              )}
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size || "default"}`}
                  className="flex gap-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item.img || "https://via.placeholder.com/80"}
                    alt={item.desc}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = "/path_to_local_placeholder.png"; // local fallback image
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.desc}</span>
                      <span className="font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.category && (
                        <span className="ml-2">Category: {item.category}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-sm text-gray-600">
                        ₹{Number(item.price).toFixed(2)} each
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>
                  Subtotal (
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  items):
                </span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping:</span>
                <span
                  className={shipping === 0 ? "text-green-600 font-medium" : ""}
                >
                  {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              {subtotal <= 499 && (
                <div className="text-sm text-blue-600">
                  Add ₹{(501 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-3">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleStripePayment}
                disabled={cartItems.length === 0 || isProcessing}
                className="mt-4 w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  "Confirm Order"
                )}
              </button>
              <p className="text-xs text-orange-500 text-center">
                This is a demo - no actual payment will be charged
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
