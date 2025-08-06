import React, { useEffect, useRef, useState } from "react";

const images1 = [
  "https://cmsimages.shoppersstop.com/Wrogn_web_7cefbb23f5/Wrogn_web_7cefbb23f5.png",
  "https://cmsimages.shoppersstop.com/USPA_web_dfb93d3559/USPA_web_dfb93d3559.png",
  "https://cmsimages.shoppersstop.com/Allen_Solly_web_165bc881b4/Allen_Solly_web_165bc881b4.png",
  "https://cmsimages.shoppersstop.com/jeans_web_5f73a85a24/jeans_web_5f73a85a24.png",
];

const images2 = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/af_pc_1x._CB792409181_.jpg",
  "https://cdn.dribbble.com/userupload/10866321/file/original-117dd32f2ec57d55305d528be0fc170b.jpg?resize=1504x1034&vertical=center",
  "https://img.freepik.com/premium-vector/colorful-big-sale-banner-design_8499-254.jpg",
  "https://i.fbcd.co/products/resized/resized-750-500/dff0bca857016f16cdbeee90df63ca85a71d720995c927c584fc9642ad4bb49e.jpg",
];

const images3 = [
  "https://wforwoman.com/cdn/shop/files/Curation_-4_1.jpg?v=1750144510&width=535",
  "https://media.istockphoto.com/id/494854447/photo/fashion-shop-window-with-mannequin-with-red-sign-50-off.jpg?s=612x612&w=is&k=20&c=iZvhV09M7ZIetoUGcPxb5L6EoZ2LDzXUQwK_97eSUDo=",
];

const images4 = [
  "https://cdn.dribbble.com/userupload/30977009/file/original-d565eede788dd39f637feca93807f0a6.jpg?resize=1200x800&vertical=center",
  "https://media.istockphoto.com/id/1271568102/photo/a-banner-in-a-clothing-store-informing-about-the-ongoing-sale-hanging-on-a-brick-wall-and.jpg?s=1024x1024&w=is&k=20&c=hHMA_UfFt1NWoHKfRsOrlmUNAIvE6MwLx3nAs8qkfqw=",
];

const images5 = [
  "https://s7ap1.scene7.com/is/image/adityabirlafashion/LP_Hero%20Banner-FTOS-formals-%20M?resMode=sharp2&wid=375&hei=414",
  "https://celio.in/cdn/shop/files/EOSS_Banner_3.0_Mobile.jpg?v=1748585716",
];

