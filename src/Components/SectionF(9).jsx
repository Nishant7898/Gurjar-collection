import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, HeartIcon } from "lucide-react";

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
    <div className="w-full px-4 md:px-50 mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between font-semibold text-xl mb-6 gap-4">
        <p>For Women</p>
        <div className="flex flex-wrap text-red-600 gap-4">
          <p>All</p>
          <p>Salwar Suit</p>
          <p>Kurti</p>
          <p>Tops</p>
          <p>Skirts</p>
          <p>Suit</p>
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
          className="grid grid-rows-2 grid-flow-col gap-6 w-max scroll-smooth"
        >
          {/* Product Cards */}
          {[
            {
              front: "https://m.media-amazon.com/images/I/71cWGXjSesL._SY741_.jpg",
              back: "https://m.media-amazon.com/images/I/51ZbHZOnV5L._SY741_.jpg",
              tag: "Favourite",
              tagColor: "bg-yellow-500",
              title:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex alias quod nulla sed doloribus non labore, modi deserunt ad",
              price: "₹999",
            },
            {
              front: "https://m.media-amazon.com/images/I/81LN4PQiuHL._SY741_.jpg",
              back: "https://m.media-amazon.com/images/I/81tvzKKJ5JL._SY741_.jpg",
              tag: "New",
              tagColor: "bg-red-600",
              title:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam officia facilis odio iusto nulla. Inventore placeat amet nesciunt dolor, facere neque.",
              price: "₹899",
            },
            {
              front: "https://m.media-amazon.com/images/I/61TcnMgHv4L._SY741_.jpg",
              back: "https://m.media-amazon.com/images/I/71CQgJRwqZL._SY741_.jpg",
              tag: "-10%",
              tagColor: "bg-red-600",
              title:
                "Dream Beauty Fashion Women's Sweet Heart Neck Puff/Balloon Bishop Sleeve",
              price: "₹1199",
            },
            {
              front: "https://m.media-amazon.com/images/I/61-e58B8BiL._SX679_.jpg",
              back: "https://m.media-amazon.com/images/I/51mT7DAMbCL._SX679_.jpg",
              tag: "Sold Out",
              tagColor: "bg-gray-200 opacity-70",
              title:
                "FRAULEIN Women's Flared Pleated Maxi Skirt High Waist A-Line with Pockets and Belt Accessories",
              price: "₹749",
            },
            {
              front: "https://m.media-amazon.com/images/I/61UY0CyxUtL._SY741_.jpg",
              back: "https://m.media-amazon.com/images/I/610HljcgKML._SY741_.jpg",
              tag: "New",
              tagColor: "bg-red-600",
              title: "KOTTY Women's Relaxed Jeans",
              price: "₹679",
            },
            {
              front: "https://m.media-amazon.com/images/I/61wT6z1pBPL._SY879_.jpg",
              back: "https://m.media-amazon.com/images/I/81U+QKfDtmL._SY741_.jpg",
              tag: "New",
              tagColor: "bg-red-600",
              title:
                "GRECIILOOKS Tailored Trousers for Women | Women Trousers | Women's High-Waisted Pant | Women Trousers Pants | Korean Trousers for Women",
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
                  alt={`Front ${index + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <img
                  src={product.back}
                  alt={`Back ${index + 1}`}
                  className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
                <button className="mt-2 px-1 py-1 text-sm font-semibold hover:scale-95 duration-500 bg-red-500 text-white rounded hover:bg-black">
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

export default Womenproducts;
