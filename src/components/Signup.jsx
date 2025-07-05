import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Signup = ({ isOpen, onClose, onSwitchtoLogin }) => {
  const [password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");

  const handlesignup = () => {
    if (!identifier || !password || !Name) {
      alert("Please Fill All Fields");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let key;

    if (phoneRegex.test(identifier)) {
      key = `user_${identifier}`; // use phone number key
    } else if (emailRegex.test(identifier)) {
      key = identifier; // use email key
    } else {
      alert("Enter a valid 10-digit number or a valid email");
      return;
    }

    const existingUser = localStorage.getItem(key);
    if (existingUser) {
      alert("User already exists. Please Login");
      onSwitchtoLogin(); // ✅ this will now work
      return;
    }

    const newUser = { Name, identifier, password };
    localStorage.setItem(key, JSON.stringify(newUser));
    alert("Signup successful! You can now login.");
    onSwitchtoLogin(); // ✅ this will now work
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50" onClick={onClose} />
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
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          />

          <label className="block mb-2 font-medium">Email or Phone</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your email or phone number"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          />

          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring focus:ring-blue-400"
          />

          <button
            onClick={handlesignup}
            className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>

          <p className="flex w-full bg-white text-black p-2 rounded-md items-center justify-center mt-3 hover:cursor-pointer gap-2">
            <FcGoogle />
            Signup With Google
          </p>

          <p className="flex text-xs text-gray-500 items-center justify-center mt-3">
            Already have an account?{" "}
            <button
              onClick={onSwitchtoLogin}
              className="text-blue-500 hover:underline ml-1"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
