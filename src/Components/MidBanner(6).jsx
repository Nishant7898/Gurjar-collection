import React from "react";
import { HiShoppingCart } from "react-icons/hi2";

const images = [
  { img: "https://m.media-amazon.com/images/I/71SuXUcfWPL._UY1100_.jpg" },
];

const Midbanner = () => {
  return (
    <div className="h-1/2 relative mt-6 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 py-8">
      <div className="min-w-full flex gap-8 items-center min-h-[250px] w-[700px] pl-55 pr-55">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
          <img
            src="https://stockmarket360.in/wp-content/uploads/2019/06/Aditya-Birla-Fashion-goes-Desi-enters-into-Branded-Ethnic-Market-Acquires-Jaypore.jpg"
            className="relative h-[300px] hover:scale-95 duration-500 transition-all rounded-2xl shadow-2xl border border-gray-200 group-hover:shadow-3xl"
            alt=""
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-30 animate-pulse"></div>
          <button className="relative p-4 pl-6 pr-6 items-center text-center flex gap-3 text-white hover:text-gray-100 hover:bg-gradient-to-r hover:from-black hover:to-gray-900 hover:scale-110 duration-500 transition-all font-bold outline-none bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-2xl border border-red-400 hover:border-gray-700 hover:shadow-3xl">
            <span className="text-lg">Shop Now</span>
            <HiShoppingCart className="text-2xl animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-20 rounded-2xl"></div>
          </button>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
          <img
            src="https://www.shopforw.com/cdn/shop/files/Celebration_never_ends-banne.jpg?v=1750694451&width=3840"
            className="relative h-[300px] hover:scale-95 duration-500 transition-all rounded-2xl shadow-2xl border border-gray-200 group-hover:shadow-3xl"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Midbanner;