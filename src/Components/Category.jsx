import React, { useState, useEffect, useRef } from "react";
import { ImMenu } from "react-icons/im";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { BiMale, BiFemale } from "react-icons/bi";
import { MdOutlineFiberNew } from "react-icons/md";
import { TbFlame } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Category = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryDropdownOpen, setIsMobileCategoryDropdownOpen] =
    useState(false);
  const [isDesktopCategoryDropdownOpen, setIsDesktopCategoryDropdownOpen] =
    useState(false);

  const mobileDropdownRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Mobile dropdown
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setIsMobileCategoryDropdownOpen(false);
      }

      // Desktop dropdown
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target)
      ) {
        setIsDesktopCategoryDropdownOpen(false);
      }

      // Mobile menu - fixed logic
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        setIsMobileCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Close mobile menu on resize if desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsMobileCategoryDropdownOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    { name: "T-Shirts", value: "tshirts" },
    { name: "Shirts", value: "shirts" },
    { name: "Jeans", value: "jeans" },
    { name: "Hoodies", value: "hoodies" },
    { name: "Jackets", value: "jackets" },
    { name: "Accessories", value: "accessories" },
  ];

  const handleCategorySelect = (category) => {
    setIsMobileCategoryDropdownOpen(false);
    setIsDesktopCategoryDropdownOpen(false);
    console.log("Selected category:", category.value);
  };

  const toggleMobileCategoryDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileCategoryDropdownOpen(!isMobileCategoryDropdownOpen);
  };

  const toggleDesktopCategoryDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDesktopCategoryDropdownOpen(!isDesktopCategoryDropdownOpen);
  };

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close dropdown when closing menu
    if (isMobileMenuOpen) {
      setIsMobileCategoryDropdownOpen(false);
    }
  };

  return (
    <div className=" mt-30 sm:mt-20 md:mt-28 lg:mt-32 w-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm px-4">
      {/* Mobile Layout */}
      <div className="md:hidden" ref={mobileMenuRef}>
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Mobile Menu"
          className="w-full flex  items-center justify-between px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center gap-2">
            <ImMenu className="text-lg text-gray-600" />
            <span className="font-semibold text-gray-800">Menu</span>
          </div>
          {isMobileMenuOpen ? (
            <HiChevronUp className="text-xl text-gray-600" />
          ) : (
            <HiChevronDown className="text-xl text-gray-600" />
          )}
        </button>

        {/* Mobile Menu Content */}
        <div
          className={`mt-4 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 p-4 space-y-4"
              : "max-h-0 opacity-0 overflow-hidden p-0"
          }`}
        >
          {/* Category Dropdown */}
          <div className="relative" ref={mobileDropdownRef}>
            <button
              onClick={toggleMobileCategoryDropdown}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg shadow-inner hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <ImMenu className="text-lg text-gray-600" />
                <span className="font-medium text-gray-800">Categories</span>
              </div>
              <IoMdArrowDropdownCircle className="text-xl text-gray-600" />
            </button>

            {isMobileCategoryDropdownOpen && (
              <ul className="mt-2 w-full bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer font-medium text-gray-700 border-b border-gray-100 last:border-b-0"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Gender Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
              <BiMale className="text-xl text-blue-600" />
              <span className="font-medium text-gray-800">MEN</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
              <BiFemale className="text-xl text-pink-600" />
              <span className="font-medium text-gray-800">WOMEN</span>
            </button>
          </div>

          {/* Other Buttons */}
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-full relative">
            <span className="font-medium text-gray-800">NEW ARRIVAL</span>
            <MdOutlineFiberNew className="text-xl text-red-500 animate-pulse absolute -top-1 -right-1" />
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-full">
            <TbFlame className="text-xl text-amber-500" />
            <span className="font-medium text-gray-800">OFFERS</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-full">
            <FaShippingFast className="text-xl text-green-600" />
            <span className="font-medium text-gray-800">TRACK ORDER</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-full">
            <CgProfile className="text-xl text-gray-600" />
            <span className="font-medium text-gray-800">LOGIN / REGISTER</span>
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:items-center justify-center gap-3 lg:gap-4 xl:gap-6 py-4">
        {/* Category Dropdown */}
        <div className="relative" ref={desktopDropdownRef}>
          <button
            onClick={toggleDesktopCategoryDropdown}
            className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <ImMenu className="text-lg text-gray-600" />
            <span className="font-medium text-gray-800">Categories</span>
            <IoMdArrowDropdownCircle className="text-xl text-gray-600" />
          </button>

          {isDesktopCategoryDropdownOpen && (
            <ul className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-50 w-48 max-h-60 overflow-y-auto">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer font-medium text-gray-700 border-b border-gray-100 last:border-b-0"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Other Buttons */}
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <BiMale className="text-xl lg:text-2xl text-blue-600" />
          <span className="font-medium text-gray-800">MEN</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <BiFemale className="text-xl lg:text-2xl text-pink-600" />
          <span className="font-medium text-gray-800">WOMEN</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all relative">
          <span className="font-medium text-gray-800">NEW ARRIVAL</span>
          <MdOutlineFiberNew className="text-red-500 animate-bounce text-2xl absolute -top-2 -right-2" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <TbFlame className="text-xl lg:text-2xl text-amber-500" />
          <span className="font-medium text-gray-800">OFFERS</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <FaShippingFast className="text-xl lg:text-2xl text-green-600" />
          <span className="font-medium text-gray-800">TRACK ORDER</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <CgProfile className="text-xl lg:text-2xl text-gray-600" />
          <span className="font-medium text-gray-800">LOGIN / REGISTER</span>
        </button>
      </div>
    </div>
  );
};

export default Category;