import React, { useEffect, useRef, useState } from "react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

// Vertical Carousel 1
const images1 = [
  "https://cmsimages.shoppersstop.com/Wrogn_web_7cefbb23f5/Wrogn_web_7cefbb23f5.png",
  "https://cmsimages.shoppersstop.com/USPA_web_dfb93d3559/USPA_web_dfb93d3559.png",
  "https://cmsimages.shoppersstop.com/Allen_Solly_web_165bc881b4/Allen_Solly_web_165bc881b4.png",
  "https://cmsimages.shoppersstop.com/jeans_web_5f73a85a24/jeans_web_5f73a85a24.png",
];

// Horizontal Carousel
const images2 = [
  
  "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/af_pc_1x._CB792409181_.jpg",
  "https://cdn.dribbble.com/userupload/10866321/file/original-117dd32f2ec57d55305d528be0fc170b.jpg?resize=1504x1034&vertical=center",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_original/cararra-and-quill-gray-clothing-banner-template-qx3tsb79c73aac.webp",
  "http://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_original/linen-and-mischka-clothing-banner-template-8y8ujn4f8a9a68.webp",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/gallery-and-gallery-men-clothing-banner-template-n6a070249c995f.webp",
];

// Vertical Carousel 3
const images3 = [
  "https://wforwoman.com/cdn/shop/files/Curation_-4_1.jpg?v=1750144510&width=535",
  "https://cmsimages.shoppersstop.com/Allen_solly_web_1e2d1b737d/Allen_solly_web_1e2d1b737d.png",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/colorful-fashion-collection-standee-banner-template-hrg96r22a1518c.jpg",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/ivory-and-black-discount-offer-facebook-post-template-jp7insa98f6e6d.jpg",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/collage-clothes-on-sale-poster-template-ml8f3zd6415179.jpg",
];

// Vertical Carousel 4
const images4 = [
  "https://cdn.dribbble.com/userupload/30977009/file/original-d565eede788dd39f637feca93807f0a6.jpg?resize=1200x800&vertical=center",
  "https://maxzoneclothing.com/cdn/shop/files/resize_maxzone_phone_banner_15_1024x1024.jpg?v=1751109317",
];
const images5 = [
  "https://cdn.create.vista.com/downloads/e465ded5-8_1024.jpeg",
  "https://pantproject.com/cdn/shop/products/all-weather-essential-cargo-shorts_c52c7e34-82cc-4592-b6ca-c47ead121d33_720x1080.jpg?v=1629193910",
];

const Hero = () => {
  //1st Banner---------------------------------------------------------------------------------------------------------->>
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
  //2nd mid banner..........---------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>
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
  //3rd left side banner--------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
  // 4th mini bottom banner----------------------------------------------------------------------------------->>>>>>>>>>>>>>>

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
  // 5th mini bottom wear ------------------------------------------------------------>>>>>>>
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

  return (
    <div className="w-full h-1/2 flex flex-col gap-3 sm:gap-5 px-2 sm:px-4 xl:px-20 py-4">
      {/* 1st banner..........................................---------------------------------................---------->>>>>>>> */}
      {/* ..................................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <div className="flex flex-col xl:flex-row gap-3 sm:gap-5 w-full">
        <div className="w-full xl:w-[350px] h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-lg  bg-white">
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
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <button className="absolute bottom-2 sm:bottom-5 left-1/2 transform-translate-x-1/2 bg-red-600 hover:bg-black text-white text-xs sm:text-sm font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-md shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 border-white backdrop-blur-sm">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* 2nd banner-------------------------------------------------------------------------..............................>>>>>>>> */}
        <div className="flex flex-col gap-3 sm:gap-5 flex-1">
          <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] w-full overflow-hidden rounded-lg bg-white ">
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
                  className={`transition-all text-xs duration-300 ${
                    index === horizontalIndex
                      ? "w-6 h-2 sm:w-8 sm:h-3 bg-black rounded-full shadow-md"
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
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <button className="absolute bottom-8 sm:bottom-12 left-1/2 transform-translate-x-1/2 bg-red-600 hover:bg-black text-white text-xs sm:text-sm font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 border-white backdrop-blur-sm">
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 4th banner-------------------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="h-[140px] sm:h-[160px] lg:h-[180px] w-full sm:max-w-[350px] overflow-hidden rounded-md  bg-white">
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
                    <button className="absolute bottom-1 sm:bottom-2 left-1/2 transform-translate-x-1/2 bg-red-600 hover:bg-black text-white text-xs font-bold px-3 sm:px-5 py-1 sm:py-2 rounded-lg shadow-xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white backdrop-blur-sm">
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* 5th banner-------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <div className="h-[140px] sm:h-[160px] lg:h-[180px] w-full sm:max-w-[350px] overflow-hidden rounded-lg  bg-white">
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
                    <button className="absolute bottom-1 sm:bottom-2 left-1/2 transform-translate-x-1/2 bg-red-600 hover:bg-black text-white text-xs font-bold px-3 sm:px-5 py-1 sm:py-2 rounded-lg shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white backdrop-blur-sm">
                      Order Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* 3rd banner-------------------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>> */}
        <div className="w-full xl:w-[450px] h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-lg  bg-white">
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
                <button className="absolute bottom-2 sm:bottom-5 left-1/2 transform-translate-x-1/2 bg-red-600 text-white hover:bg-black text-xs sm:text-sm font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 border-white backdrop-blur-sm">
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
