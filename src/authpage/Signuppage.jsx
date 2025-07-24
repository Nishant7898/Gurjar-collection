import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, AlertCircle, Loader, Check } from 'lucide-react';
import { signupUser, clearMessage, clearError } from '../Redux/Authslice';
import { useNavigate } from 'react-router-dom';
const SignupPage = ({ onSwitchToLogin }) => {
    const navigate=useNavigate()
    const handleclick=()=>{
        navigate("/login")
    }
  const dispatch = useDispatch();
  const { isLoading, message, messageType, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  useEffect(() => {
    // Clear messages when component mounts
    dispatch(clearMessage());
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Auto-switch to login after successful signup
    if (messageType === 'success' && message?.includes('successfully')) {
      const timer = setTimeout(() => {
        onSwitchToLogin();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [messageType, message, onSwitchToLogin]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Mix of uppercase & lowercase');
    }

    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('At least one number');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('At least one special character');
    }

    return { score, feedback };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear field-specific errors
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
    
    // Clear global messages
    if (message || error) {
      dispatch(clearMessage());
      dispatch(clearError());
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms acceptance
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'Please accept the terms and conditions';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const userData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      password: formData.password,
      acceptMarketing: formData.acceptMarketing
    };
    
    const success = await dispatch(signupUser(userData));
    
    if (success) {
      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        acceptMarketing: false
      });
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 1) return 'bg-red-500';
    if (passwordStrength.score <= 2) return 'bg-yellow-500';
    if (passwordStrength.score <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 1) return 'Weak';
    if (passwordStrength.score <= 2) return 'Fair';
    if (passwordStrength.score <= 3) return 'Good';
    return 'Strong';
  };

  const renderMessage = () => {
    if (!message && !error) return null;

    return (
      <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
        messageType === 'success' 
          ? 'bg-green-50 text-green-700 border border-green-200' 
          : 'bg-red-50 text-red-700 border border-red-200'
      }`}>
        {messageType === 'success' ? (
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
        )}
        <span>{message || error}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl py-10 font-bold text-gray-800 mb-2">Create Account</h2>
    
        </div>

        {renderMessage()}

       

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address(Optional)
            </label>
            <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                  formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
              />
            </div>
            {formErrors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number 
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                  formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
               
              />
            </div>
            {formErrors.phone && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {formErrors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                  formErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {formErrors.password && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {formErrors.password}
              </p>
            )}

            {/* Password Strength */}
            {formData.password && (
              <div className="mt-2">
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className={`h-full ${getPasswordStrengthColor()}`} style={{ width: `${(passwordStrength.score / 4) * 100}%` }} />
                </div>
                <p className="text-xs mt-1 text-gray-600">{getPasswordStrengthText()}</p>
                {passwordStrength.feedback.length > 0 && (
                  <ul className="text-xs mt-1 text-red-500 list-disc list-inside">
                    {passwordStrength.feedback.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors ${
                  formErrors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {formErrors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {formErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="acceptTerms">
                I agree to the <span className="text-rose-600 font-medium">terms and conditions</span>
              </label>
            </div>
            {formErrors.acceptTerms && (
              <p className="text-xs text-red-600 flex items-center gap-1 ml-6">
                <AlertCircle className="w-3 h-3" />
                {formErrors.acceptTerms}
              </p>
            )}

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="acceptMarketing"
                id="acceptMarketing"
                checked={formData.acceptMarketing}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="acceptMarketing">
                I want to receive New Arrival Clothes emails (optional)
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full mt-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center transition-colors"
          >
            {isLoading ? <Loader className="animate-spin w-5 h-5" /> : <Check className="mr-2 w-5 h-5" />}
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* Switch to Login */}
          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={handleclick}
              className="text-rose-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    
  );
};

export default SignupPage;