import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCartAdd } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when screen size changes
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
      console.log("Searching for:", searchValue);
      // Add your search logic here
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const categories = [
    { name: "T-Shirts", value: "tshirts" },
    { name: "Shirts", value: "shirts" },
    { name: "Jeans", value: "jeans" },
    { name: "Hoodies", value: "hoodies" },
    { name: "Accessories", value: "accessories" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Mobile Layout */}
        <div className="sm:hidden">
          {/* Top row - Logo and Menu Toggle */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <img
                src="https://sdmntprwestus3.oaiusercontent.com/files/00000000-2648-61fd-bf46-440664016bbb/raw?se=2025-07-10T09%3A52%3A58Z&sp=r&sv=2024-08-04&sr=b&scid=46fae348-dd0d-54c2-a324-e5475646afb6&skoid=30ec2761-8f41-44db-b282-7a0f8809659b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-09T20%3A27%3A16Z&ske=2025-07-10T20%3A27%3A16Z&sks=b&skv=2024-08-04&sig=U/FNzKY93O3bm1uIPrf7CNhZT1L7NYOgZuIU72sD0jc%3D"
                alt="Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="ml-2 text-lg font-bold text-gray-800">StyleHub</span>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-blue-300 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
            <div className="pb-4 space-y-3">
              {/* Search Bar */}
              <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
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
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1 bg-yellow-200 px-3 py-2 text-sm font-medium hover:bg-yellow-300 transition-colors duration-200"
                  >
                    Category
                    <IoMdArrowDropdownCircle className="text-lg" />
                  </button>
                  
                  {isDropdownOpen && (
                    <ul className="absolute top-full mt-1 right-0 bg-white border rounded-md shadow-lg z-50 w-40">
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-medium transition-colors duration-150"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            console.log("Selected category:", category.value);
                          }}
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
                  <IoIosSearch className="h-4 w-4" />
                </button>
              </div>

              {/* Action Icons */}
              <div className="flex justify-center gap-8 pt-2">
                <button className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <AiOutlineHeart className="h-6 w-6" />
                  <span className="text-xs font-medium">Wishlist</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <BiCartAdd className="h-6 w-6" />
                  <span className="text-xs font-medium">Cart</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <CgProfile className="h-6 w-6" />
                  <span className="text-xs font-medium">Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex sm:items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              className="h-12 w-12 lg:h-16 lg:w-16 rounded-full object-cover"
              src="https://sdmntprwestus3.oaiusercontent.com/files/00000000-2648-61fd-bf46-440664016bbb/raw?se=2025-07-10T09%3A52%3A58Z&sp=r&sv=2024-08-04&sr=b&scid=46fae348-dd0d-54c2-a324-e5475646afb6&skoid=30ec2761-8f41-44db-b282-7a0f8809659b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-09T20%3A27%3A16Z&ske=2025-07-10T20%3A27%3A16Z&sks=b&skv=2024-08-04&sig=U/FNzKY93O3bm1uIPrf7CNhZT1L7NYOgZuIU72sD0jc%3D"
              alt="Logo"
            />
            <span className="ml-3 text-xl lg:text-2xl font-bold text-gray-800">StyleHub</span>
          </div>

          {/* Search Section */}
          <div className="flex items-center flex-1 max-w-md lg:max-w-lg xl:max-w-2xl mx-6">
            <div className="flex items-center flex-1 bg-white rounded-l-lg shadow-md overflow-hidden">
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
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-yellow-200 px-4 py-2 lg:py-3 text-sm lg:text-base font-medium hover:bg-yellow-300 hover:scale-105 transition-all duration-200 whitespace-nowrap"
              >
                Category
                <IoMdArrowDropdownCircle className="text-lg lg:text-xl" />
              </button>

              {isDropdownOpen && (
                <ul className="absolute top-full mt-2 right-0 bg-white border rounded-md shadow-lg z-50 w-40 lg:w-48">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 lg:py-3 hover:bg-gray-100 cursor-pointer text-sm lg:text-base font-medium transition-colors duration-150"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        console.log("Selected category:", category.value);
                      }}
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

          {/* Action Icons */}
          <div className="flex gap-4 lg:gap-6 flex-shrink-0">
            <button 
              className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              title="Wishlist"
            >
              <AiOutlineHeart className="h-6 w-6 lg:h-7 lg:w-7" />
              <span className="text-xs lg:text-sm font-medium">Wishlist</span>
            </button>
            <button 
              className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              title="Cart"
            >
              <BiCartAdd className="h-6 w-6 lg:h-7 lg:w-7" />
              <span className="text-xs lg:text-sm font-medium">Cart</span>
            </button>
            <button 
              className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              title="Profile"
            >
              <CgProfile className="h-6 w-6 lg:h-7 lg:w-7" />
              <span className="text-xs lg:text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;