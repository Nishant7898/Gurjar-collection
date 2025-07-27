import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { login } from "../Redux/authSlice";

const Loginpage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async () => {
    if (!emailOrPhone.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const resultAction = await dispatch(login({ emailOrPhone, password }));

      if (login.fulfilled.match(resultAction)) {
        // Navigation handled by useEffect
      } else {
        setError("Invalid email/phone or password");
      }
    } catch {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
            >
              {error}
            </div>
          )}

          {/* Login form */}
          <div className="space-y-6">
            {/* Email/Phone field */}
            <label htmlFor="emailOrPhone" className="sr-only">
              Email or Phone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="emailOrPhone"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your email or phone"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                required
                autoComplete="username"
                aria-label="Email or phone"
              />
            </div>

            {/* Password field */}
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                required
                autoComplete="current-password"
                aria-label="Password"
                spellCheck="false"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  aria-label="Remember me"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-orange-600 hover:text-orange-800 transition-colors duration-200"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              type="button"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center"
              aria-live="polite"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </button>
          </div>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-orange-600 hover:text-orange-800 transition-colors duration-200 font-medium underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
