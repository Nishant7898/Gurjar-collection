import React, { useEffect, useRef, useState } from "react";
import Banner1 from "../assets/Banner1.jpg";
import Banner2 from "../assets/Banner2.jpg";
import Banner3 from "../assets/Tshirt.jpg";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import W from "../assets/F.png";

// Vertical Carousel 1
const images1 = [
  "https://templates.simplified.co/thumb/3446e660-7af3-4ff6-86ce-755afcde8fcd.jpg",
  "https://i.pinimg.com/originals/60/b0/a4/60b0a4ee7e032a6281444a82705a665c.jpg",
  "https://indiater.com/wp-content/uploads/2019/03/mens-accessories-online-shopping-offer-banner.jpg",
];

// Horizontal Carousel
const images2 = [
  "https://cdn.dribbble.com/userupload/10866321/file/original-117dd32f2ec57d55305d528be0fc170b.jpg?resize=1504x1034&vertical=center",
  "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_original/cararra-and-quill-gray-clothing-banner-template-qx3tsb79c73aac.webp",
  W,
  "http://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_original/linen-and-mischka-clothing-banner-template-8y8ujn4f8a9a68.webp",
];

// Vertical Carousel 3
const images3 = [
  "https://cdn.dribbble.com/userupload/23074308/file/original-8c2585b2cdc45ac7978fca068e3af5a7.jpg?resize=752x564&vertical=center",
  "https://cdn.dribbble.com/userupload/43598152/file/original-72fb3564b02bd201ec2024fb3a6b2676.png?resize=1024x1024&vertical=center",
];

// Vertical Carousel 4
const images4 = [
  "https://cdn.dribbble.com/userupload/6710199/file/original-98be7900a343086da4026330f142d01e.jpg?resize=400x0",
  "https://cdn.dribbble.com/userupload/30977009/file/original-d565eede788dd39f637feca93807f0a6.jpg?resize=1200x800&vertical=center",
];

const Hero = () => {
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [isTransitioning1, setIsTransitioning1] = useState(false);
  const [direction1, setDirection1] = useState(1);

  const [horizontalIndex, setHorizontalIndex] = useState(0);
  const scrollRef = useRef(null);

  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [isTransitioning3, setIsTransitioning3] = useState(false);
  const [direction3, setDirection3] = useState(1);

  const [currentIndex4, setCurrentIndex4] = useState(0);
  const [isTransitioning4, setIsTransitioning4] = useState(false);
  const [direction4, setDirection4] = useState(1);

  // Vertical Carousel 1
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

  // Horizontal Carousel
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

  // Vertical Carousel 3
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
      setTimeout(() => setIsTransitioning3(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, [direction3]);

  // Vertical Carousel 4
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

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col lg:flex-row mt-5 justify-start px-4 sm:px-6 lg:px-20 gap-3 sm:gap-4 lg:gap-5 relative">
      {/* Container for all carousels */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5 w-full">
        
        {/* ===== 1st Vertical Carousel ===== */}
        <div className="relative w-full sm:w-[300px] lg:w-[350px] h-[300px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-md shadow-2xl bg-white mx-auto lg:mx-0">
          <div
            className="flex flex-col"
            style={{
              transform: `translateY(-${currentIndex1 * (100 / images1.length)}%)`,
              height: `${images1.length * 100}%`,
              transition: isTransitioning1 ? "transform 1s ease-in-out" : "none",
            }}
          >
            {images1.map((img, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
                style={{ height: `${100 / images1.length}%` }}
              >
                <img 
                  src={img} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full h-full object-cover bg-amber-400" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Container for horizontal carousel and 4th carousel */}
        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 flex-1">
          
          {/* ===== 2nd Horizontal Carousel ===== */}
          <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-full max-w-[700px] overflow-hidden rounded-md bg-white shadow-2xl group mx-auto lg:mx-0">
            {/* Scroll buttons */}
            <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => scroll("left")}
                className="bg-amber-200 p-2 rounded-full shadow hover:bg-amber-400 text-lg sm:text-xl"
                title="Scroll Left"
              >
                <IoArrowBackCircleOutline />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full bg-amber-200 shadow hover:bg-gray-400 text-lg sm:text-xl"
                title="Scroll Right"
              >
                <IoArrowForwardCircleOutline />
              </button>
            </div>

            {/* Scrollable container */}
            <div ref={scrollRef} className="flex overflow-x-hidden scroll-smooth h-full">
              {images2.map((img, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={img} 
                    alt={`Slide ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-3 right-2 transform -translate-x-1/2">
              <div className="flex gap-2">
                {images2.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setHorizontalIndex(index);
                      scrollRef.current?.scrollTo({
                        left: index * scrollRef.current.clientWidth,
                        behavior: "smooth",
                      });
                    }}
                    className={`w-2 h-2 rounded-full ${
                      horizontalIndex === index ? "bg-black" : "bg-gray-300"
                    } transition-all duration-300`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ===== 4th Vertical Carousel ===== */}
          <div className="relative h-[150px] sm:h-[180px] lg:h-[190px] w-full max-w-[350px] bg-white overflow-hidden rounded-md shadow-xl mx-auto lg:mx-0">
            <div
              className="flex flex-col"
              style={{
                transform: `translateY(-${currentIndex4 * (100 / images4.length)}%)`,
                height: `${images4.length * 100}%`,
                transition: isTransitioning4 ? "transform 1s ease-in-out" : "none",
              }}
            >
              {images4.map((img, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0" 
                  style={{ height: `${100 / images4.length}%` }}
                >
                  <img 
                    src={img} 
                    alt={`Slide ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== 3rd Vertical Carousel ===== */}
        <div className="relative h-[300px] sm:h-[500px] lg:h-[600px] w-full sm:w-[400px] lg:w-[450px] overflow-hidden rounded-md shadow-2xl bg-white mx-auto lg:mx-0">
          <div
            className="flex flex-col"
            style={{
              transform: `translateY(-${currentIndex3 * (100 / images3.length)}%)`,
              height: `${images3.length * 100}%`,
              transition: isTransitioning3 ? "transform 1s ease-in-out" : "none",
            }}
          >
            {images3.map((img, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
                style={{ height: `${100 / images3.length}%` }}
              >
                <img 
                  src={img} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full object-cover bg-amber-400 h-full" 
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