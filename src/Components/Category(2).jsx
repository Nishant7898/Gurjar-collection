import React, { useState, useEffect, useRef } from "react";
import { ImMenu } from "react-icons/im";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { BiMale, BiFemale } from "react-icons/bi";
import { MdOutlineFiberNew } from "react-icons/md";
import { TbFlame } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";

const Category = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryDropdownOpen, setIsMobileCategoryDropdownOpen] = useState(false);
  const [isDesktopCategoryDropdownOpen, setIsDesktopCategoryDropdownOpen] = useState(false);

  const mobileDropdownRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleclick = () => navigate("/men");
  const handleclick2 = () => navigate("/Women");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileCategoryDropdownOpen(false);
      }

      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setIsDesktopCategoryDropdownOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
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
    setIsMobileCategoryDropdownOpen((prev) => !prev);
  };

  const toggleDesktopCategoryDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDesktopCategoryDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen((prev) => !prev);
    if (isMobileMenuOpen) setIsMobileCategoryDropdownOpen(false);
  };

  return (
    <div className="mt-23 mb-2.5 sm:mt-20 md:mt-28 lg:mt-23 w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-md px-4 backdrop-blur-sm relative z-50">

      {/* Mobile Layout */}
      <div className="md:hidden py-5" ref={mobileMenuRef}>
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Mobile Menu"
          className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
          type="button"
        >
          <div className="flex items-center gap-3">
            <ImMenu className="text-lg text-purple-600" />
            <span className="font-bold text-gray-800 text-lg">Menu</span>
          </div>
          {isMobileMenuOpen ? (
            <HiChevronUp className="text-xl text-purple-600 transition-transform duration-300" />
          ) : (
            <HiChevronDown className="text-xl text-purple-600 transition-transform duration-300" />
          )}
        </button>

        {/* Mobile Menu Content with smooth max-height transition */}
        <div
          className={`mt-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-xl transition-[max-height_opacity_padding] duration-500 ease-in-out border border-gray-100 overflow-hidden
            ${isMobileMenuOpen ? "max-h-96 opacity-100 p-6 space-y-4" : "max-h-0 opacity-0 p-0"}`}
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Category Dropdown */}
          <div className="relative" ref={mobileDropdownRef}>
            <button
              onClick={toggleMobileCategoryDropdown}
              className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-200 hover:border-purple-300"
              type="button"
            >
              <div className="flex items-center gap-3">
                <ImMenu className="text-lg text-purple-600" />
                <span className="font-semibold text-gray-800">Categories</span>
              </div>
              <IoMdArrowDropdownCircle className="text-xl text-purple-600" />
            </button>

            {isMobileCategoryDropdownOpen && (
              <ul className="mt-3 w-full bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="px-5 py-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 cursor-pointer font-semibold text-gray-700 border-b border-gray-100 last:border-b-0 transition-all duration-200 hover:text-purple-600"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Gender Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleclick}
              className="flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-blue-200 hover:border-blue-300"
              type="button"
            >
              <BiMale className="text-xl text-blue-600" />
              <span className="font-semibold text-gray-800">MEN</span>
            </button>
            <button
              onClick={handleclick2}
              className="flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-pink-200 hover:border-pink-300"
              type="button"
            >
              <BiFemale className="text-xl text-pink-600" />
              <span className="font-semibold text-gray-800">WOMEN</span>
            </button>
          </div>

          {/* Other Buttons */}
          <button className="flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full relative border border-red-200 hover:border-red-300" type="button">
            <span className="font-semibold text-gray-800">NEW ARRIVAL</span>
            <MdOutlineFiberNew className="text-xl text-red-500 animate-pulse absolute -top-1 -right-1" />
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full border border-amber-200 hover:border-amber-300" type="button">
            <TbFlame className="text-xl text-amber-500" />
            <span className="font-semibold text-gray-800">OFFERS</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full border border-green-200 hover:border-green-300" type="button">
            <FaShippingFast className="text-xl text-green-600" />
            <span className="font-semibold text-gray-800">TRACK ORDER</span>
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full border border-gray-200 hover:border-gray-300" type="button">
            <CgProfile className="text-xl text-gray-600" />
            <span className="font-semibold text-gray-800">LOGIN / REGISTER</span>
          </button>
        </div>
      </div>

       {/* Desktop Layout  */}
          <div className="hidden md:flex md:items-center bg-white justify-center gap-3 lg:gap-4 xl:gap-6 py-6">
        {/* Category Dropdown */}
        <div className="relative" ref={desktopDropdownRef}>
          <button
            onClick={toggleDesktopCategoryDropdown}
            className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-white to-gray-50 hover:from-purple-50 hover:to-indigo-50 hover:scale-105 duration-300 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-purple-300"
          >
            <ImMenu className="text-lg text-purple-600" />
            <span className="font-semibold text-gray-800">Categories</span>
            <IoMdArrowDropdownCircle className="text-xl text-purple-600" />
          </button>


          {isDesktopCategoryDropdownOpen && (
            <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-200 outline-none rounded-xl shadow-2xl z-50 w-48 max-h-60 overflow-y-auto">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="px-5 py-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 cursor-pointer font-semibold text-gray-700 border-b border-gray-100 last:border-b-0 transition-all duration-200 hover:text-purple-600"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>


        {/* Other Buttons */}
        <button onClick={handleclick} className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-blue-100 hover:scale-105 duration-300 rounded-xl shadow-lg hover:shadow-xl transition-all border border-blue-200 hover:border-blue-300">
          <BiMale className="text-xl lg:text-2xl text-blue-600" />
          <span className="font-semibold text-gray-800">MEN</span>
        </button>
        <button onClick={handleclick2} className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-white to-pink-50 hover:from-pink-50 hover:to-pink-100 hover:scale-105 duration-300 rounded-xl shadow-lg hover:shadow-xl transition-all border border-pink-200 hover:border-pink-300">
          <BiFemale className="text-xl lg:text-2xl text-pink-600" />
          <span className="font-semibold text-gray-800">WOMEN</span>
        </button>
        <button className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-white to-red-50 hover:from-red-50 hover:to-orange-50 hover:scale-105 duration-300 rounded-xl shadow-lg hover:shadow-xl transition-all relative border border-red-200 hover:border-red-300">
          <span className="font-semibold text-gray-800">NEW ARRIVAL</span>
          <MdOutlineFiberNew className="text-red-500 animate-bounce text-2xl absolute -top-2 -right-2" />
        </button>
        <button className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-white to-amber-50 hover:from-amber-50 hover:to-yellow-50 hover:scale-105 duration-300 rounded-xl shadow-lg hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300">
          <TbFlame className="text-xl lg:text-2xl text-amber-500" />
          <span className="font-semibold text-gray-800">OFFERS</span>
        </button>
        <button className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-emerald-50 hover:scale-105 duration-300 rounded-xl shadow-lg hover:shadow-xl transition-all border border-green-200 hover:border-green-300">
          <FaShippingFast className="text-xl lg:text-2xl text-green-600" />
          <span className="font-semibold text-gray-800">TRACK ORDER</span>
        </button>
        <button className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-slate-50 hover:scale-105 duration-300 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-gray-300">
          <CgProfile className="text-xl lg:text-2xl text-gray-600" />
          <span className="font-semibold text-gray-800">LOGIN / REGISTER</span>
        </button>
      </div>
    </div>
  );
};


export default Category;
