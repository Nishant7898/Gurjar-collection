import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
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

const Navbar = () => {
  const navigate = useNavigate();

  // Navigation logo click
  const handleClick = () => {
    navigate("/");
  };

  // Search and category
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Popup open state: "profile", "cart", "wishlist", null = none open
  const [openPopup, setOpenPopup] = useState(null);

  // Responsive mobile menu open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for click outside detection
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

  // Handle outside clicks, close dropdowns or menus if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Category dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target !== categoryButtonRef.current
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
      if (openPopup === "profile" && profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenPopup(null);
      }

      // Cart popup
      if (openPopup === "cart" && cartRef.current && !cartRef.current.contains(event.target)) {
        setOpenPopup(null);
      }

      // Wishlist popup
      if (openPopup === "wishlist" && wishlistRef.current && !wishlistRef.current.contains(event.target)) {
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

  // Close mobile menu if resized beyond mobile breakpoint
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
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Category dropdown toggle
  const handleDropdownToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  // Category select click
  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
    setIsDropdownOpen(false);
    console.log("Selected category:", category.value);
  };

  // Popup toggle helper - open clicked popup and close others
  const togglePopup = (popupName) => {
    if (!isAuthenticated && (popupName === "wishlist" || popupName === "profile" || popupName === "cart")) {
      navigate("/login");
      return;
    }
    setOpenPopup((prev) => (prev === popupName ? null : popupName));
  };

  const handleViewWishlist = () => {
    if (isAuthenticated) {
      navigate("/wishlist");
      setOpenPopup(null); // Close dropdown after navigation
    } else {
      navigate("/login");
    }
  };

  // Categories array
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
        {/* Mobile Navbar */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <img
                onClick={handleClick}
                src={logo}
                alt="Logo"
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
              />
            </div>

            <button
              aria-label="Mobile menu toggle"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-blue-300 transition-colors duration-200"
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

                <div className="relative" ref={dropdownRef}>
                  <button
                    ref={categoryButtonRef}
                    onClick={handleDropdownToggle}
                    className="flex items-center gap-1 bg-yellow-200 px-3 py-2 text-sm font-medium hover:bg-yellow-300 transition-colors duration-200 whitespace-nowrap"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    type="button"
                  >
                    <span className="truncate max-w-[80px]">
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
                      className="absolute top-full mt-1 right-0 w-48 bg-white border rounded-md shadow-lg z-[110] max-h-60 overflow-y-auto"
                    >
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          role="option"
                          aria-selected={selectedCategory === category.name}
                          className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-150 ${selectedCategory === category.name ? "bg-blue-50 text-blue-600" : ""}`}
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
                >
                  <IoIosSearch className="h-5 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu popup items */}
          <div
            ref={mobileMenuRef}
            className={`overflow-hidden transition-all duration-300 ease-in-out bg-blue-300 ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
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
                    aria-controls="wishlist-popup"
                    title="Wishlist"
                    type="button"
                  >
                    <AiOutlineHeart className="h-6 w-6" />
                    <span className="text-xs font-medium">Wishlist</span>
                  </button>
                  {openPopup === "wishlist" && (
                    <div
                      id="wishlist-popup"
                      className="absolute top-12 right-0 z-50 bg-white border rounded-md shadow-lg p-4 w-64"
                    >
                      <Wishlist />
                      <button
                        onClick={handleViewWishlist}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                      >
                        View Wishlist
                      </button>
                    </div>
                  )}
                </div>

                {/* Cart */}
                <div className="relative" ref={cartRef}>
                  <button
                    onClick={() => togglePopup("cart")}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    aria-haspopup="true"
                    aria-expanded={openPopup === "cart"}
                    aria-controls="cart-popup"
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
                  {openPopup === "cart" && (
                    <div id="cart-popup" className="absolute top-12 right-0 z-50">
                      <CartPopup />
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => togglePopup("profile")}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    aria-haspopup="true"
                    aria-expanded={openPopup === "profile"}
                    aria-controls="profile-popup"
                    title="Profile"
                    type="button"
                  >
                    <CgProfile className="h-6 w-6" />
                    <span className="text-xs font-medium">Profile</span>
                  </button>
                  {openPopup === "profile" && (
                    <div id="profile-popup" className="absolute top-12 right-0 z-50">
                      <Profiledropdown />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden sm:flex sm:items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={handleClick}>
            <img
              className="h-12 w-12 lg:h-16 lg:w-16 rounded-full object-cover"
              src={logo}
              alt="Logo"
              tabIndex={0}
            />
          </div>

          {/* Search and Category */}
          <div className="flex items-center flex-1 max-w-md lg:max-w-lg xl:max-w-2xl mx-6">
            <div className="flex relative items-center flex-1 bg-white rounded-l-lg overflow-hidden">
              <p
                className="relative flex items-center justify-center ml-2 hover:text-red-600 text-cyan-600 font-bold text-2xl"
                aria-hidden="true"
              >
                <MdMic />
              </p>
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

            <div className="relative" ref={dropdownRef}>
              <button
                ref={categoryButtonRef}
                onClick={handleDropdownToggle}
                className="flex items-center gap-2 bg-yellow-200 px-4 py-2 lg:py-3 text-sm lg:text-base font-medium hover:bg-yellow-300 hover:scale-105 transition-all duration-200 whitespace-nowrap min-w-[140px] justify-between"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                type="button"
              >
                <span className="truncate">{selectedCategory === "All Categories" ? "Category" : selectedCategory}</span>
                <IoMdArrowDropdownCircle
                  className={`text-lg lg:text-xl transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isDropdownOpen && (
                <ul
                  role="listbox"
                  tabIndex={-1}
                  className="absolute top-full mt-2 right-0 bg-white border rounded-md shadow-lg z-[110] w-48 lg:w-56 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
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
            >
              Search
            </button>
          </div>

          {/* Right-side Navbar Icons */}
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
              {openPopup === "wishlist" && isAuthenticated && (
                <div
                  id="wishlist-popup"
                  className="absolute top-12 right-0 z-50 bg-white border rounded-md shadow-lg p-4 w-64"
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
              {openPopup === "cart" && (
                <div id="cart-popup" className="absolute top-12 right-0 z-50">
                  <CartPopup />
                </div>
              )}
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
              {openPopup === "profile" && (
                <div id="profile-popup" className="absolute top-12 right-0 z-50">
                  <Profiledropdown />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
