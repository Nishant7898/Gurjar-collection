import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, HeartIcon } from "lucide-react";

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
    <div className="w-full px-4 md:px-55 mt-20">
      {/* Header */}
      <div className="flex  flex-col md:flex-row items-start md:items-center justify-between font-semibold text-xl mb-6 gap-4">
        <p>For Men</p>
        <div className="flex  flex-wrap text-red-600 gap-4">
          <p>All</p>
          <p>Formal Shirt</p>
          <p>Check Shirt</p>
          <p>T-Shirt</p>
          <p>Jeans</p>
          <p>Trouser</p>
          <div className="hidden md:flex gap-2 text-black">
            <ChevronLeft size={28} className="cursor-pointer" onClick={scrollLeft} />
            <ChevronRight size={28} className="cursor-pointer" onClick={scrollRight} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="overflow-x-auto mt-10">
        <div
          ref={scrollRef}
          className="grid grid-rows-2 grid-flow-col gap-3 w-max scroll-smooth md:grid"
        >
          {/* PRODUCT CARD TEMPLATE */}
          {[
            {
              front: "https://images.meesho.com/images/products/305708885/m9ppd_512.webp",
              back: "https://images.meesho.com/images/products/305708885/mhrpp_512.webp",
              tag: "Favourite",
              tagColor: "bg-yellow-500",
              title: "Elanpro Brand cotton Plain shirts for men",
              price: "₹999",
            },
            {
              front: "https://m.media-amazon.com/images/I/41Dw3Jc7CTL._SX300_SY300_QL70_FMwebp_.jpg",
              back: "https://m.media-amazon.com/images/I/51bRodLQUvL.jpg",
              tag: "New",
              tagColor: "bg-red-600",
              title: "Men's Cotton Slim Fit Casual Printed Checkered Stylish Latest Shirt",
              price: "₹399",
            },
            {
              front: "https://m.media-amazon.com/images/I/71eUwDk8z+L._SY879_.jpg",
              back: "https://m.media-amazon.com/images/I/71vSLpVgZpL._SX569_.jpg",
              tag: "-10%",
              tagColor: "bg-red-600",
              title: "Allen Solly Men's Cotton Regular Fit Polo T-Shirt",
              price: "₹699",
            },
            {
              front: "https://m.media-amazon.com/images/I/51sOrVBx9LL._SY679_.jpg",
              back: "https://m.media-amazon.com/images/I/61QZdwSwX5L._SY550_.jpg",
              tag: "Sold Out",
              tagColor: "bg-gray-200 opacity-70",
              title: "FRAULEIN Women's Flared Pleated Maxi Skirt with Pockets",
              price: "₹749",
            },
            {
              front:
                "https://offduty.in/cdn/shop/products/ff2def08-93ae-4984-89e8-8352dea110da_1800x1800.jpg?v=1676893036",
              back:
                "https://offduty.in/cdn/shop/products/2751a72d-a4bd-49ee-9f65-a3736b281ec5_1800x1800.jpg?v=1676893041",
              tag: "New",
              tagColor: "bg-red-600",
              title: "Blue Stone Wash Baggy Fit Cargo Men Jeans",
              price: "₹1779",
            },
            {
              front: "https://images.meesho.com/images/products/446118957/qv1ua_512.webp",
              back: "https://images.meesho.com/images/products/446118957/tdhvv_512.webp",
              tag: "New",
              tagColor: "bg-red-600",
              title: "Men's Black Baggy Trousers in Cotton Lycra – Comfortable & Stylish",
              price: "₹890",
            },
          ].map((product, index) => (
            <div
              key={index}
              className="group flex w-[85vw] md:w-[400px] h-[230px] md:h-[300px] bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative w-full md:w-[400px] h-[150px] md:h-[250px]">
                <img
                  src={product.front}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  alt={`Front ${index + 1}`}
                />
                <img
                  src={product.back}
                  className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  alt={`Back ${index + 1}`}
                />
                <button
                  className={`${product.tagColor} absolute top-1 left-0 m-2 text-sm text-white px-2 py-1 rounded -rotate-45`}
                >
                  {product.tag}
                </button>
                <HeartIcon className="absolute top-1 right-1" />
              </div>
              <div className="p-3 flex flex-col justify-between w-full text-sm">
                <p className="opacity-80 line-clamp-2">{product.title}</p>
                <p className="text-red-600 font-bold text-base">{product.price}</p>
                <button className="mt-2 px-1 py-1 p-2  text-sm font-semibold hover:scale-95 duration-500 bg-gradient-to-t from-[#d3af10ab] to to-[#b3c706] text-black rounded hover:bg-black">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenProducts;
