import React from "react";
import { useNavigate } from "react-router-dom";

const images = [
  {
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Title: "T-Shirts",
    path: "/men/T-Shirts",
    subtitle: "From ₹499",
  },
  {
    img: "https://images.unsplash.com/photo-1630355734650-55fe91e1e5c7",
    Title: "Check Shirt",
    path: "/men/Check-Shirt",
    subtitle: "Upto 50% OFF",
  },
  {
    img: "https://images.unsplash.com/photo-1621773881532-fe65715b5137",
    Title: "Oversized Shirts",
    path: "/men/Oversized-Shirts",
    subtitle: "New Collection",
  },
  {
    img: "https://images.unsplash.com/photo-1612767809387-da2175a1796e",
    Title: "Formal Shirts",
    path: "/men/Formal-Shirts",
    subtitle: "Premium Wear",
  },
  {
    img: "https://images.unsplash.com/photo-1728782741559-a7e8d68b6a84",
    Title: "Baggy Jeans",
    path: "/men/Baggy Jeans",
    subtitle: "Relaxed Fits",
  },
  {
    img: "https://images.unsplash.com/photo-1546804506-56ebea62b782?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Title: "Formal Pants",
    path: "/men/Formal Pants",
    subtitle: "Tailored to Perfection",
  },
  {
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
    Title: "Oversized T-Shirts",
    path: "/men/Oversized T-Shirts",
    subtitle: "Casual Comfort",
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

      <div className="mt-5 scroll-smooth grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
        {images.map((item, index) => (
          <button
            key={item.Title}
            onClick={() => navigate(item.path)}
            className="cursor-pointer group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <img
              src={item.img}
              alt={item.Title}
              loading="lazy"
              className="w-full h-[500px] object-cover group-hover:scale-105 opacity-0 transition-opacity duration-300"
              onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
              onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent text-white px-4 py-3">
              <h3 className="text-xl font-semibold">{item.Title}</h3>
              <p className="text-sm text-gray-200">{item.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenSection;