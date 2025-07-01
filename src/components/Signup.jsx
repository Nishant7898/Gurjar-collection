import React from "react";
import { FcGoogle } from "react-icons/fc";
const Signup = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 "
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-black text-white shadow-lg transform transition-transform duration-300 z-[9999] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}

      >
         <button
        onClick={onClose}
        className="absolute cursor-pointer top-4 right-4 text-black font-extrabold p-2 w-10 rounded-full bg-red-500 text-xl"
      >
        ✕
      </button>
        <div className="p-6 h-full flex flex-col justify-center">
          <h2 className="text-2xl text-blue-500 font-bold mb-6 text-center">Sign Up</h2>

          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          />

          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          />

          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring focus:ring-blue-400"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-all">
            Sign Up
          </button>
<p className="flex text-xl items-center justify-center mt-3 hover:underline cursor-pointer gap-2">Signup With Google <FcGoogle /> </p>
     
        </div>
      </div>
    </>
  );
};

export default Signup;
