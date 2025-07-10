import React, { useEffect, useRef, useState } from "react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

// Vertical Carousel 1
const images1 = [
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/nobel-and-gray-3d-posters-poster-template-efq1zs2a5d5741.jpg",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/wild-sand-and-nero-world-mens-day-instagram-post-template-g40xw3d1fee6a2.jpg",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/white-and-off-white-fashion-show-poster-template-rmsuci5bbcc335.jpg",
];

// Horizontal Carousel
const images2 = [
  "https://cdn.dribbble.com/userupload/10866321/file/original-117dd32f2ec57d55305d528be0fc170b.jpg?resize=1504x1034&vertical=center",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_original/cararra-and-quill-gray-clothing-banner-template-qx3tsb79c73aac.webp",
  "http://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_original/linen-and-mischka-clothing-banner-template-8y8ujn4f8a9a68.webp",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/gallery-and-gallery-men-clothing-banner-template-n6a070249c995f.webp",
];

// Vertical Carousel 3
const images3 = [
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/blue-and-black-big-sale-flyer-template-16qxqod47a318b.jpg",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/yellow-purple-neon-fashion-sale-flyer-template-fdjmwr564cef5c.jpg",
  "https://cdn.dribbble.com/userupload/43598152/file/original-72fb3564b02bd201ec2024fb3a6b2676.png?resize=1024x1024&vertical=center",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/colorful-fashion-collection-standee-banner-template-hrg96r22a1518c.jpg",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/ivory-and-black-discount-offer-facebook-post-template-jp7insa98f6e6d.jpg",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/compressed/collage-clothes-on-sale-poster-template-ml8f3zd6415179.jpg",
];

// Vertical Carousel 4
const images4 = [
  "https://cdn.dribbble.com/userupload/6710199/file/original-98be7900a343086da4026330f142d01e.jpg?resize=400x0",
  "https://cdn.dribbble.com/userupload/30977009/file/original-d565eede788dd39f637feca93807f0a6.jpg?resize=1200x800&vertical=center",
];
const images5 = [
  "https://i.pinimg.com/736x/05/29/c1/0529c1b893d5279fa11e343a2706a73c.jpg",
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
    <div className="w-full min-h-screen flex flex-col gap-3 sm:gap-5 px-2 sm:px-4 xl:px-20 py-4">
      {/* 1st banner..........................................---------------------------------................---------->>>>>>>> */}
      {/* ..................................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <div className="flex flex-col xl:flex-row gap-3 sm:gap-5 w-full">
        <div className="w-full xl:w-[350px] h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl bg-white">
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
                  className="w-full items-center justify-center h-full bg-amber-400"
                  loading="lazy"
                />
                <button className="absolute bottom-2 sm:bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-6 py-1 sm:py-2 rounded-md hover:bg-white hover:text-black border border-black transition duration-300">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* 2nd banner-------------------------------------------------------------------------..............................>>>>>>>> */}
        <div className="flex flex-col gap-3 sm:gap-5 flex-1">
          <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] w-full overflow-hidden rounded-lg bg-white shadow-2xl group">
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => scroll("left")}
                className="bg-amber-200 p-1 sm:p-2 rounded-full shadow hover:bg-amber-400 text-sm sm:text-base"
              >
                <IoArrowBackCircleOutline />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-1 sm:p-2 rounded-md bg-amber-200 shadow hover:bg-gray-400 text-sm sm:text-base"
              >
                <IoArrowForwardCircleOutline />
              </button>
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
                  <button className="absolute bottom-2 sm:bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-6 py-1 sm:py-2 rounded-md hover:bg-white hover:text-black border border-black transition duration-300">
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* 4th banner-------------------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="h-[140px] sm:h-[160px] lg:h-[180px] w-full sm:max-w-[350px] overflow-hidden rounded-md shadow-xl bg-white">
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
                    <button className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-semibold px-2 sm:px-4 py-1 rounded-md hover:bg-white hover:text-black border border-black transition duration-300">
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* 5th banner-------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <div className="h-[140px] sm:h-[160px] lg:h-[180px] w-full sm:max-w-[350px] overflow-hidden rounded-lg shadow-xl bg-white">
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
                    <button className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-semibold px-2 sm:px-4 py-1 rounded-md hover:bg-white hover:text-black border border-black transition duration-300">
                      Order Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* 3rd banner-------------------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>> */}
        <div className="w-full xl:w-[450px] h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-2xl bg-white">
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
                  className="w-full h-full object-cover bg-amber-400"
                  loading="lazy"
                />
                <button className="absolute bottom-2 sm:bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-6 py-1 sm:py-2 rounded-md hover:bg-white hover:text-black border border-black transition duration-300">
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
