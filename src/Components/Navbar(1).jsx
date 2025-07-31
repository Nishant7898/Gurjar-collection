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

// Custom hook: detect mobile viewport with more breakpoints
function useMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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

  // New refs for popup containers
  const profilePopupRef = useRef(null);
  const cartPopupRef = useRef(null);
  const wishlistPopupRef = useRef(null);

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

      // Profile popup - check both button and popup container
      if (
        openPopup === "profile" &&
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        profilePopupRef.current &&
        !profilePopupRef.current.contains(event.target)
      ) {
        setOpenPopup(null);
      }

      // Cart popup - check both button and popup container
      if (
        openPopup === "cart" &&
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        cartPopupRef.current &&
        !cartPopupRef.current.contains(event.target)
      ) {
        setOpenPopup(null);
      }

      // Wishlist popup - check both button and popup container
      if (
        openPopup === "wishlist" &&
        wishlistRef.current &&
        !wishlistRef.current.contains(event.target) &&
        wishlistPopupRef.current &&
        !wishlistPopupRef.current.contains(event.target)
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
      if (window.innerWidth >= 768) {
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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* MOBILE NAVBAR (< 768px) */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-2 sm:py-3">
            <div className="flex items-center">
              <img
                onClick={() => navigate("/")}
                src={logo}
                alt="Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover cursor-pointer"
                tabIndex={0}
              />
            </div>
            <button
              aria-label="Mobile menu toggle"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-blue-400 transition-colors duration-200 touch-manipulation"
              type="button"
            >
              {isMobileMenuOpen ? <HiX className="h-5 w-5 sm:h-6 sm:w-6" /> : <HiMenu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>

          {/* Search bar - responsive width and spacing */}
          <div className="pb-2 sm:pb-3">
            <div className="relative">
              <div className={`flex items-center bg-white rounded-lg shadow-md ${isDropdownOpen ? "overflow-visible" : "overflow-hidden"}`}>
                <input
                  className="flex-1 px-3 py-2 sm:py-2.5 text-sm outline-none placeholder-gray-500 min-w-0"
                  type="text"
                  placeholder="Find your perfect style..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Search products"
                />
                <div className="relative flex-shrink-0" ref={dropdownRef}>
                  <button
                    ref={categoryButtonRef}
                    onClick={handleDropdownToggle}
                    className="flex items-center gap-1 sm:gap-2 bg-yellow-200 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-yellow-300 transition-colors duration-200 whitespace-nowrap min-w-0"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    type="button"
                  >
                    <span className="truncate max-w-[4rem] sm:max-w-[6rem]">
                      {selectedCategory === "All Categories" ? "Category" : selectedCategory}
                    </span>
                    <IoMdArrowDropdownCircle
                      className={`text-sm sm:text-lg transition-transform duration-200 flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isDropdownOpen && (
                    <ul
                      role="listbox"
                      tabIndex={-1}
                      className="absolute top-full mt-1 right-0 w-36 sm:w-48 bg-white border rounded-md shadow-lg z-[110] max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                    >
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          role="option"
                          aria-selected={selectedCategory === category.name}
                          className={`px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm font-medium transition-colors duration-150 touch-manipulation ${
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
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 text-xs sm:text-sm font-medium flex-shrink-0"
                  aria-label="Search"
                  type="button"
                >
                  <IoIosSearch className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu popup items - better spacing and touch targets */}
          <div
            ref={mobileMenuRef}
            className={`overflow-hidden transition-all duration-300 ease-in-out bg-blue-300 ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="pb-3 sm:pb-4">
              <div className="flex justify-center gap-6 sm:gap-8 pt-2">
                {/* Wishlist - improved touch targets */}
                <div className="relative" ref={wishlistRef}>
                  <button
                    onClick={() => togglePopup("wishlist")}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-200 touch-manipulation"
                    aria-haspopup="true"
                    aria-expanded={openPopup === "wishlist"}
                    aria-controls="wishlist-popup-mobile"
                    title="Wishlist"
                    type="button"
                  >
                    <AiOutlineHeart className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs font-medium">Wishlist</span>
                  </button>
                </div>
          
                <div className="relative" ref={cartRef}>
                  <button
                    onClick={() => togglePopup("cart")}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-200 touch-manipulation"
                    aria-haspopup="true"
                    aria-expanded={openPopup === "cart"}
                    aria-controls="cart-popup-mobile"
                    title="Cart"
                    type="button"
                  >
                    <div className="relative">
                      <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
                      {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center min-w-0">
                          {totalQuantity > 99 ? '99+' : totalQuantity}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium">Cart</span>
                  </button>
                </div>
                {/* Profile - improved touch targets */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => togglePopup("profile")}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-200 touch-manipulation"
                    aria-haspopup="true"
                    aria-expanded={openPopup === "profile"}
                    aria-controls="profile-popup-mobile"
                    title="Profile"
                    type="button"
                  >
                    <CgProfile className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs font-medium">Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP NAVBAR (>= 768px) - Better responsive breakpoints */}
        <div className="hidden md:flex md:items-center justify-between py-3 lg:py-4">
          {/* Logo - responsive sizing */}
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")} tabIndex={0}>
            <img
              className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 rounded-full object-cover"
              src={logo}
              alt="Logo"
            />
          </div>

          {/* Search and Category - improved responsive sizing */}
          <div className="flex items-center flex-1 max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl mx-4 lg:mx-6">
            <div className="flex relative items-center flex-1 bg-white rounded-l-lg overflow-hidden">
              <span
                className="relative flex items-center justify-center ml-2 hover:text-red-600 text-cyan-600 font-bold text-lg md:text-xl lg:text-2xl flex-shrink-0"
                aria-hidden="true"
              >
                <MdMic />
              </span>
              <input
                className="flex-1 px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-sm md:text-base outline-none placeholder-gray-500 min-w-0"
                type="text"
                placeholder="Find your perfect style..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                aria-label="Search products"
              />
            </div>

            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                ref={categoryButtonRef}
                onClick={handleDropdownToggle}
                className="flex items-center gap-1 md:gap-2 bg-yellow-200 px-2 md:px-3 lg:px-4 py-2 lg:py-3 text-sm md:text-base font-medium hover:bg-yellow-300 hover:scale-105 transition-all duration-200 whitespace-nowrap min-w-[100px] md:min-w-[120px] lg:min-w-[140px] justify-between"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                type="button"
              >
                <span className="truncate max-w-[80px] md:max-w-[100px] lg:max-w-none">
                  {selectedCategory === "All Categories" ? "Category" : selectedCategory}
                </span>
                <IoMdArrowDropdownCircle
                  className={`text-lg lg:text-xl transition-transform duration-200 flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {isDropdownOpen && (
                <ul
                  role="listbox"
                  tabIndex={-1}
                  className="absolute top-full mt-2 right-0 bg-white border rounded-md shadow-lg z-[110] w-full min-w-[160px] md:w-40 lg:w-48 xl:w-56 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                >
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      role="option"
                      aria-selected={selectedCategory === category.name}
                      className={`px-3 md:px-4 py-2 lg:py-3 hover:bg-gray-100 cursor-pointer text-sm md:text-base font-medium transition-colors duration-150 touch-manipulation ${
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
              className="px-2 md:px-3 lg:px-4 py-2 lg:py-3 bg-gray-600 text-white hover:bg-gray-700 hover:scale-105 transition-all duration-200 rounded-r-lg text-sm md:text-base font-medium whitespace-nowrap flex-shrink-0"
              aria-label="Search"
              type="button"
            >
              <span className="hidden md:inline">Search</span>
              <IoIosSearch className="h-4 w-4 md:hidden" />
            </button>
          </div>

          {/* Right side icons - improved responsive spacing and sizing */}
          <div className="flex gap-2 md:gap-4 lg:gap-6 flex-shrink-0">
            {/* Wishlist */}
            <div className="relative" ref={wishlistRef}>
              <button
                onClick={() => togglePopup("wishlist")}
                className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 p-1 md:p-2 rounded-lg hover:bg-blue-200"
                aria-haspopup="true"
                aria-expanded={openPopup === "wishlist"}
                aria-controls="wishlist-popup"
                title="Wishlist"
                type="button"
              >
                <AiOutlineHeart className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                <span className="text-xs lg:text-sm font-medium hidden md:block">Wishlist</span>
              </button>
            </div>

            {/* Cart */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => togglePopup("cart")}
                className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 p-1 md:p-2 rounded-lg hover:bg-blue-200"
                aria-haspopup="true"
                aria-expanded={openPopup === "cart"}
                aria-controls="cart-popup"
                title="Cart"
                type="button"
              >
                <div className="relative">
                  <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center min-w-0 z-10">
                      {totalQuantity > 99 ? '99+' : totalQuantity}
                    </span>
                  )}
                </div>
                <span className="text-xs lg:text-sm font-medium hidden md:block">Cart</span>
              </button>
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => togglePopup("profile")}
                className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 p-1 md:p-2 rounded-lg hover:bg-blue-200"
                aria-haspopup="true"
                aria-expanded={openPopup === "profile"}
                aria-controls="profile-popup"
                title="Profile"
                type="button"
              >
                <CgProfile className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                <span className="text-xs lg:text-sm font-medium hidden md:block">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MODAL STYLE POPUPS - improved responsive sizing */}
     {isMobile && openPopup === "wishlist" && isAuthenticated && (
  <div
    className="fixed inset-0 z-[200] flex items-end justify-center bg-black bg-opacity-50"
    role="dialog"
    aria-modal="true"
    onClick={(e) => {
      if (wishlistPopupRef.current && !wishlistPopupRef.current.contains(e.target)) {
        setOpenPopup(null);
      }
    }}
  >
    <div
      ref={wishlistPopupRef}
      id="wishlist-popup-mobile"
      className="relative w-full max-w-md bg-white rounded-t-xl shadow-xl h-[85vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-bold">Your Wishlist</h2>
        <button
          onClick={() => setOpenPopup(null)}
          className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="overflow-y-auto h-[calc(100%-120px)] p-4">
        <Wishlist />
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t p-4 bg-gray-50">
        <button
          onClick={handleViewWishlist}
          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors font-medium"
        >
          View Full Wishlist
        </button>
      </div>
    </div>
  </div>
)}
{isMobile && openPopup === "cart" && (
  <div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50"
    role="dialog"
    aria-modal="true"
    onClick={(e) => {
      if (cartPopupRef.current && !cartPopupRef.current.contains(e.target)) {
        setOpenPopup(null);
      }
    }}
  >
    <div
      ref={cartPopupRef}
      id="cart-popup-mobile"
      className="relative w-full max-w-md h-full md:h-auto md:max-h-[80vh] bg-white rounded-t-xl md:rounded-xl shadow-xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <CartPopup 
        onClose={() => setOpenPopup(null)}
        onViewCart={() => {
          navigate("/cart");
          setOpenPopup(null);
        }}
        onCheckout={() => {
          navigate("/checkout");
          setOpenPopup(null);
        }}
      />
    </div>
  </div>
)}

      {isMobile && openPopup === "profile" && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center px-3 sm:px-4 bg-black "
          role="dialog"
          aria-modal="true"
        >
          <div 
            ref={profilePopupRef}
            id="profile-popup-mobile"
            className=" rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm max-h-[80vh] sm:max-h-[85vh] overflow-y-auto overflow-x-hidden p-3 sm:p-4 relative break-words"
          >
            <button
              onClick={() => setOpenPopup(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold z-10 p-1 rounded-full hover:bg-gray-100 touch-manipulation"
              aria-label="Close profile"
              type="button"
            >
              &times;
            </button>
            <Profiledropdown />
          </div>
        </div>
      )}

      {/* DESKTOP POPUPS - improved responsive positioning */}
     {!isMobile && openPopup === "wishlist" && isAuthenticated && (
  <div
    ref={wishlistPopupRef}
    id="wishlist-popup"
    className="absolute top-16 md:top-20 lg:top-24 right-2 md:right-6 z-[150] bg-white border rounded-md shadow-lg w-72 md:w-80 lg:w-96 max-h-[70vh] overflow-hidden"
    role="dialog"
    aria-modal="true"
  >
    <div className="p-4 border-b flex justify-between items-center bg-gray-50">
      <h2 className="text-xl font-bold">Your Wishlist</h2>
      <button
        onClick={() => setOpenPopup(null)}
        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div className="overflow-y-auto h-[calc(100%-120px)] p-4">
      <Wishlist />
    </div>
    <div className="border-t p-4 bg-gray-50">
      <button
        onClick={handleViewWishlist}
        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors font-medium"
      >
        View Full Wishlist
      </button>
    </div>
  </div>
)}
      {!isMobile && openPopup === "cart" && (
  <div
    ref={cartPopupRef}
    id="cart-popup"
    className="absolute top-16 md:top-20 lg:top-24 right-2 md:right-6 z-[150] bg-white border rounded-md shadow-lg w-72 md:w-80 lg:w-96 max-h-[70vh] overflow-y-auto"
    role="dialog"
    aria-modal="true"
  >
    <CartPopup 
      onClose={() => setOpenPopup(null)}
      onViewCart={() => {
        navigate("/cart");
        setOpenPopup(null);
      }}
      onCheckout={() => {
          
        navigate("/checkout");
        setOpenPopup(null);
      }}
    />
  </div>
)}
      {!isMobile && openPopup === "profile" && (
        <div
          ref={profilePopupRef}
          id="profile-popup"
          className="absolute top-16 md:top-20 lg:top-24 right-2 md:right-6 lg:right-10 z-[150] bg-white border rounded-md shadow-lg w-64 md:w-auto max-h-[400px] md:max-h-[500px] overflow-y-auto overflow-hidden break-words"
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