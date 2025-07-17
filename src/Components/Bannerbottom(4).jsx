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
    label: "Levi's",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW12vHNlJJHJyScs-NCdsKX4aaUPPmqKuKzQ&s",
  },
  {
    label: "Puma",
    img: "https://www.step.org.uk/app/uploads/2018/07/Puma-logo-PNG-Transparent-Background.png",
  },
  {
    label: "H & M",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgJHaocOL5Kaq4xOVVpNFCDHSSITvwAl-8XQ&s",
  },
  {
    label: "Zara",
    img: "https://www.logo.wine/a/logo/Zara_(retailer)/Zara_(retailer)-Logo.wine.svg",
  },
  {
    label: "Louis Philippe",
    img: "https://images.seeklogo.com/logo-png/44/1/louis-philippe-logo-png_seeklogo-444256.png",
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
    img: "https://img.freepik.com/premium-photo/black-plain-shortsleeve-cotton-t-shirt-template-isolated-white-background_41929-3076.jpg",
  },
  {
    label: "InnerWear",
    img: "https://media.istockphoto.com/id/2156465403/photo/black-cotton-shorts-trousers-mockup-isolated-on-white-background-top-view-front-view-clothes.jpg?s=612x612&w=0&k=20&c=tI9fEHQDYeUd8BwM8zDmiK8fsaLubqyeCOysIm0-TTo=",
  },
  {
    label: "Jeans",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfBbrAhDsG0RrJrbh0Yk3uh_38tQNoIIdxaDjK2L0EkHXYlWp9Z7NlMO9RcuTTPhFGfqw&usqp=CAU",
  },
  {
    label: "Trouser",
    img: "https://st3.depositphotos.com/4709981/36013/i/450/depositphotos_360131744-stock-photo-white-pants-isolated-white-background.jpg",
  },
  {
    label: "OverSized T-shirt",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiZoNx5-qPyUCHWjNjDbF8N0-zpTsX3-DroQ&s",
  },
  {
    label: "Formal Shirt",
    img: "https://thestiffcollarcoupons.wordpress.com/wp-content/uploads/2014/01/men-formal-shirt.jpg",
  },
  {
    label: "Check Shirt",
    img: "https://thumbs.dreamstime.com/b/men-s-shirt-isolated-white-background-plain-woven-classic-summer-indigo-pink-big-check-clipping-path-included-cotton-332195674.jpg",
  },
  {
    label: "Tops",
    img: "https://i.etsystatic.com/11829525/r/il/be163e/6202886725/il_fullxfull.6202886725_9lzn.jpg",
  },
  {
    label: "Suit",
    img: "https://tiimg.tistatic.com/fp/1/002/800/ladies-suit-with-pajami-714.jpg",
  },
  {
    label: "Saari",
    img: "https://png.pngtree.com/png-clipart/20250126/original/pngtree-a-designer-saree-in-deep-blue-with-silver-sequins-png-image_20333532.png",
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
    let direction = 1;

    const scroll = () => {
      if (container) {
        container.scrollLeft += scrollSpeed * direction;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScrollLeft) {
          direction = -1;
        } else if (container.scrollLeft <= 0) {
          direction = 1;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="px-4 md:px-40 py-20 w-full">
      {/* Categories */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <p className="text-xl md:text-2xl font-bold">Shop By Categories</p>
        <div className="flex items-center gap-4 mt-3 md:mt-0">
          <button className="font-semibold text-sm md:text-base">See All</button>
          <div className="flex gap-2">
            <IoIosArrowDropleftCircle size={35} onClick={scrollLeft} className="cursor-pointer" />
            <IoIosArrowDroprightCircle size={35} onClick={scrollRight} className="cursor-pointer" />
          </div>
        </div>
      </div>

      <div
        ref={categoryScrollRef}
        className="flex gap-4 md:gap-6 md:overflow-hidden overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {categories.map((item, index) => (
          <div
            key={index}
            className="min-w-[160px] md:min-w-[200px] rounded-full bg-transparent flex flex-col items-center p-4"
          >
            <img
              src={item.img}
              alt={item.label}
              className="h-24 w-24 md:h-32 md:w-32 bg-transparent hover:scale-110 transition-transform"
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
              className="min-w-[150px] md:min-w-[200px] h-32 md:h-40 bg-white flex items-center justify-center"
            >
              <img
                src={item.img}
                alt={item.label}
                className="max-h-24 md:max-h-32 pl-1 pr-1 bg-transparent object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bannerbottom;
