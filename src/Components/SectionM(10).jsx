import React from "react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeartIcon } from "lucide-react";

const MenProducts = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -1250,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 1250,
      behavior: "smooth",
    });
  };
  return (
    <div className="h-1/2 w-full pl-50 pr-50  mt-20">
      {/* Header */}
      <div className="flex items-center justify-between font-semibold text-xl mb-6">
        <p>For Men</p>
        <div className="flex text-red-600 gap-5">
          <p>All</p>
          <p>Formal Shirt</p>
          <p>Check Shirt</p>
          <p>T-Shirt</p>
          <p>Jeans</p>
          <p>Trouser</p>
          <div className="flex gap-2 text-black">
            <ChevronLeft size={28} className="cursor-pointer" />
            <ChevronRight size={28} className="cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden mt-20">
        <div
          ref={scrollRef}
          className="grid grid-rows-2 grid-flow-col gap-3 w-max scroll-smooth"
        >
          {/* 1st poduct.............------------------------->>>>>>>>>>>>>>>>>>> */}
          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[400px] h-[250px]">
              <img
                src="https://images.meesho.com/images/products/305708885/m9ppd_512.webp"
                className="w-full h-full  transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 1"
              />
              <img
                src="https://images.meesho.com/images/products/305708885/mhrpp_512.webp"
                className="w-full h-full  absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                alt="Back 1"
              />
              <button className="bg-yellow-500 absolute top-1 left-0 m-2 text-sm text-white px-2 py-1 rounded -rotate-45">
                Favourite
              </button>
              <HeartIcon className="absolute -top-0 right-0" />
            </div>

            <div className="p-4 flex flex-col justify-between w-full">
              <p className="font-semibold ">
                Elanpro Brand cotton Plain shirts for men
              </p>
              <p className="text-red-600 font-bold text-lg">₹999</p>
              <button className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-black">
                Add To Cart
              </button>
            </div>
          </div>

          {/* 2nd product----------------------------------------->>>>>>>>>>>> */}

          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[400px] h-[250px]">
              <img
                src="https://m.media-amazon.com/images/I/41Dw3Jc7CTL._SX300_SY300_QL70_FMwebp_.jpg"
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 2"
              />
              <img
                src="https://m.media-amazon.com/images/I/51bRodLQUvL.jpg"
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                alt="Back 2"
              />
              <button className="bg-red-600 absolute top-0 left-0 m-2 text-sm text-white px-2 py-1 rounded -rotate-45">
                New
              </button>
              <HeartIcon className="absolute -top-0 right-0" />
            </div>
            <div className="p-4 flex flex-col justify-between w-full">
              <p className="font-semibold text-sm">JAI TEXTILES Men's Cotton Slim Fit Casual Printed Checkered Stylish Latest Shirt</p>
              <p className="text-red-600 font-bold text-lg">₹399</p>
              <button className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-black">
                Add To Cart
              </button>
            </div>
          </div>
          {/* 3rd product.........------------------------->>>>>>>>>>>> */}
          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[400px] h-[250px]">
              <img
                src="https://m.media-amazon.com/images/I/71eUwDk8z+L._SY879_.jpg"
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 3"
              />
              <img
                src="https://m.media-amazon.com/images/I/71vSLpVgZpL._SX569_.jpg"
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                alt="Back 3"
              />
              <button className="bg-red-600 absolute top-0 left-0 m-2 text-sm text-white px-2 py-1 rounded -rotate-45">
                -10%
              </button>
              <HeartIcon className="absolute -top-0 right-0" />
            </div>
            <div className="p-4 flex flex-col justify-between w-full">
              <p className="font-semibold text-sm">
             Allen Solly Men's Cotton Regular Fit Polo T-Shirt
              </p>
              <p className="text-red-600 font-bold text-lg">₹699</p>
              <button className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-black">
                Add To Cart
              </button>
            </div>
          </div>

          {/* 4th product.........------------------------------>>> */}
          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[400px] h-[250px]">
              <img
                src="https://m.media-amazon.com/images/I/51sOrVBx9LL._SY679_.jpg"
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 4"
              />
              <img
                src="https://m.media-amazon.com/images/I/61QZdwSwX5L._SY550_.jpg"
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                alt="Back 4"
              />
              <button className="bg-gray-200 absolute top-0 left-0 m-2 text-sm  opacity-70 px-2 py-1 rounded -rotate-45">
                Sold Out
              </button>
              <HeartIcon className="absolute -top-0 right-0" />
            </div>
            <div className="p-4 flex flex-col justify-between w-full">
              <p className="font-semibold ">
                FRAULEIN Women's Flared Pleated Maxi Skirt High Waist A-Line
                with Pockets and Belt Accessories
              </p>
              <p className="text-red-600 font-bold text-lg">₹749</p>
              <button className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-black">
                Add To Cart
              </button>
            </div>
          </div>
          {/* 5th product--------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[400px] h-[250px]">
              <img
                src="https://offduty.in/cdn/shop/products/ff2def08-93ae-4984-89e8-8352dea110da_1800x1800.jpg?v=1676893036"
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 5"
              />
              <img
                src="https://offduty.in/cdn/shop/products/2751a72d-a4bd-49ee-9f65-a3736b281ec5_1800x1800.jpg?v=1676893041"
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                alt="Back 5"
              />
              <button className="bg-red-600 absolute top-0 left-0 m-2 text-sm text-white px-2 py-1 rounded -rotate-45">
                New
              </button>
              <HeartIcon className="absolute -top-0 right-0" />
            </div>
            <div className="p-4 flex flex-col justify-between w-full">
              <p className="font-semibold text-sm">
      Blue Stone Wash Baggy Fit Cargo Men Jeans
              </p>
              <p className="text-red-600 font-bold text-lg">₹1779</p>
              <button className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-black">
                Add To Cart
              </button>
            </div>
          </div>
          {/* 6th product................---------------------------------------------->>>>>> */}

          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[400px] h-[250px]">
              <img
                src="https://images.meesho.com/images/products/446118957/qv1ua_512.webp"
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 6"
              />
              <img
                src="https://images.meesho.com/images/products/446118957/tdhvv_512.webp"
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                alt="Back 6"
              />
              <button className="bg-red-600 absolute top-0 left-0 m-2 text-sm text-white px-2 py-1 rounded -rotate-45">
                New
              </button>
              <HeartIcon className="absolute -top-0 right-0" />
            </div>
            <div className="p-4 flex flex-col justify-between w-full">
              <p className="font-semibold text-sm">
               Men's Black Baggy Trousers in Cotton Lycra – Comfortable & Stylish Casual Wear 
              </p>
              <p className="text-red-600 font-bold text-lg">₹890</p>
              <button className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-black">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenProducts;

