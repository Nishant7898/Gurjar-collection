import React, { useState, useEffect } from 'react';
import { ShoppingBag, CreditCard, User, MapPin, Check, Heart, Sparkles } from 'lucide-react';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          <Sparkles 
            className="text-blue-200/20 w-4 h-4" 
            style={{
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        </div>
      ))}
    </div>
  );

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-8 mb-12">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${
              currentStep >= step 
                ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg shadow-blue-400/30' 
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {currentStep > step ? (
              <Check className="w-6 h-6 animate-bounce" />
            ) : (
              <span className="font-semibold">{step}</span>
            )}
          </div>
          {step < 3 && (
            <div 
              className={`w-16 h-1 mx-4 transition-all duration-700 ${
                currentStep > step ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gray-700'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const InputField = ({ icon:  label, type = "text", value, onChange, placeholder }) => (
    <div className="group">
      <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-blue-400">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-blue-400" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
        />
      </div>
    </div>
  );

  const Step1 = () => (
    <div className={`space-y-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="text-center mb-8">
        <User className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl font-semibold text-white mb-2">Contact Information</h2>
        <p className="text-gray-400">Let's start with your details</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          icon={User}
          label="First Name"
          value={formData.firstName}
          onChange={(value) => handleInputChange('firstName', value)}
          placeholder="Enter your first name"
        />
        <InputField
          icon={User}
          label="Last Name"
          value={formData.lastName}
          onChange={(value) => handleInputChange('lastName', value)}
          placeholder="Enter your last name"
        />
      </div>
      
      <InputField
        icon={User}
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(value) => handleInputChange('email', value)}
        placeholder="Enter your email"
      />
    </div>
  );

  const Step2 = () => (
    <div className={`space-y-6 transition-all duration-700 ${currentStep === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl font-semibold text-white mb-2">Shipping Address</h2>
        <p className="text-gray-400">Where should we send your order?</p>
      </div>
      
      <InputField
        icon={MapPin}
        label="Street Address"
        value={formData.address}
        onChange={(value) => handleInputChange('address', value)}
        placeholder="Enter your street address"
      />
      
      <InputField
        icon={MapPin}
        label="City"
        value={formData.city}
        onChange={(value) => handleInputChange('city', value)}
        placeholder="Enter your city"
      />
    </div>
  );

  const Step3 = () => (
    <div className={`space-y-6 transition-all duration-700 ${currentStep === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="text-center mb-8">
        <CreditCard className="w-16 h-16 text-green-400 mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl font-semibold text-white mb-2">Payment Details</h2>
        <p className="text-gray-400">Secure payment processing</p>
      </div>
      
      <InputField
        icon={CreditCard}
        label="Card Number"
        value={formData.cardNumber}
        onChange={(value) => handleInputChange('cardNumber', value)}
        placeholder="1234 5678 9012 3456"
      />
      
      <div className="grid grid-cols-2 gap-6">
        <InputField
          icon={CreditCard}
          label="Expiry Date"
          value={formData.expiryDate}
          onChange={(value) => handleInputChange('expiryDate', value)}
          placeholder="MM/YY"
        />
        <InputField
          icon={CreditCard}
          label="CVV"
          value={formData.cvv}
          onChange={(value) => handleInputChange('cvv', value)}
          placeholder="123"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 text-white relative overflow-hidden">
      <FloatingElements />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 pt-20 pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 mb-4">
              <ShoppingBag className="w-8 h-8 text-blue-400" />
              <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
              Peaceful Checkout
            </h1>
            <p className="text-gray-400 text-lg">Complete your order with ease and tranquility</p>
          </div>

          <StepIndicator />

          {/* Form Container */}
          <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700/50">
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700/50">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  currentStep === 1 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'
                }`}
              >
                Previous
              </button>

              <div className="text-center flex-1 mx-4">
                <p className="text-gray-400 text-sm">Step {currentStep} of 3</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={nextStep}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                {currentStep === 3 ? 'Complete Order' : 'Continue'}
              </button>
            </div>
          </div>

          {/* Security Badge */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secured with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;