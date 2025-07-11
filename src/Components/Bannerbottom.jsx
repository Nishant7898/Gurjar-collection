import React, { useRef, useEffect } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const Brands = [
  {
    label: "Nike",
    img: "https://www.logo.wine/a/logo/Nike%2C_Inc./Nike%2C_Inc.-Logo.wine.svg",
  },
  {
    label: "Puma",
    img: "https://www.citypng.com/public/uploads/preview/puma-black-logo-png-701751694774568gw2on2y0un.png",
  },
  {
    label: "H & M",
    img: "https://banner2.cleanpng.com/20181112/afs/kisspng-logo-hm-brand-clothing-portable-network-graphics-1713923233618.webp",
  },
  {
    label: "Zara",
    img: "https://www.logo.wine/a/logo/Zara_(retailer)/Zara_(retailer)-Logo.wine.svg",
  },
  {
    label: "Gucci",
    img: "https://www.logo.wine/a/logo/Gucci/Gucci-Logo.wine.svg",
  },
  {
    label: "W for Women",
    img: "https://cdn.brandfetch.io/idopiBCQNV/w/512/h/512/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
  },
  {
    label: "Allen Solly",
    img: "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/allen-solly-logo.png",
  },
  {
    label: "Peter England",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Peter_England_logo.svg/768px-Peter_England_logo.svg.png?20240622202650",
  },
];

const categories = [
  {
    label: "T-shirt",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4TaVso39YlrNU8Sd9Bnqs7YKVz2hfhwhvjw&s",
  },
  {
    label: "InnerWear",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDRsyWhfQTwxUlA8en6ws4LMP4lo667ARRfg&s",
  },
  {
    label: "Jeans",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfBbrAhDsG0RrJrbh0Yk3uh_38tQNoIIdxaDjK2L0EkHXYlWp9Z7NlMO9RcuTTPhFGfqw&usqp=CAU",
  },
  {
    label: "Trouser",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTljNlUkbP0fBHAZMH3d8vBYWvRygXS1zxzPg&s",
  },
  {
    label: "OverSized T-shirt",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiZoNx5-qPyUCHWjNjDbF8N0-zpTsX3-DroQ&s",
  },
  {
    label: "Formal Shirt",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVJDbh17CMomStMshpCYRRo8G4d7jD3PnyMg&s",
  },
  {
    label: "Check Shirt",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5iXTlgY2_ccwzKao2dV0TNxaLzF7lY7O5Yw&s",
  },
  {
    label: "Top",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTek0OIQBC225eh_v5aGFU6w4noUQVkw_Wz3w&s",
  },
  {
    label: "Suit",
    img: "https://cdn.shopify.com/s/files/1/0044/8033/5936/files/red-aari-work-salwar-kameez-neckline-rose-pattern-designer-dupatta-cotton-unstitched-808.jpg",
  },
  {
    label: "Saari",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2fGMKTsVGwsjBxrBFKaLEq9LKun0cQBZPiA&s",
  },
  {
    label: "Skirt",
    img: "https://images-cdn.ubuy.co.in/6629bb2ce64a8f5e690c135e-mbj-wb829-womens-flirty-flare-skirt-xl.jpg",
  },
];

const Bannerbottom = () => {
  const categoryScrollRef = useRef(null);
  const brandScrollRef = useRef(null);

  const scrollLeft = () => {
    categoryScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    categoryScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    const container = brandScrollRef.current;
    let animationFrameId;
    let scrollSpeed = 1;

    const scroll = () => {
      if (container) {
        container.scrollLeft += scrollSpeed;
        const singleSetWidth = Brands.length * 216;
        if (container.scrollLeft >= singleSetWidth) {
          container.scrollLeft -= singleSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="px-4 md:px-10 py-10 bg-violet-100 w-full">
      {/* Categories */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <p className="text-xl md:text-2xl font-bold">Shop By Categories</p>
        <div className="flex items-center gap-4 mt-3 md:mt-0">
          <button className="font-semibold text-sm md:text-base">See All</button>
          <div className="flex gap-2">
            <IoIosArrowDropleftCircle
              size={35}
              onClick={scrollLeft}
              className="cursor-pointer"
            />
            <IoIosArrowDroprightCircle
              size={35}
              onClick={scrollRight}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div
        ref={categoryScrollRef}
        className="flex gap-4 md:gap-6 overflow-hidden scrollbar-hide scroll-smooth"
      >
        {categories.map((item, index) => (
          <div
            key={index}
            className="min-w-[160px] md:min-w-[200px] bg-white rounded-full shadow-md flex flex-col items-center p-4 hover:shadow-2xl"
          >
            <img
              src={item.img}
              alt={item.label}
              className="h-24 w-24 md:h-32 md:w-32 rounded-full hover:scale-110 transition-transform"
            />
            <p className="mt-2 text-sm md:text-base font-semibold">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Brands */}
      <div className="mt-16 w-full">
        <p className="text-xl md:text-2xl font-bold mb-4">Shop By Brands</p>
        <div
          ref={brandScrollRef}
          className="flex overflow-hidden whitespace-nowrap scrollbar-hide scroll-smooth w-full"
        >
          {[...Brands, ...Brands, ...Brands].map((item, index) => (
            <div
              key={index}
              className="min-w-[150px] md:min-w-[180px] h-32 md:h-40 mx-2 md:mx-3 bg-white rounded-full flex items-center justify-center shadow"
            >
              <img
                src={item.img}
                alt={item.label}
                className="max-h-24 md:max-h-32 object-contain p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bannerbottom;
