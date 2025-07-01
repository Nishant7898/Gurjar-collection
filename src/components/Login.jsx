import { Pointer } from "lucide-react";
import React, { useState } from "react";

const Login = ({ isOpen = true, onClose = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Handle login logic here
    console.log("Login attempted with:", { email, password });
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login attempted");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-black text-white shadow-lg z-[9999] transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-4 right-4 text-white font-extrabold p-2 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 transition-colors text-xl flex items-center justify-center"
      >
        ✕
      </button>

      <div className="p-8 text-center items-center justify-center mt-12">
        <h2 className="text-3xl text-center text-blue-400 font-bold mb-8">Login</h2>
        
        <div className="space-y-4">
          <div className="text-left">
            <label className="block mb-2 font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="text-left">
            <label className="block mb-2 font-medium text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all font-medium mt-6"
          >
            Login
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full cursor-pointer mt-4 bg-white text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black transition-all font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <p>
            Don't have an account?{" "}
            <button className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;