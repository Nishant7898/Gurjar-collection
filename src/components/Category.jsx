import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/Filterslice";

import Checkshirt from "../assets/Checkshirt.png.jpg";
import formalshirt from "../assets/FormalShirts.png.jpg";
import tshirt from "../assets/Tshirts.png.jpg";
import bottom from "../assets/Bottom.jpg.jpg";
import BottomwearData from "../data/Bottomweardata";
import Topweardata from "../data/Topweardata";
const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {/* Section Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium fashion essentials
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col min-h-screen w-full bg-gray-50">
        {/* First Row */}
        <div className="flex flex-col lg:flex-row h-auto lg:h-screen w-full gap-4 p-4">
          {/* Checked Shirts */}
          <div className="h-96 lg:h-full w-full lg:w-1/2 relative overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up rounded-2xl">
            <img
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              src={Checkshirt}
              alt="Checked Shirts"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-gray-800">
                TRENDING
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <div className="text-center">
                <h3 className="text-white font-bold text-3xl sm:text-4xl mb-4 font-serif tracking-wide">
                  Checked Shirts
                </h3>
                <p className="text-white/90 text-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Classic patterns, modern fits
                </p>
                <button
                  onClick={() => {
                    dispatch(setCategory("CategoryName"));
                    navigate("/category/path");
                  }}
                  className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Formal Shirts */}
          <div className="h-96 lg:h-full w-full lg:w-1/2 relative overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up delay-200 rounded-2xl">
            <img
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              src={formalshirt}
              alt="Formal Shirts"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-gray-800">
                PREMIUM
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <div className="text-center">
                <h3 className="text-white font-bold text-3xl sm:text-4xl mb-4 font-serif tracking-wide">
                  Formal Shirts
                </h3>
                <p className="text-white/90 text-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Professional elegance redefined
                </p>
                <button
                  onClick={() => {
                    dispatch(setCategory("Formal-Shirts"));
                    navigate("/category/path");
                  }}
                  className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col lg:flex-row h-auto lg:h-screen w-full gap-4 p-4">
          {/* T-shirts */}
          <div className="h-96 lg:h-full w-full lg:w-1/2 relative overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up delay-400 rounded-2xl">
            <img
              src={tshirt}
              alt="T-shirts"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-gray-800">
                CASUAL
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <div className="text-center">
                <h3 className="text-white font-bold text-3xl sm:text-4xl mb-4 font-serif tracking-wide">
                  T-Shirts
                </h3>
                <p className="text-white/90 text-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Comfort meets style
                </p>
                <button
                  onClick={() => {
                    dispatch(setCategory("T-Shirts"));
                    navigate("/category/tshirts");
                  }}
                  className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Wear */}
          <div className="h-96 lg:h-full w-full lg:w-1/2 relative overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up delay-600 rounded-2xl">
            <img
              src={bottom}
              alt="Bottom Wear"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-gray-800">
                ESSENTIAL
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <div className="text-center">
                <h3 className="text-white font-bold text-3xl sm:text-4xl mb-4 font-serif tracking-wide">
                  Bottom Wear
                </h3>
                <p className="text-white/90 text-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Perfect fit, endless possibilities
                </p>
                <button
                  onClick={() => {
                    dispatch(setCategory("Bottomwear"));
                    navigate("/category/Bottomwear");
                  }}
                  className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Style?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who've upgraded their wardrobe
            with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-rose-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              View All Products
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-rose-500 transition-colors duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </>
  );
};

export default Category;
