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
  const showCartPopup = useSelector((state) => state.cartPopup.show); // ✅ fixed selector
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showlogin, setshowlogin] = useState(false);
  const [signup, setsignup] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col lg:flex-row lg:items-center justify-between text-shadow-red-500 px-2 sm:px-4 py-3 bg-black w-full top-0 left-0 z-50 shadow-md`}
      >
        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
          <img
            src={logo}
            className="animate-bounce h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 transition-all duration-1000 rounded-full"
            alt="logo"
          />
          <h1 className=" flex  gap-2 text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-extrabold text-white text-center lg:text-left">
            Gurjar Collections <GiClothes />
          </h1>
        </div>

        {/* Search Input */}
        <div className="flex justify-center w-full lg:w-auto mt-3 lg:mt-0 lg:ml-auto lg:mr-4">
          <div className="flex gap-2 sm:gap-3 lg:gap-5 w-full max-w-md lg:max-w-none">
            <button
              onClick={() => navigate("/home")}
              className="bg-white text-black px-3 py-2 text-sm sm:text-base rounded-md cursor-pointer hover:bg-sky-500 duration-500 font-bold hover:scale-110 transition-all flex-shrink-0"
            >
              Home
            </button>
            <input
              type="search"
              placeholder="Search"
              className="p-2 sm:p-3 bg-white text-shadow-xs rounded-full flex-1 min-w-0 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 lg:mt-0 lg:ml-4 items-center justify-center lg:justify-end">
          <button className="flex items-center justify-center gap-1 bg-white px-2 py-2 text-xs sm:text-sm lg:text-base rounded-xl font-bold cursor-pointer hover:scale-105 hover:bg-sky-500 duration-500 flex-shrink-0">
            <span className="hidden sm:inline">My Wishlist</span>
            <span className="sm:hidden">Wishlist</span>
            <p className="text-red-500">
              <FaHeart />
            </p>
          </button>

          <span
            onClick={() => dispatch(openCartPopup())} // ✅ added click to open cart popup
            className="flex items-center justify-center hover:bg-sky-500 duration-500 hover:text-black hover:scale-105 px-2 py-1 rounded-xl cursor-pointer bg-white flex-shrink-0"
          >
            <button className="font-bold cursor-pointer text-xs sm:text-sm lg:text-base">
              <span className="hidden sm:inline">My Bag</span>
              <span className="sm:hidden">Bag</span>
            </button>
            <img
              src={cart}
              className="h-6 w-6 sm:h-8 sm:w-8 text-white hover:bg-sky-500 cursor-pointer p-1 sm:p-2 rounded-md ml-1"
              alt=""
            />
          </span>

          <button
            onClick={() => setshowlogin(true)}
            className="bg-white cursor-pointer text-black px-3 py-2 text-xs sm:text-sm lg:text-base rounded-2xl hover:scale-110 font-bold duration-500 hover:bg-blue-500 hover:text-black transition-all flex-shrink-0"
          >
            Login
          </button>

          <p className="text-lg sm:text-2xl font-bold text-white">/</p>

          <button
            onClick={() => setsignup(true)}
            className="bg-white cursor-pointer text-black px-3 py-2 text-xs sm:text-sm lg:text-base rounded-2xl hover:scale-110 font-bold duration-500 hover:bg-blue-500 hover:text-black transition-all flex-shrink-0"
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