const Hero = () => {
  // Existing states
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [isTransitioning1, setIsTransitioning1] = useState(false);
  const [direction1, setDirection1] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning1(true);
      setCurrentIndex1((prev) => {
        const next = prev + direction1;
        if (next >= images1.length) {
          setDirection1(-1);
          return prev - 1;
        } else if (next < 0) {
          setDirection1(1);
          return prev + 1;
        }
        return next;
      });
      setTimeout(() => setIsTransitioning1(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, [direction1]);

  const [horizontalIndex, setHorizontalIndex] = useState(0);
  const scrollRef = useRef(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHorizontalIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images2.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: nextIndex * scrollRef.current.clientWidth,
            behavior: "smooth",
          });
        }
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (dir) => {
    const total = images2.length;
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

  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [isTransitioning3, setIsTransitioning3] = useState(false);
  const [direction3, setDirection3] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning3(true);
      setCurrentIndex3((prev) => {
        const next = prev + direction3;
        if (next >= images3.length) {
          setDirection3(-1);
          return prev - 1;
        } else if (next < 0) {
          setDirection3(1);
          return prev + 1;
        }
        return next;
      });
      setTimeout(() => setIsTransitioning3(false), 2000);
    }, 3000);
    return () => clearInterval(interval);
  }, [direction3]);

  const [currentIndex4, setCurrentIndex4] = useState(0);
  const [isTransitioning4, setIsTransitioning4] = useState(false);
  const [direction4, setDirection4] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning4(true);
      setCurrentIndex4((prev) => {
        const next = prev + direction4;
        if (next >= images4.length) {
          setDirection4(-1);
          return prev - 1;
        } else if (next < 0) {
          setDirection4(1);
          return prev + 1;
        }
        return next;
      });
      setTimeout(() => setIsTransitioning4(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, [direction4]);

  const [currentindex5, setcurrentindex5] = useState(0);
  const [isTransitioning5, setisTransitioning5] = useState(false);
  const [direction5, setdirection5] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setisTransitioning5(true);
      setcurrentindex5((prev) => {
        const next = prev + direction5;
        if (next >= images5.length) {
          setdirection5(-1);
          return prev - 1;
        } else if (next < 0) {
          setdirection5(1);
          return prev + 1;
        }
        return next;
      });
      setTimeout(() => setisTransitioning5(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, [direction5]);

  // Screen size detection
  const containerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(1);
  const [screenSize, setScreenSize] = useState('desktop');

  // Enhanced screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 768) {
        setScreenSize('sm');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else if (width < 1280) {
        setScreenSize('lg');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Horizontal auto-scroll effect for mobile and small tablets
  useEffect(() => {
    const shouldAutoScroll = ['mobile', 'sm', 'tablet'].includes(screenSize);
    if (!shouldAutoScroll || !containerRef.current) return;

    const container = containerRef.current;
    const interval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollDirection === 1 && scrollLeft >= maxScroll - 10) {
        setScrollDirection(-1);
      } else if (scrollDirection === -1 && scrollLeft <= 10) {
        setScrollDirection(1);
      } else {
        const scrollAmount = screenSize === 'mobile' ? 300 : screenSize === 'sm' ? 400 : 500;
        container.scrollBy({
          left: scrollDirection * scrollAmount,
          behavior: "smooth",
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [scrollDirection, screenSize]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-row gap-1 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 px-1 xs:px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 py-1 xs:py-2 sm:py-4 overflow-x-auto scrollbar-hide"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Main Container */}
      <div className="flex flex-row gap-1 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 w-[280px] xs:w-[320px] sm:w-[480px] md:w-full min-w-[280px] md:min-w-0">
        {/* Left Column - First Carousel */}
        <div className="w-[28%] xs:w-[30%] sm:w-[30%] md:w-[240px] lg:w-[280px] xl:w-[320px] 2xl:w-[380px] h-[200px] xs:h-[220px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[440px] 2xl:h-[500px] min-w-[80px] xs:min-w-[100px] sm:min-w-[120px] overflow-hidden rounded-sm xs:rounded md:rounded-lg bg-white shadow-sm">
          <div
            className="flex flex-col"
            style={{
              transform: `translateY(-${
                currentIndex1 * (100 / images1.length)
              }%)`,
              height: `${images1.length * 100}%`,
              transition: isTransitioning1
                ? "transform 1s ease-in-out"
                : "none",
            }}
          >
            {images1.map((img, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 relative"
                style={{ height: `${100 / images1.length}%` }}
              >
                <img
                  src={img}
                  alt="slide"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <button className="absolute bottom-1 xs:bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 left-1 xs:left-2 bg-red-600 hover:bg-black text-white text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-bold px-1 xs:px-2 sm:px-3 md:px-4 lg:px-6 py-0.5 xs:py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded xs:rounded-md shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col gap-1 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-[44%] xs:w-[40%] sm:w-[40%] md:w-[400px] lg:w-auto flex-1 min-w-[120px] xs:min-w-[140px] sm:min-w-[160px]">
          {/* Main Horizontal Carousel */}
          <div className="relative h-[120px] xs:h-[140px] sm:h-[160px] md:h-[200px] lg:h-[240px] xl:h-[280px] 2xl:h-[320px] w-full overflow-hidden rounded-sm xs:rounded md:rounded-lg bg-white shadow-sm">
            {/* Dots indicator */}
            <div className="absolute bottom-1 xs:bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 z-10 flex gap-0.5 xs:gap-1 sm:gap-2 items-center">
              {images2.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setHorizontalIndex(index);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        left: index * scrollRef.current.clientWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`transition-all duration-300 ${
                    index === horizontalIndex
                      ? "w-2 h-1 xs:w-3 xs:h-1.5 sm:w-4 sm:h-2 md:w-6 md:h-2 lg:w-8 lg:h-3 bg-black rounded-full shadow-md"
                      : "w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-red-500 hover:bg-white/75 rounded-full"
                  }`}
                />
              ))}
            </div>

            <div
              ref={scrollRef}
              className="flex overflow-x-hidden scroll-smooth h-full"
            >
              {images2.map((img, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full h-full flex items-center justify-center relative"
                >
                  <img
                    src={img}
                    alt="slide"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <button className="absolute bottom-3 xs:bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-black text-white text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-bold px-2 xs:px-3 sm:px-4 md:px-6 py-1 xs:py-1.5 sm:py-2 md:py-2.5 rounded xs:rounded-md lg:rounded-lg shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Mini Carousels */}
          <div className="flex flex-row gap-1 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {/* 4th banner */}
            <div className="h-[75px] xs:h-[80px] sm:h-[90px] md:h-[110px] lg:h-[130px] xl:h-[150px] w-[50%] min-w-[60px] xs:min-w-[70px] sm:min-w-[80px] overflow-hidden rounded-sm xs:rounded bg-white shadow-sm">
              <div
                className="flex flex-col"
                style={{
                  transform: `translateY(-${
                    currentIndex4 * (100 / images4.length)
                  }%)`,
                  height: `${images4.length * 100}%`,
                  transition: isTransitioning4
                    ? "transform 1s ease-in-out"
                    : "none",
                }}
              >
                {images4.map((img, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 relative"
                    style={{ height: `${100 / images4.length}%` }}
                  >
                    <img
                      src={img}
                      alt="slide"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <button className="absolute bottom-0.5 xs:bottom-1 sm:bottom-2 left-1 xs:left-2 bg-red-600 hover:bg-black text-white text-[6px] xs:text-[8px] sm:text-xs font-bold px-1 xs:px-2 sm:px-3 md:px-4 lg:px-5 py-0.5 xs:py-1 sm:py-1.5 md:py-2 rounded xs:rounded-md lg:rounded-lg shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm w-[80%] xs:w-[75%] sm:w-[70%] md:w-[60%] lg:w-[50%]">
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 5th banner */}
            <div className="h-[75px] xs:h-[80px] sm:h-[90px] md:h-[110px] lg:h-[130px] xl:h-[150px] w-[50%] min-w-[60px] xs:min-w-[70px] sm:min-w-[80px] overflow-hidden rounded-sm xs:rounded bg-white shadow-sm">
              <div
                className="flex flex-col"
                style={{
                  transform: `translateY(-${
                    currentindex5 * (100 / images5.length)
                  }%)`,
                  height: `${images5.length * 100}%`,
                  transition: isTransitioning5
                    ? "transform 1s ease-in-out"
                    : "none",
                }}
              >
                {images5.map((img, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 relative"
                    style={{ height: `${100 / images5.length}%` }}
                  >
                    <img
                      src={img}
                      alt="slide"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <button className="absolute bottom-0.5 xs:bottom-1 sm:bottom-2 left-1 xs:left-2 bg-red-600 hover:bg-black text-white text-[6px] xs:text-[8px] sm:text-xs font-bold px-1 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 rounded xs:rounded-md lg:rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm w-[80%] xs:w-[75%] sm:w-[70%] md:w-[60%] lg:w-[50%] flex items-center text-center justify-center">
                      Order Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 3rd banner */}
        <div className="w-[28%] xs:w-[30%] sm:w-[30%] md:w-[240px] lg:w-[280px] xl:w-[320px] 2xl:w-[380px] h-[200px] xs:h-[220px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[440px] 2xl:h-[500px] min-w-[80px] xs:min-w-[100px] sm:min-w-[120px] overflow-hidden rounded-sm xs:rounded md:rounded-lg bg-white shadow-sm">
          <div
            className="flex flex-col"
            style={{
              transform: `translateY(-${
                currentIndex3 * (100 / images3.length)
              }%)`,
              height: `${images3.length * 100}%`,
              transition: isTransitioning3
                ? "transform 1s ease-in-out"
                : "none",
            }}
          >
            {images3.map((img, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 relative"
                style={{ height: `${100 / images3.length}%` }}
              >
                <img
                  src={img}
                  alt="slide"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <button className="absolute bottom-1 xs:bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 right-1 xs:right-2 bg-red-600 text-white hover:bg-black text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-bold px-1 xs:px-2 sm:px-3 md:px-4 lg:px-6 py-0.5 xs:py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded xs:rounded-md xl:rounded-xl shadow-lg hover:shadow-rose-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;