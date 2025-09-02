import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";

const banner = [
  "https://media.istockphoto.com/id/955641488/photo/clothes-shop-costume-dress-fashion-store-style-concept.jpg?s=2048x2048&w=is&k=20&c=8CBZ5nB9gJO1Y5rfsYx-xR4Lkb8TCHQz8BpHT5rm31c=",
  "https://media.istockphoto.com/id/1169378193/photo/stylish-female-choosing-outfit.jpg?s=2048x2048&w=is&k=20&c=UHXlbY0JNk7KBfg192MJ2Z1kxhoEN0Hgc3z-JvTcK4I=",
  "https://media.istockphoto.com/id/678698298/photo/group-of-modern-young-people-males-and-females-posing-in-studio-in-latest-casual-clothing.jpg?s=2048x2048&w=is&k=20&c=dMTI6CikEYvQhXMx4BDvI37OacnZ0pM2ZQyFzAUsM1s=",
];

const Largebanner = () => {
  const [horizontalIndex, setHorizontalIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHorizontalIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banner.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: nextIndex * scrollRef.current.clientWidth,
            behavior: "smooth",
          });
        }
        return nextIndex;
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (dir) => {
    const total = banner.length;
    let newIndex = horizontalIndex;
    if (dir === "left") {
      newIndex = horizontalIndex === 0 ? total - 1 : horizontalIndex - 1;
    } else {
      newIndex = (horizontalIndex + 1) % total;
    }
    setHorizontalIndex(newIndex);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: newIndex * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const bannerTexts = [
    {
      title: "Discover Fashion",
      subtitle: "Explore our premium clothing collection"
    },
    {
      title: "Style Redefined",
      subtitle: "Find your perfect outfit today"
    },
    {
      title: "Trendy Collection",
      subtitle: "Latest fashion trends for everyone"
    }
  ];

  return (
    <div
      className="h-[30vh] md:w-full sm:h-[60vh] sm:w-[60vw]  md:h-[100vh] lg:h-[80vh] xl:h-[600px] relative top-4 sm:top-6 md:top-8 lg:top-10 flex w-[100vw] overflow-hidden animate-hang transform transition-all duration-500 ease-in-out"
      ref={scrollRef}
    >
      {banner.map((item, index) => (
        <div
          key={index}
          className="h-full w-full flex items-center justify-center flex-shrink-0 relative"
        >
          <img
            src={item}
            loading="lazy"
            className="w-full   h-full object-cover"
            alt=""
          />
          
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Content Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
            {/* Banner Text */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl">
                {bannerTexts[index].title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-4 sm:mb-6 md:mb-8 drop-shadow-lg">
                {bannerTexts[index].subtitle}
              </p>
            </div>
            
            {/* Styled Button */}
            <button className="relative overflow-hidden bg-gradient-to-t from-[#d3af10ab] to to-[#b3c706] hover:bg-yellow-600 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-white font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-110 animate-bounce hover:animate-none shadow-2xl flex items-center gap-2 sm:gap-3 group/btn border-2 border-white/20">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
              
              {/* Pulse ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
              
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 tracking-wide">Shop Now!</span>
              
              {/* Arrow indicator */}
              <div className="relative z-10 ml-1 sm:ml-2 transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300">
                →
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Largebanner;