import React, { useEffect, useRef, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

const images1 = [
  {
    img: "https://styleclothe.com/wp-content/uploads/2023/08/BKT03-MN74-scaled.jpg",
    desc: "Stylish Men's Printed Shirts Combo – Shop Now (Pack of 2)",
    originalPrice: "1,998.00",
    discountPrice: "1,198.00",
    discountPercent: 40,
    TotalStock: 800,
    RemainingStock: 500,
    deadline: new Date().getTime() + 2 * 24 * 60 * 60 * 1000,
  },
  {
    img: "https://www.jiomart.com/images/product/original/rvl5qdzsnc/mijaashree-fashion-women-dark-purple-and-orange-solid-cotton-blend-pack-of-2-a-line-kurta-xxl-product-images-rvl5qdzsnc-0-202212092153.jpg?im=Resize=(500,630)",
    desc: "MIJAASHREE FASHION Women Purple and Orange Cotton Blend Kurta",
    originalPrice: "1,098.00",
    discountPrice: "698.00",
    discountPercent: 36,
    TotalStock: 500,
    RemainingStock: 346,
    deadline: new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
  },
  {
    img: "https://www.stitchfix.com/men/blog/wp-content/uploads/2019/02/T3_M20_BLG_Tips-for-Adding-Color-to-Your-Closet_IN_STORY1.jpg",
    desc: "MIJAASHREE FASHION Women Purple and Orange Cotton Blend Kurta",
    originalPrice: "2918.00",
    discountPrice: "2092.00",
    discountPercent: 36,
    TotalStock: 500,
    RemainingStock: 346,
    deadline: new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
  },
  {
    img: "https://blog.luulla.com/wp-content/uploads/2017/01/shutterstock_527673862.jpg",
    desc: "MIJAASHREE FASHION Women Purple and Orange Cotton Blend Kurta",
    originalPrice: "1,098.00",
    discountPrice: "698.00",
    discountPercent: 36,
    TotalStock: 500,
    RemainingStock: 346,
    deadline: new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
  },
];

const LimitedOffer = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -540 * 3,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 540 * 3,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const newTimeLeft = {};

      images1.forEach((item, index) => {
        const distance = item.deadline - now;

        if (distance <= 0) {
          newTimeLeft[index] = "Offer Ended";
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          newTimeLeft[index] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 md:px-60 py-5 w-full bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Limited Time Offer</h2>
        <div className="flex gap-4 items-center text-red-600 font-semibold hover:text-red-700">
          <button className="text-xl">See All</button>
          <ChevronLeft onClick={scrollLeft} size={28} className="cursor-pointer" />
          <ChevronRight onClick={scrollRight} size={28} className="cursor-pointer" />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto outline-none scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {images1.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-2 overflow-hidden transition-transform hover:scale-[1.02] w-[90vw] md:w-[550px]"
          >
            <div className="relative w-full md:w-auto">
              <img
                src={item.img}
                alt="Product"
                className="h-[220px] sm:h-[180px] md:h-[300px] w-full md:w-[600px] object-cover rounded"
              />
              <div className="absolute -rotate-45 top-6 -left-1 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                {item.discountPercent}% OFF
              </div>
              <Heart className="absolute top-1 right-1 text-2xl text-black cursor-pointer hover:text-red-500" />
            </div>

            <div className="p-4 flex flex-col justify-between w-full">
              <p className="font-semibold text-lg text-gray-800">{item.desc}</p>
              <p className="text-sm text-gray-500 line-through mt-1">
                ₹{item.originalPrice}
              </p>
              <p className="text-lg font-bold text-red-600">
                ₹{item.discountPrice}
              </p>

              <div className="flex justify-between text-sm text-black opacity-45 mt-2">
                <p>Sold: {item.RemainingStock}</p>
                <p>In Stock: {item.TotalStock}</p>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{
                    width: `${(item.RemainingStock / item.TotalStock) * 100}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <p className="text-black bg-gray-400 max-w-fit font-medium px-2 py-1 rounded text-sm">
                  ⏰ {timeLeft[index] || "Loading..."}
                </p>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-black transition-colors duration-200 text-sm w-fit">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitedOffer;
