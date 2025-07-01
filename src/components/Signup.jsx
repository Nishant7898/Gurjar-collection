import React from "react";
import { FcGoogle } from "react-icons/fc";
const Signup = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0  bg-opacity-50 " onClick={onClose} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-black text-white shadow-lg transform transition-transform duration-300 z-[9999] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-white font-extrabold p-2 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 transition-colors text-xl flex items-center justify-center"
        >
          ✕
        </button>
        <div className="p-6 h-full flex flex-col justify-center">
          <h2 className="text-2xl text-blue-500 font-bold mb-6 text-center">
            Sign Up
          </h2>

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

          <button className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-all">
            Sign Up
          </button>
          <p className="flex w-full  bg-white text-black p-2 rounded-md items-center justify-center mt-3 hover: cursor-pointer gap-2">
            <FcGoogle />
            Signup With Google{" "}
          </p>
          <p className="flex text-xs text-gray-500 items-center justify-center mt-3">Already have an acount? <a className="text-blue-500 hover:underline" href="">Login</a> </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
