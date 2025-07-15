import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeartIcon } from "lucide-react";

const Womenproducts = () => {
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
    <div className="h-1/2 pl-40 pr-40  mt-20">
      {/* Header */}
      <div className="flex items-center justify-between font-semibold text-xl mb-6">
        <p>For Women</p>
        <div className="flex text-red-600 gap-5">
          <p>All</p>
          <p>Salwar Suit</p>
          <p>Kurti</p>
          <p>Tops</p>
          <p>Skirts</p>
          <p>Suit</p>
          <div className="flex gap-2 text-black">
            <ChevronLeft
              onClick={scrollLeft}
              size={28}
              className="cursor-pointer"
            />
            <ChevronRight
              onClick={scrollRight}
              size={28}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden flex justify-center mt-20">
        <div
          ref={scrollRef}
          className="grid grid-rows-2 grid-flow-col gap-6 w-max scroll-smooth"
        >
          {/* 1st poduct.............------------------------->>>>>>>>>>>>>>>>>>> */}
          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[300px] h-[250px]">
              <img
                src="https://m.media-amazon.com/images/I/71cWGXjSesL._SY741_.jpg"
                className="w-full h-full  transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 1"
              />
              <img
                src="https://m.media-amazon.com/images/I/51ZbHZOnV5L._SY741_.jpg"
                className="w-full h-full  absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                alt="Back 1"
              />
              <button className="bg-yellow-500 absolute top-1 left-0 m-2 text-sm text-white px-2 py-1 rounded -rotate-45">
                Favourite
              </button>
              <HeartIcon className="absolute -top-0 right-0" />
            </div>

            <div className="p-4 flex flex-col justify-between w-full">
              <p className="font-semibold text-sm">Product 1 Description</p>
              <p className="text-red-600 font-bold text-lg">₹999</p>
              <button className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-black">
                Add To Cart
              </button>
            </div>
          </div>

          {/* 2nd product----------------------------------------->>>>>>>>>>>> */}

          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[300px] h-[250px]">
              <img
                src="https://m.media-amazon.com/images/I/81LN4PQiuHL._SY741_.jpg"
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 2"
              />
              <img
                src="https://m.media-amazon.com/images/I/81tvzKKJ5JL._SY741_.jpg"
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                alt="Back 2"
              />
              <button className="bg-red-600 absolute top-0 left-0 m-2 text-sm text-white px-2 py-1 rounded -rotate-45">
                New
              </button>
              <HeartIcon className="absolute -top-0 right-0" />
            </div>
            <div className="p-4 flex flex-col justify-between w-full">
              <p className="font-semibold text-sm">Product 2 Description</p>
              <p className="text-red-600 font-bold text-lg">₹899</p>
              <button className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-black">
                Add To Cart
              </button>
            </div>
          </div>
          {/* 3rd product.........------------------------->>>>>>>>>>>> */}
          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[300px] h-[250px]">
              <img
                src="https://m.media-amazon.com/images/I/61TcnMgHv4L._SY741_.jpg"
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 3"
              />
              <img
                src="https://m.media-amazon.com/images/I/71CQgJRwqZL._SY741_.jpg"
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
                Dream Beauty Fashion Women's Sweet Heart Neck Puff/Balloon
                Bishop Sleeve
              </p>
              <p className="text-red-600 font-bold text-lg">₹1199</p>
              <button className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-black">
                Add To Cart
              </button>
            </div>
          </div>

          {/* 4th product.........------------------------------>>> */}
          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[300px] h-[250px]">
              <img
                src="https://m.media-amazon.com/images/I/61-e58B8BiL._SX679_.jpg"
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 4"
              />
              <img
                src="https://m.media-amazon.com/images/I/51mT7DAMbCL._SX679_.jpg"
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
            <div className="relative w-[300px] h-[250px]">
              <img
                src="https://m.media-amazon.com/images/I/61UY0CyxUtL._SY741_.jpg"
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 5"
              />
              <img
                src="https://m.media-amazon.com/images/I/610HljcgKML._SY741_.jpg"
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
                KOTTY Women's Relaxed Jeans
              </p>
              <p className="text-red-600 font-bold text-lg">₹679</p>
              <button className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-black">
                Add To Cart
              </button>
            </div>
          </div>
          {/* 6th product................---------------------------------------------->>>>>> */}

          <div className="group flex w-[400px] h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative w-[300px] h-[250px]">
              <img
                src="https://m.media-amazon.com/images/I/61wT6z1pBPL._SY879_.jpg"
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                alt="Front 6"
              />
              <img
                src="https://m.media-amazon.com/images/I/81U+QKfDtmL._SY741_.jpg"
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
                GRECIILOOKS Tailored Trousers for Women | Women Trousers |
                Women's High-Waisted Pant | Women Trousers Pants | Korean
                Trousers for Women
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

export default Womenproducts;
