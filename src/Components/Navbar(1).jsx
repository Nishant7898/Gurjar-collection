import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdownCircle, IoIosSearch } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { ShoppingBag } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/Logo.png";
import { MdMic } from "react-icons/md";
import Profiledropdown from "../authpage/profiledropdown";
import CartPopup from "./Cartpopup";
import Wishlist from "./Wishlist";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Custom hook: detect mobile viewport
function useMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useMobile();

  // Search and category state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Popup open state: can be "profile", "cart", "wishlist" or null
  const [openPopup, setOpenPopup] = useState(null);

  // Mobile menu open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for managing clicks and accessibility
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const categoryButtonRef = useRef(null);
  const profileRef = useRef(null);
  const cartRef = useRef(null);
  const wishlistRef = useRef(null);

  // Redux selectors
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);

  // Close dropdowns, popups on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Category dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        categoryButtonRef.current &&
        !categoryButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
      
      // Mobile menu
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Mobile menu toggle"]')
      ) {
        setIsMobileMenuOpen(false);
      }
      
      // Profile popup
      if (
        openPopup === "profile" &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setOpenPopup(null);
      }
      
      // Cart popup
      if (
        openPopup === "cart" &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        setOpenPopup(null);
      }
      
      // Wishlist popup
      if (
        openPopup === "wishlist" &&
        wishlistRef.current &&
        !wishlistRef.current.contains(event.target)
      ) {
        setOpenPopup(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen, openPopup]);

  // Close mobile menu on window resize beyond breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Search handlers
  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue, "in category:", selectedCategory);
      // Implement your actual search logic or navigation here
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Toggle category dropdown
  const handleDropdownToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  // Select category item
  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
    setIsDropdownOpen(false);
    console.log("Selected category:", category.value);
  };

  // Toggle popup, redirect to login if not authenticated
  const togglePopup = (popupName) => {
    if (!isAuthenticated && (popupName === "wishlist" || popupName === "profile" || popupName === "cart")) {
      navigate("/login");
      return;
    }
    setOpenPopup((prev) => (prev === popupName ? null : popupName));
  };

  // Navigate to wishlist page and close popup
  const handleViewWishlist = () => {
    if (isAuthenticated) {
      navigate("/wishlist");
      setOpenPopup(null);
    } else {
      navigate("/login");
    }
  };

  // Categories for dropdown
  const categories = [
    { name: "All Categories", value: "all" },
    { name: "T-Shirts", value: "tshirts" },
    { name: "Shirts", value: "shirts" },
    { name: "Jeans", value: "jeans" },
    { name: "Hoodies", value: "hoodies" },
    { name: "Accessories", value: "accessories" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-300 shadow-lg z-[100]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* MOBILE NAVBAR */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <img
                onClick={() => navigate("/")}
                src={logo}
                alt="Logo"
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
                tabIndex={0}
              />
            </div>
            <button
              aria-label="Mobile menu toggle"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-blue-300 transition-colors duration-200"
              type="button"
            >
              {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>

          {/* Search bar */}
          <div className="pb-3">
            <div className="relative">
              <div className={`flex items-center bg-white rounded-lg shadow-md ${isDropdownOpen ? "overflow-visible" : "overflow-hidden"}`}>
                <input
                  className="flex-1 px-3 py-2 text-sm outline-none placeholder-gray-500"
                  type="text"
                  placeholder="Find your perfect style..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Search products"
                />
                <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                  <button
                    ref={categoryButtonRef}
                    onClick={handleDropdownToggle}
                    className="flex items-center gap-2 bg-yellow-200 px-4 py-2 text-sm font-medium hover:bg-yellow-300 transition-colors duration-200 whitespace-nowrap w-full sm:w-auto justify-between"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    type="button"
                  >
                    <span className="truncate max-w-[calc(100vw-6rem)] sm:max-w-full">
                      {selectedCategory === "All Categories" ? "Category" : selectedCategory}
                    </span>
                    <IoMdArrowDropdownCircle
                      className={`text-lg transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isDropdownOpen && (
                    <ul
                      role="listbox"
                      tabIndex={-1}
                      className="absolute top-full mt-1 right-0 w-full sm:w-48 bg-white border rounded-md shadow-lg z-[110] max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                    >
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          role="option"
                          aria-selected={selectedCategory === category.name}
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-medium transition-colors duration-150 ${
                            selectedCategory === category.name ? "bg-blue-50 text-blue-600" : ""
                          }`}
                          onClick={() => handleCategorySelect(category)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleCategorySelect(category);
                            }
                          }}
                          tabIndex={0}
                        >
                          {category.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
                  aria-label="Search"
                  type="button"
                >
                  <IoIosSearch className="h-5 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu popup items */}
          <div
            ref={mobileMenuRef}
            className={`overflow-hidden transition-all duration-300 ease-in-out bg-blue-300 ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="pb-4">
              <div className="flex justify-center gap-8 pt-2">
                {/* Wishlist */}
                <div className="relative" ref={wishlistRef}>
                  <button
                    onClick={() => togglePopup("wishlist")}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    aria-haspopup="true"
                    aria-expanded={openPopup === "wishlist"}
                    aria-controls="wishlist-popup-mobile"
                    title="Wishlist"
                    type="button"
                  >
                    <AiOutlineHeart className="h-6 w-6" />
                    <span className="text-xs font-medium">Wishlist</span>
                  </button>
                </div>
                {/* Cart */}
                <div className="relative" ref={cartRef}>
                  <button
                    onClick={() => togglePopup("cart")}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    aria-haspopup="true"
                    aria-expanded={openPopup === "cart"}
                    aria-controls="cart-popup-mobile"
                    title="Cart"
                    type="button"
                  >
                    <div className="relative">
                      <ShoppingBag className="h-6 w-6" />
                      {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {totalQuantity}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium">Cart</span>
                  </button>
                </div>
                {/* Profile */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => togglePopup("profile")}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    aria-haspopup="true"
                    aria-expanded={openPopup === "profile"}
                    aria-controls="profile-popup-mobile"
                    title="Profile"
                    type="button"
                  >
                    <CgProfile className="h-6 w-6" />
                    <span className="text-xs font-medium">Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP NAVBAR */}
        <div className="hidden sm:flex sm:items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")} tabIndex={0}>
            <img
              className="h-12 w-12 lg:h-16 lg:w-16 rounded-full object-cover"
              src={logo}
              alt="Logo"
            />
          </div>

          {/* Search and Category */}
          <div className="flex items-center flex-1 max-w-md lg:max-w-lg xl:max-w-2xl mx-6">
            <div className="flex relative items-center flex-1 bg-white rounded-l-lg overflow-hidden">
              <span
                className="relative flex items-center justify-center ml-2 hover:text-red-600 text-cyan-600 font-bold text-2xl"
                aria-hidden="true"
              >
                <MdMic />
              </span>
              <input
                className="flex-1 px-4 py-2 lg:py-3 text-sm lg:text-base outline-none placeholder-gray-500"
                type="text"
                placeholder="Find your perfect style..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                aria-label="Search products"
              />
            </div>

            <div className="relative w-full sm:w-auto" ref={dropdownRef}>
              <button
                ref={categoryButtonRef}
                onClick={handleDropdownToggle}
                className="flex items-center gap-2 bg-yellow-200 px-4 py-2 lg:py-3 text-sm lg:text-base font-medium hover:bg-yellow-300 hover:scale-105 transition-all duration-200 whitespace-nowrap min-w-[140px] justify-between w-full sm:w-auto"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                type="button"
              >
                <span className="truncate max-w-[calc(100vw-6rem)] sm:max-w-full">
                  {selectedCategory === "All Categories" ? "Category" : selectedCategory}
                </span>
                <IoMdArrowDropdownCircle
                  className={`text-lg lg:text-xl transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {isDropdownOpen && (
                <ul
                  role="listbox"
                  tabIndex={-1}
                  className="absolute top-full mt-2 right-0 bg-white border rounded-md shadow-lg z-[110] w-full sm:w-48 lg:w-56 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                >
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      role="option"
                      aria-selected={selectedCategory === category.name}
                      className={`px-4 py-2 lg:py-3 hover:bg-gray-100 cursor-pointer text-sm lg:text-base font-medium transition-colors duration-150 touch-manipulation ${
                        selectedCategory === category.name ? "bg-blue-50 text-blue-600" : ""
                      }`}
                      onClick={() => handleCategorySelect(category)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleCategorySelect(category);
                        }
                      }}
                      tabIndex={0}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="px-4 py-2 lg:py-3 bg-gray-600 text-white hover:bg-gray-700 hover:scale-105 transition-all duration-200 rounded-r-lg text-sm lg:text-base font-medium whitespace-nowrap"
              aria-label="Search"
              type="button"
            >
              Search
            </button>
          </div>

          {/* Right side icons */}
          <div className="flex gap-4 lg:gap-6 flex-shrink-0">
            {/* Wishlist */}
            <div className="relative" ref={wishlistRef}>
              <button
                onClick={() => togglePopup("wishlist")}
                className="flex flex-col items-center gap-1 text-gray-700 transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={openPopup === "wishlist"}
                aria-controls="wishlist-popup"
                title="Wishlist"
                type="button"
              >
                <AiOutlineHeart className="h-6 w-6 lg:h-7 lg:w-7" />
                <span className="text-xs lg:text-sm font-medium">Wishlist</span>
              </button>
            </div>

            {/* Cart */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => togglePopup("cart")}
                className="flex flex-col items-center gap-1 text-gray-700 transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={openPopup === "cart"}
                aria-controls="cart-popup"
                title="Cart"
                type="button"
              >
                <div className="relative">
                  <ShoppingBag className="h-6 w-6 lg:h-7 lg:w-7" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </div>
                <span className="text-xs lg:text-sm font-medium">Cart</span>
              </button>
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => togglePopup("profile")}
                className="flex flex-col items-center gap-1 text-gray-700 transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={openPopup === "profile"}
                aria-controls="profile-popup"
                title="Profile"
                type="button"
              >
                <CgProfile className="h-6 w-6 lg:h-7 lg:w-7" />
                <span className="text-xs lg:text-sm font-medium">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MODAL STYLE POPUPS */}
      {isMobile && openPopup === "wishlist" && isAuthenticated && (
        <div
          id="wishlist-popup-mobile"
          className="fixed inset-0 z-[200] flex items-center justify-center px-2"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xs max-h-[80vh] overflow-y-auto p-4 relative">
            <button
              onClick={() => setOpenPopup(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg font-bold"
              aria-label="Close wishlist"
              type="button"
            >
              &times;
            </button>
            <Wishlist />
            <button
              onClick={handleViewWishlist}
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors duration-200 text-sm font-medium"
              type="button"
            >
              View Wishlist
            </button>
          </div>
        </div>
      )}
      {isMobile && openPopup === "cart" && (
        <div
          id="cart-popup-mobile"
          className="fixed inset-0 z-[200] flex items-center justify-center px-2"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xs max-h-[80vh] overflow-y-auto p-4 relative">
            <button
              onClick={() => setOpenPopup(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg font-bold"
              aria-label="Close cart"
              type="button"
            >
              &times;
            </button>
            <CartPopup />
          </div>
        </div>
      )}
      {isMobile && openPopup === "profile" && (
        <div
          id="profile-popup-mobile"
          className="fixed inset-0 z-[200] flex items-center justify-center px-2"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xs max-h-[80vh] overflow-y-auto p-4 relative">
            <button
              onClick={() => setOpenPopup(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg font-bold"
              aria-label="Close profile"
              type="button"
            >
              &times;
            </button>
            <Profiledropdown />
          </div>
        </div>
      )}

      {/* DESKTOP POPUPS */}
      {!isMobile && openPopup === "wishlist" && isAuthenticated && (
        <div
          id="wishlist-popup"
          className="absolute top-24 right-6 z-[150] bg-white border rounded-md shadow-lg p-4 w-64 max-h-[400px] overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <Wishlist />
          <button
            onClick={handleViewWishlist}
            className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors duration-200 text-sm font-medium"
            type="button"
          >
            View Wishlist
          </button>
        </div>
      )}
      {!isMobile && openPopup === "cart" && (
        <div
          id="cart-popup"
          className="absolute top-24 right-6 z-[150] bg-white border rounded-md shadow-lg p-4 w-70 max-h-[450px] overflow-hidden "
          role="dialog"
          aria-modal="true"
        >
          <CartPopup />
        </div>
      )}
      {!isMobile && openPopup === "profile" && (
        <div
          id="profile-popup"
          className="absolute top-24 right-6 z-[150] bg-white border rounded-md shadow-lg p-4 w-70 max-h-[450px] overflow-x-hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <Profiledropdown />
        </div>
      )}
    </nav>
  );
};

export default Navbar;