import React from 'react';

const Checkout = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        <div className="text-center">
          <p className="text-gray-300 mb-4">Checkout page coming soon...</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;