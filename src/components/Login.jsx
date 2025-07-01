import React from "react";
import { FcGoogle } from "react-icons/fc";
const Login = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed  top-0 right-0 h-full w-full sm:w-[400px] bg-black text-white shadow-lg z-[9999] transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-4 right-4 text-black font-extrabold p-2 w-10 rounded-full bg-red-500 text-xl"
      >
        ✕
      </button>

      <div className="p-8 text-center items-center justify-center mt-12">
        <h2 className="text-2xl text-center text-blue-500 font-bold mb-6">Login</h2>
        <label className="block mb-2 font-medium">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-2 border border-gray-300 rounded mb-6"
        />
        <button className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
        <p className="text-xl flex hover:underline cursor-pointer items-center justify-center mt-4">Loging in with Google<FcGoogle /></p>
      </div>
    </div>
  );
};

export default Login;
