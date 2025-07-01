import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../pages/index.css";
import Login from "./Login";
import Signup from "./Signup";
import cart from "../assets/market.png";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { closeCartPopup, openCartPopup } from "../redux/CartPopupSlice";
import Cart from "./Cart";

const Navbar = () => {
  const showCartPopup = useSelector((state) => state.cartPopup.show);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showlogin, setshowlogin] = useState(false);
  const [signup, setsignup] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col lg:flex-row lg:items-center justify-between px-2 sm:px-4 py-3 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 w-full top-0 left-0 z-50 shadow-lg border-b border-blue-100 backdrop-blur-md`}
      >
        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
          <img
            src={logo}
            className="animate-pulse h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 transition-all duration-500 rounded-full shadow-md border-2 border-blue-200 hover:border-blue-300"
            alt="logo"
          />
          <h1 className="flex gap-2 text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-slate-700 text-center lg:text-left transition-colors duration-300 hover:text-blue-600">
            Gurjar Collections 
            <span className="text-blue-500 animate-bounce">
              <GiClothes />
            </span>
          </h1>
        </div>

        {/* Search Input */}
        <div className="flex justify-center w-full lg:w-auto mt-3 lg:mt-0 lg:ml-auto lg:mr-4">
          <div className="flex gap-2 sm:gap-3 lg:gap-5 w-full max-w-md lg:max-w-none">
            <button
              onClick={() => navigate("/home")}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 text-sm sm:text-base rounded-xl cursor-pointer hover:from-blue-600 hover:to-indigo-600 duration-300 font-semibold hover:scale-105 transition-all flex-shrink-0 shadow-md hover:shadow-lg"
            >
              Home
            </button>
            <input
              type="search"
              placeholder="Search Here..."
              className="p-2 sm:p-3 bg-white/80 backdrop-blur-sm border border-blue-200 text-slate-700 rounded-full flex-1 min-w-0 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 lg:mt-0 lg:ml-4 items-center justify-center lg:justify-end">
          <button className="flex items-center justify-center gap-1 bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-slate-700 px-3 py-2 text-xs sm:text-sm lg:text-base rounded-xl font-semibold cursor-pointer hover:scale-105 duration-300 flex-shrink-0 shadow-md hover:shadow-lg border border-pink-200">
            <span className="hidden sm:inline">My Wishlist</span>
            <span className="sm:hidden">Wishlist</span>
            <p className="text-rose-500 animate-pulse">
              <FaHeart />
            </p>
          </button>

          <span
            onClick={() => dispatch(openCartPopup())}
            className="flex items-center justify-center hover:from-emerald-200 hover:to-teal-200 duration-300 hover:text-slate-700 hover:scale-105 px-3 py-2 rounded-xl cursor-pointer bg-gradient-to-r from-emerald-100 to-teal-100 flex-shrink-0 shadow-md hover:shadow-lg border border-emerald-200 transition-all"
          >
            <button className="font-semibold cursor-pointer text-xs sm:text-sm lg:text-base text-slate-700">
              <span className="hidden sm:inline">My Bag</span>
              <span className="sm:hidden">Bag</span>
            </button>
            <img
              src={cart}
              className="h-6 w-6 sm:h-8 sm:w-8 cursor-pointer p-1 sm:p-2 rounded-md ml-1 filter opacity-70 hover:opacity-100 transition-opacity duration-300"
              alt=""
            />
          </span>

          <button
            onClick={() => setshowlogin(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 cursor-pointer text-white px-4 py-2 text-xs sm:text-sm lg:text-base rounded-xl hover:scale-105 font-semibold duration-300 hover:from-indigo-600 hover:to-purple-600 transition-all flex-shrink-0 shadow-md hover:shadow-lg"
          >
            Login
          </button>

          <p className="text-lg sm:text-2xl font-light text-slate-400">/</p>

          <button
            onClick={() => setsignup(true)}
            className="bg-gradient-to-r from-violet-500 to-purple-500 cursor-pointer text-white px-4 py-2 text-xs sm:text-sm lg:text-base rounded-xl hover:scale-105 font-semibold duration-300 hover:from-violet-600 hover:to-purple-600 transition-all flex-shrink-0 shadow-md hover:shadow-lg"
          >
            SignUp
          </button>
        </div>
      </div>

      {showCartPopup && (
        <Cart isOpen={true} onClose={() => dispatch(closeCartPopup())} />
      )}

      <Login isOpen={showlogin} onClose={() => setshowlogin(false)} />
      <Signup isOpen={signup} onClose={() => setsignup(false)} />
    </>
  );
};

export default Navbar;