import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { ImMenu } from "react-icons/im";
import { TbFlame } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineFiberNew } from "react-icons/md";
import { BiMale } from "react-icons/bi";
import { BiFemale } from "react-icons/bi";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
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
    setIsOpen(false);
    console.log("Selected category:", category.value);
  };

  const handleCategoryToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 w-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm">
      
      {/* Mobile Layout */}
      <div className="md:hidden px-4 py-4">
        
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
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

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
          <div className="mt-4 space-y-3">
            
            {/* Category Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleCategoryToggle}
                onTouchStart={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <ImMenu className="text-lg text-gray-600" />
                  <span className="font-medium text-gray-800">Categories</span>
                </div>
                <IoMdArrowDropdownCircle className="text-xl text-gray-600" />
              </button>

              {isOpen && (
                <ul className="absolute top-full left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer font-medium text-gray-700 transition-colors duration-150 border-b border-gray-100 last:border-b-0 touch-manipulation"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Mobile Menu Items */}
            <div className="grid grid-cols-1 gap-3">
              
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
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                <MdOutlineFiberNew className="text-xl text-red-500 animate-pulse" />
                <span className="font-medium text-gray-800">NEW ARRIVAL</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                <TbFlame className="text-xl text-amber-500" />
                <span className="font-medium text-gray-800">OFFERS</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                <FaShippingFast className="text-xl text-green-600" />
                <span className="font-medium text-gray-800">TRACK ORDER</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                <CgProfile className="text-xl text-gray-600" />
                <span className="font-medium text-gray-800">LOGIN / REGISTER</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:items-center justify-center gap-3 lg:gap-4 xl:gap-6 px-4 py-4">
        
        {/* Category Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleCategoryToggle}
            className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <ImMenu className="text-lg text-gray-600" />
            <span className="font-medium text-gray-800 whitespace-nowrap">Categories</span>
            <IoMdArrowDropdownCircle className="text-xl text-gray-600" />
          </button>

          {isOpen && (
            <ul className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-50 w-48 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer font-medium text-gray-700 transition-colors duration-150 border-b border-gray-100 last:border-b-0 touch-manipulation"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* MEN Button */}
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <BiMale className="text-xl lg:text-2xl text-blue-600" />
          <span className="font-medium text-gray-800 whitespace-nowrap">MEN</span>
        </button>

        {/* WOMEN Button */}
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <BiFemale className="text-xl lg:text-2xl text-pink-600" />
          <span className="font-medium text-gray-800 whitespace-nowrap">WOMEN</span>
        </button>

        {/* New Arrival */}
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <MdOutlineFiberNew className="text-xl lg:text-2xl text-red-500 animate-pulse" />
          <span className="font-medium text-gray-800 whitespace-nowrap">NEW ARRIVAL</span>
        </button>

        {/* Offers */}
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <TbFlame className="text-xl lg:text-2xl text-amber-500" />
          <span className="font-medium text-gray-800 whitespace-nowrap">OFFERS</span>
        </button>

        {/* Order Track */}
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <FaShippingFast className="text-xl lg:text-2xl text-green-600" />
          <span className="font-medium text-gray-800 whitespace-nowrap text-sm lg:text-base">TRACK ORDER</span>
        </button>

        {/* Login/Register */}
        <button className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-white hover:bg-gray-100 hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg transition-all">
          <CgProfile className="text-xl lg:text-2xl text-gray-600" />
          <span className="font-medium text-gray-800 whitespace-nowrap text-sm lg:text-base">LOGIN / REGISTER</span>
        </button>
      </div>
    </div>
  );
};

export default Category;