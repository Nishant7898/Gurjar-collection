import React from "react";
import { useNavigate } from "react-router-dom";

const images = [
  {
    img: "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
    Title: "T-Shirts",
    path: "/tshirt",
    subtitle: "From ₹499",
  },
  {
    img: "https://images.unsplash.com/photo-1630355734650-55fe91e1e5c7",
    Title: "Check Shirts",
    path: "/checkshirts",
    subtitle: "Upto 50% OFF",
  },
  {
    img: "https://images.unsplash.com/photo-1621773881532-fe65715b5137",
    Title: "Oversized Shirts",
    path: "/oversized",
    subtitle: "New Collection",
  },
  {
    img: "https://images.unsplash.com/photo-1612767809387-da2175a1796e",
    Title: "Formal Shirts",
    path: "/formalshirt",
    subtitle: "Premium Wear",
  },
  {
    img: "https://images.unsplash.com/photo-1582552938357-32b906df40cb",
    Title: "Jeans",
    path: "/men/jeans",
    subtitle: "Denim Vibes",
  },
  {
    img: "https://images.unsplash.com/photo-1617951907145-53f6eb87a3a3",
    Title: "Innerwear",
    path: "/men/innerwear",
    subtitle: "Comfort First",
  },
    {
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Title: "Trouser",
    path: "/men/trouser",
    subtitle: "Effortless style",
  },
  {
    img: "https://images.unsplash.com/photo-1728782741559-a7e8d68b6a84?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Title: "Baggy Jeans",
    path: "/men/Baggyjeans",
    subtitle: "Relaxed fits",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1674777843523-3bc9b9986ac7?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Title: "Formal Pants",
    path: "/men/trouser",
    subtitle: "Tailored to perfection",
  },
    {
    img: "https://images.unsplash.com/photo-1536244955395-0b8a2a5ab5df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Title: "Sports Wear",
    path: "/men/sports",
    subtitle: "Sweat in Style – Power Up Your Gym Look",
  },
];

const MenSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-30 px-4 md:px-50">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Explore Men's Fashion
      </h2>
      <p className="text-3xl font-semibold">Shop By Categories</p>

      <div className="mt-5 scroll-smooth  grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
        {images.map((item, index) => (
          <div
            key={index} 
            onClick={() => navigate(item.path)}
            className="cursor-pointer group relative  overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <img
              src={item.img}
              alt={item.Title}
              loading="lazy"
              className="w-full h-[500px] object-cover group-hover:scale-105 opacity-0 transition-opacity duration-300"
              onLoad={(e)=>e.currentTarget.classList.remove("opacity-0")}
            />

            {/* Gradient Overlay */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent text-white px-4 py-3">
              <h3 className="text-xl font-semibold">{item.Title}</h3>
              <p className="text-sm text-gray-200">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenSection;
