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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate=useNavigate()
  const handleclick=()=>{
    navigate("/")
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const categoryButtonRef = useRef(null);
  const profileRef = useRef(null);
  const cartRef = useRef(null);

  const items = useSelector((state) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target !== categoryButtonRef.current
      ) {
        setIsDropdownOpen(false);
      }

      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Mobile menu toggle"]')
      ) {
        setIsMobileMenuOpen(false);
      }

      if (
        showProfileDropdown &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(true);
      }

      if (
        showCartDropdown &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        setShowCartDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen, showProfileDropdown, showCartDropdown]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
    setIsDropdownOpen(false);
    console.log("Selected category:", category.value);
  };

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
        <div className="sm:hidden">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <img onClick={handleclick} src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            </div>

            <button
              aria-label="Mobile menu toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2  rounded-md text-gray-700 hover:text-gray-900 hover:bg-blue-300 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>

          <div className="pb-3">
            <div className="relative">
              <div className={`flex items-center bg-white rounded-lg shadow-md ${isDropdownOpen ? 'overflow-visible' : 'overflow-hidden'}`}>
                <input
                  className="flex-1 px-3 py-2 text-sm outline-none placeholder-gray-500"
                  type="text"
                  placeholder="Find your perfect style..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />

                <div className="relative" ref={dropdownRef}>
                  <button
                    ref={categoryButtonRef}
                    onClick={handleDropdownToggle}
                    className="flex items-center gap-1 bg-yellow-200 px-3 py-2 text-sm font-medium hover:bg-yellow-300 transition-colors duration-200 whitespace-nowrap"
                  >
                    <span className="truncate max-w-20">
                      {selectedCategory === "All Categories" ? "Category" : selectedCategory}
                    </span>
                    <IoMdArrowDropdownCircle className={`text-lg transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <ul className="absolute top-full mt-1 right-0 w-48 bg-white border rounded-md shadow-lg z-[110] max-h-60 overflow-y-auto">
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-150 ${selectedCategory === category.name ? "bg-blue-50 text-blue-600" : ""}`}
                          onClick={() => handleCategorySelect(category)}
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
                >
                  <IoIosSearch className="h-5 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={mobileMenuRef}
            className={`${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-in-out bg-blue-300`}
          >
            <div className="pb-4">
              <div className="flex justify-center gap-8 pt-2">
                <button className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <AiOutlineHeart className="h-6 w-6" />
                  <span className="text-xs font-medium">Wishlist</span>
                </button>
                <div className="relative" ref={cartRef}>
                  <button
                    onClick={() => setShowCartDropdown((prev) => !prev)}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
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
                  {showCartDropdown && (
                    <div className="absolute top-12 right-0 z-50">
                      <CartPopup />
                    </div>
                  )}
                </div>
                <button onClick={()=>setShowProfileDropdown((prev)=>!prev)} className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <CgProfile className="h-6 w-6" />
                  <span className="text-xs font-medium">Profile</span>
                </button>
                  {showProfileDropdown && (
    <div className="absolute top-12 right-0 z-50">
      <Profiledropdown />
    </div>
  )}
              </div>
            </div>
          </div>
        </div>
        {/* desktop-------------------------------------------------------------------->>>>>>>>>>>>>>>> */}

        <div className="hidden sm:flex sm:items-center justify-between py-4">
          <div className="flex items-center flex-shrink-0">
            <img onClick={handleclick} className="h-12 w-12 lg:h-16 lg:w-16 rounded-full object-cover" src={logo} alt="Logo" />
          </div>

          <div className="flex items-center flex-1 max-w-md lg:max-w-lg xl:max-w-2xl mx-6">
            <div className="flex relative items-center flex-1 bg-white rounded-l-lg overflow-hidden">
              <p className="relative flex items-center justify-center ml-2 hover:text-red-600 text-cyan-600 font-bold text-2xl">
                <MdMic />
              </p>
              <input
                className="flex-1 px-4 py-2 lg:py-3 text-sm lg:text-base outline-none placeholder-gray-500"
                type="text"
                placeholder="Find your perfect style..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                ref={categoryButtonRef}
                onClick={handleDropdownToggle}
                className="flex items-center gap-2 bg-yellow-200 px-4 py-2 lg:py-3 text-sm lg:text-base font-medium hover:bg-yellow-300 hover:scale-105 transition-all duration-200 whitespace-nowrap min-w-[140px] justify-between"
              >
                <span className="truncate">{selectedCategory === "All Categories" ? "Category" : selectedCategory}</span>
                <IoMdArrowDropdownCircle className={`text-lg lg:text-xl transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <ul className="absolute top-full mt-2 right-0 bg-white border rounded-md shadow-lg z-[110] w-48 lg:w-56 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className={`px-4 py-2 lg:py-3 hover:bg-gray-100 cursor-pointer text-sm lg:text-base font-medium transition-colors duration-150 touch-manipulation ${selectedCategory === category.name ? "bg-blue-50 text-blue-600" : ""}`}
                      onClick={() => handleCategorySelect(category)}
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
            >
              Search
            </button>
          </div>

          <div className="flex gap-4 lg:gap-6 flex-shrink-0">
            <button className="flex flex-col items-center gap-1 text-gray-700 transition-colors duration-200" title="Wishlist">
              <AiOutlineHeart className="h-6 w-6 lg:h-7 lg:w-7" />
              <span className="text-xs lg:text-sm font-medium">Wishlist</span>
            </button>
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setShowCartDropdown((prev) => !prev)}
                className="flex flex-col items-center gap-1 text-gray-700 transition-colors duration-200"
                title="Cart"
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
              {showCartDropdown && (
                <div className="absolute top-12 right-0 z-50">
                  <CartPopup />
                </div>
              )}
            </div>
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileDropdown((prev) => !prev)}
                className="flex flex-col items-center gap-1 text-gray-700 transition-colors duration-200"
                title="Profile"
              >
                <CgProfile className="h-6 w-6 lg:h-7 lg:w-7" />
                <span className="text-xs lg:text-sm font-medium">Profile</span>
              </button>

              {showProfileDropdown && (
                <div className="absolute top-12 right-0 z-50">
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