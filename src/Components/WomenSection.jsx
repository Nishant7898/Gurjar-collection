import React from "react";
import { useNavigate } from "react-router-dom";

const images = [
  {
    img: "https://images.unsplash.com/photo-1630079632812-ad825086ac4e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Title: "Tops",
    path: "/women/Tops",
    subtitle: "From ₹799",
  },
  {
    img: "https://images.unsplash.com/photo-1597983073750-16f5ded1321f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Title: "Salwar Suit",
    path: "/women/Salwar-Suits",
    subtitle: "Upto 50% OFF",
  },
  {
    img: "https://images.unsplash.com/photo-1646054224885-f978f5798312?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Title: "Skirts",
    path: "/women/Skirts",
    subtitle: "New Collection",
  },
  {
    img: "https://images.unsplash.com/photo-1511550521256-8526928a8af5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Title: "T-shirts",
    path: "/women/T-Shirts",
    subtitle: "Premium Wear",
  },
];

const WomenSection = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-white py-30 px-4 md:px-50">

      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Explore Women's Fashion
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
              className="w-full h-[500px] object-cover opacity-0 group-hover:scale-105 transition-opacity duration-300"
              onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
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

export default WomenSection;
