import React, { useEffect, useRef, useState } from "react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

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

  // New state and ref for horizontal auto-scroll
  const containerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screens
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Horizontal auto-scroll effect
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const interval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollDirection === 1 && scrollLeft >= maxScroll - 10) {
        setScrollDirection(-1);
      } else if (scrollDirection === -1 && scrollLeft <= 10) {
        setScrollDirection(1);
      } else {
        container.scrollBy({
          left: scrollDirection * 600,
          behavior: "smooth",
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [scrollDirection, isMobile]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 py-2 sm:py-4 overflow-x-auto scrollbar-hide"
    >
      {/* Main Container */}
      <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-screen sm:w-[960px] md:w-full min-w-[600px] md:min-w-0">
        {/* Left Column - First Carousel */}
        <div className="w-[30%] sm:w-[30%] md:w-[240px] lg:w-[280px] xl:w-[320px] 2xl:w-[350px] h-[300px] sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] min-w-[120px] overflow-hidden rounded-md lg:rounded-lg bg-white shadow-sm">
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
                  className="w-full object-center  h-full md:object-cover"
                  loading="lazy"
                />
               
              </div>
            ))}
          </div>
        </div>

        {/* 2nd middle */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-[40%] sm:w-[40%] md:w-[400px] lg:w-auto flex-1 min-w-[160px]">
          {/* Main Horizontal Carousel */}
          <div className="relative h-[190px] sm:h-[200px] md:h-[250px] lg:h-[320px] xl:h-[350px] 2xl:h-[400px] w-full overflow-hidden rounded-md lg:rounded-lg bg-white shadow-sm">
            {/* Dots indicator */}
            <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 z-10 flex gap-1 sm:gap-2 items-center">
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
                      ? "w-4 h-2 sm:w-6 sm:h-2 md:w-8 md:h-3 bg-black rounded-full shadow-md"
                      : "w-2 h-2 sm:w-3 sm:h-3 bg-red-500 hover:bg-white/75 rounded-full"
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
                    className="w-full object-fill h-full md:object-cover"
                    loading="lazy"
                  />
               
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Mini Carousels */}
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {/* 4th banner */}
            <div className="h-[100px] sm:h-[120px] md:h-[140px] lg:h-[170px] xl:h-[180px] w-[50%] min-w-[80px] overflow-hidden rounded-md bg-white shadow-sm">
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
                 
                  </div>
                ))}
              </div>
            </div>

            {/* 5th banner */}
            <div className="h-[100px] sm:h-[120px] md:h-[140px] lg:h-[170px] xl:h-[180px] w-[50%] min-w-[80px] overflow-hidden rounded-md bg-white shadow-sm">
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
                 
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3rd banner */}
        <div className="w-[30%] sm:w-[30%] md:w-[240px] lg:w-[320px] xl:w-[380px] 2xl:w-[450px] h-[300px] sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] min-w-[120px] overflow-hidden rounded-md lg:rounded-lg bg-white shadow-sm">
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
            
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
