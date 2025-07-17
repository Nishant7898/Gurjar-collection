import React from "react";
import { HiShoppingCart } from "react-icons/hi2";

const Midbanner = () => {
  return (
    <div className="h-auto relative mt-6 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 py-6 sm:py-8 lg:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-center justify-center min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
          
          {/* Left Image */}
          <div className="relative group w-full lg:w-auto flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
            <img
              src="https://stockmarket360.in/wp-content/uploads/2019/06/Aditya-Birla-Fashion-goes-Desi-enters-into-Branded-Ethnic-Market-Acquires-Jaypore.jpg"
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-[160px] xs:h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] object-cover hover:scale-95 duration-500 transition-all rounded-2xl shadow-2xl border border-gray-200 group-hover:shadow-3xl mx-auto"
              alt="Fashion banner"
            />
          </div>

          {/* Center Button */}
          <div className="relative flex-shrink-0 order-first lg:order-none">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-30 animate-pulse"></div>
            <button className="relative px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 items-center text-center flex gap-2 sm:gap-3 text-white hover:text-gray-100 hover:bg-gradient-to-r hover:from-black hover:to-gray-900 hover:scale-105 lg:hover:scale-110 duration-500 transition-all font-bold outline-none bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-2xl border border-red-400 hover:border-gray-700 hover:shadow-3xl whitespace-nowrap">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl">Shop Now</span>
              <HiShoppingCart className="text-lg sm:text-xl md:text-2xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-20 rounded-2xl"></div>
            </button>
          </div>

          {/* Right Image */}
          <div className="relative group w-full lg:w-auto flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
            <img
              src="https://www.shopforw.com/cdn/shop/files/Celebration_never_ends-banne.jpg?v=1750694451&width=3840"
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-[160px] xs:h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] object-cover hover:scale-95 duration-500 transition-all rounded-2xl shadow-2xl border border-gray-200 group-hover:shadow-3xl mx-auto"
              alt="Celebration banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Midbanner;