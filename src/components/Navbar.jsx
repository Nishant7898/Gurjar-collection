import React, { useState } from "react";
import { FaHeart, FaSearch, FaUser, FaBars, FaTimes, FaShoppingBag } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { closeCartPopup, openCartPopup } from "../redux/CartPopupSlice";
import Signup from "./Signup";
import Login from "./Login";

// Mock Redux hooks for demonstration
const useSelector = (selector) => {
  return selector({ cartPopup: { show: false } });
};

const useDispatch = () => {
  return () => {};
};

const Navbar = () => {
  const showCartPopup = useSelector((state) => state.cartPopup.show);
  const dispatch = useDispatch();

  const [showlogin, setshowlogin] = useState(false);
  const [signup, setsignup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      {/* Top promotional banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-center py-2 sm:py-2.5 px-2 sm:px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <span className="font-semibold text-xs sm:text-sm tracking-wide">
            <span className="hidden sm:inline">✨ MEGA SALE - UP TO 70% OFF | FREE SHIPPING ON ORDERS OVER ₹999 ✨</span>
            <span className="sm:hidden">✨ UP TO 70% OFF | FREE SHIPPING ✨</span>
          </span>
        </div>
      </div>
      
      {/* Main navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white95">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            
            {/* Left Section - Logo and Mobile Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-95"
                aria-label="Toggle mobile menu"
              >
                {showMobileMenu ? (
                  <FaTimes className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                ) : (
                  <FaBars className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                )}
              </button>

              {/* Logo */}
              <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group">
                <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <GiClothes className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-bold text-sm sm:text-base lg:text-lg xl:text-xl tracking-tight leading-tight">
                    {/* <span className="hidden xs:block">Gurjar</span> */}
                    <span className="block xs:hidden">Gurjar Collection</span>
                  </span>
                  <span className="text-xs text-gray-500 font-medium -mt-0.5 hidden sm:block lg:text-xs">
                    Fashion & Style
                  </span>
                </div>
              </div>
            </div>

            {/* Center Section - Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              <a href="#" className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 text-sm lg:text-base group whitespace-nowrap">
                T-Shirts
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 text-sm lg:text-base group whitespace-nowrap">
                Bottomwear
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 text-sm lg:text-base group whitespace-nowrap">
                Accessories
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="relative text-red-500 hover:text-red-600 font-semibold transition-all duration-200 text-sm lg:text-base group whitespace-nowrap">
                🔥 Offers
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-pink-500"></span>
              </a>
            </div>

            {/* Right Section - Search, Account, Wishlist, Cart */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              
              {/* Desktop Search */}
              <div className="hidden xl:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-48 xl:w-64 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 pl-10 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all text-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaSearch className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Mobile/Tablet search button */}
              <button 
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="xl:hidden p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-95"
                aria-label="Toggle search"
              >
                <FaSearch className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
              </button>

              {/* Account button */}
              <button
                onClick={() => setshowlogin(true)}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl hover:bg-gray-100 group transition-all duration-200 active:scale-95"
              >
                <div className="relative">
                  <FaUser className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 group-hover:text-purple-600 transition-colors" />
                </div>
                <span className="hidden sm:inline text-xs sm:text-sm text-gray-700 group-hover:text-purple-600 font-medium">
                  Account
                </span>
              </button>

              {/* Wishlist button */}
              <button className="relative p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 group transition-all duration-200 active:scale-95">
                <FaHeart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold shadow-lg">
                  2
                </span>
              </button>

              {/* Cart button */}
              <button
                onClick={() => dispatch(openCartPopup())}
                className="relative p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 group transition-all duration-200 active:scale-95"
              >
                <FaShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold shadow-lg">
                  3
                </span>
              </button>

              {/* Join Now button */}
              <button
                onClick={() => setsignup(true)}
                className="ml-1 sm:ml-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-2 sm:px-4 lg:px-6 py-2 sm:py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs sm:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">Join Now</span>
                <span className="sm:hidden">Join</span>
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          {showMobileSearch && (
            <div className="xl:hidden border-t border-gray-200 py-3 sm:py-4 bg-gray-50">
              <div className="relative mx-2 sm:mx-0">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-2.5 sm:py-3 pl-10 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all text-sm shadow-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {/* Mobile navigation menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 py-2 sm:py-4 bg-white">
              <div className="flex flex-col space-y-0 sm:space-y-1">
                <a href="#" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base">
                  T-Shirts
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base">
                  Bottomwear
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base">
                  Accessories
                </a>
                <a href="#" className="text-red-500 hover:text-red-600 hover:bg-red-50 font-semibold px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200 rounded-lg mx-1 sm:mx-2 text-sm sm:text-base">
                  🔥 Offers
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Overlay for mobile menu */}
    {showCartPopup && <Cart onClose={() => dispatch(closeCartPopup())} />}

<Login
  isOpen={showlogin}
  onClose={() => setshowlogin(false)}
  onSwitchToSignup={() => {
    setshowlogin(false);
    setsignup(true);
  }}
/>


<Signup
  isOpen={signup}
  onClose={() => setsignup(false)}
  onSwitchtoLogin={() => {
    setsignup(false);
    setshowlogin(true);
  }}
/>
    </>
  );
};

export default Navbar;