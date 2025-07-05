import React, { useState, useEffect } from "react";

const Hero = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const slogans = [
    "Discover Your Perfect Look ✨",
    "Elevate Everyday Style 👕",
    "Premium Fits for Men 💼",
    "Bold Looks, Soft Comfort 👞",
    "Classic Meets Modern 👔",
    "Effortless Style for Men 🧥",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSlogan((prev) => (prev + 1) % slogans.length);
        setIsVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  },);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Slogan Section */}
      <div className="text-center z-10 space-y-8 max-w-5xl mx-auto">
        <div className="h-20 flex items-center justify-center">
          <h3
            className={`text-xl sm:text-2xl lg:text-3xl font-medium text-gray-700 transition-all duration-500 transform tracking-wide font-sans ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {slogans[currentSlogan]}
          </h3>
        </div>
        <p className="text-slate-600 text-base sm:text-lg opacity-80 max-w-2xl mx-auto tracking-wider">
          Menswear • Casuals • Formals • Accessories
        </p>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-800 to-gray-800 font-sans tracking-tight leading-none mb-6 animate-shimmer">
          Collections For Men
        </h1>
        <div className="text-lg sm:text-xl text-gray-700 font-light mb-4 tracking-widest uppercase">
          Built For Men’s Fashion
        </div>

        {/* Features */}
        <div className="mt-6 flex justify-center space-x-8 text-sm sm:text-base text-gray-600 font-medium tracking-widest uppercase">
          <span className="border-b-2 border-blue-600 pb-1">Smart</span>
          <span className="text-blue-500">•</span>
          <span className="border-b-2 border-slate-500 pb-1">Comfort</span>
          <span className="text-slate-600">•</span>
          <span className="border-b-2 border-gray-500 pb-1">Style</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10">
          <button className="px-10 py-4 bg-slate-800 text-white font-semibold rounded-full shadow-lg hover:bg-slate-900 transition duration-300">
            🛍️ Shop Now
          </button>
          <button className="px-10 py-4 bg-white text-slate-800 border border-slate-300 font-semibold rounded-full shadow-md hover:bg-slate-100 transition duration-300">
            📘 Browse Catalog
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
