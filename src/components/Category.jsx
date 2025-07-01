import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../redux/Filterslice";
import { openCartPopup } from "../redux/CartPopupSlice";
import Topweardata from "../data/Topweardata";
import BottomwearData from "../data/Bottomweardata";
import { FaStar } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import cart from "../assets/market.png";
import { AddtoCart } from "../redux/Cartslice";

const Category = () => {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (item, event) => {
    event.stopPropagation();
    dispatch(AddtoCart(item));
    setShowCart(true);
    toast.success(`${item.name} added to cart!`, {
      icon: "🌸",
      style: {
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        color: "#0f766e",
        border: "1px solid #99f6e4",
        borderRadius: "12px",
        fontWeight: "500",
      },
    });
  };

  const handleProductClick = (productId) => {
    console.log("🔍 Navigating to product ID:", productId);
    navigate(`/product/${productId}`);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  const mergedproducts = [
    ...BottomwearData.slice(0, 4),
    ...Topweardata.slice(0, 4),
  ];

  const selectedcategory = useSelector((state) => state.filter.category);
  const [wishlist, setwishlist] = useState([]);

  const getfilterproducts = () => {
    if (selectedcategory === "Top Wear") return Topweardata;
    if (selectedcategory === "Bottom Wear") return BottomwearData;
    return mergedproducts;
  };

  const filterproducts = getfilterproducts();

  const Togglewishlist = (id, event) => {
    event.preventDefault();
    event.stopPropagation();

    const isInWishlist = wishlist.includes(id);

    if (isInWishlist) {
      setwishlist((prev) => prev.filter((itemId) => itemId !== id));
      toast("Removed from Wishlist", {
        icon: "💔",
        style: {
          background: "linear-gradient(135deg, #fef7f7 0%, #fde8e8 100%)",
          color: "#be185d",
          border: "1px solid #fbb6ce",
          borderRadius: "12px",
        },
      });
    } else {
      setwishlist((prev) => [...prev, id]);
      toast("Added to Wishlist", {
        icon: "💖",
        style: {
          background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
          color: "#be185d",
          border: "1px solid #f9a8d4",
          borderRadius: "12px",
        },
      });
    }
  };

  const categories = ["Top Wear", "Bottom Wear", "Ethnic & Traditional Wear"];

  return (
    <>
      {/* Main Container with peaceful gradient background */}
      <div
        className="w-full pt-20 px-4 pb-10 min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #ecfdf5 50%, #fef7f7 75%, #f8fafc 100%)",
          animation: "gentleGlow 8s ease-in-out infinite",
        }}
      >
        {/* Floating particles animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-teal-200/30 to-blue-200/30 animate-pulse"
              style={{
                width: Math.random() * 8 + 4 + "px",
                height: Math.random() * 8 + 4 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animationDelay: Math.random() * 4 + "s",
                animationDuration: Math.random() * 3 + 4 + "s",
              }}
            />
          ))}
        </div>

        {/* Header with gentle fade-in animation */}
        <div className="text-center mb-12 animate-fade-in">
          <h3
            className="text-3xl sm:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 mb-2"
            style={{ animation: "slideDown 1s ease-out" }}
          >
            Discover Your Perfect Style ✨
          </h3>
          <p className="text-slate-600 font-light text-lg opacity-80">
            Find serenity in every piece of our curated collection
          </p>
        </div>

        {/* Category Buttons with enhanced peaceful styling */}
        <div
          className="flex flex-wrap justify-center gap-6 mb-12"
          style={{ animation: "slideUp 1s ease-out 0.3s both" }}
        >
          {categories.map((cat, index) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat === "All" ? "" : cat))}
              className="group relative overflow-hidden px-8 py-3 rounded-full font-medium transition-all duration-500 transform hover:scale-105"
              style={{
                background:
                  selectedcategory === cat ||
                  (cat === "All" && selectedcategory === "")
                    ? "linear-gradient(135deg, #0f766e 0%, #0891b2 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
                color:
                  selectedcategory === cat ||
                  (cat === "All" && selectedcategory === "")
                    ? "#ffffff"
                    : "#475569",
                boxShadow:
                  selectedcategory === cat ||
                  (cat === "All" && selectedcategory === "")
                    ? "0 8px 25px rgba(15, 118, 110, 0.3)"
                    : "0 4px 15px rgba(148, 163, 184, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <span className="relative z-10">{cat}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          ))}
        </div>

        {/* Product Grid with stagger animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2 sm:px-6">
          {filterproducts.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleProductClick(item.id)}
              className="group relative overflow-hidden rounded-3xl shadow-lg bg-white/80 backdrop-blur-sm p-6 cursor-pointer transition-all duration-700 hover:shadow-2xl"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                border: "1px solid rgba(255, 255, 255, 0.6)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
              }}
            >
              {/* Image container with overlay effect */}
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Wishlist button with floating effect */}
                <button
                  onClick={(e) => Togglewishlist(item.id, e)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm text-rose-500 text-xl cursor-pointer transition-all duration-300 hover:scale-125 hover:bg-white flex items-center justify-center shadow-lg"
                  style={{
                    animation: "float 3s ease-in-out infinite",
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  {wishlist.includes(item.id) ? <FaHeart /> : <CiHeart />}
                </button>
              </div>

              {/* Product details with smooth animations */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800 truncate group-hover:text-teal-700 transition-colors duration-300">
                  {item.name}
                </h2>

                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-700">
                    {item.rating}
                  </span>
                  <FaStar className="text-amber-400 animate-pulse" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                    ₹{item.price}
                  </p>

                  {/* Enhanced Add to Bag button */}
                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    className="group/btn relative overflow-hidden px-6 py-2 rounded-full font-medium text-white transition-all duration-500 hover:scale-105 hover:shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #0f766e 0%, #0891b2 100%)",
                      boxShadow: "0 4px 15px rgba(15, 118, 110, 0.3)",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Add to Bag
                      <img
                        className="h-5 w-5 transition-transform group-hover/btn:rotate-12"
                        src={cart}
                        alt="cart"
                      />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Cart Popup */}
        {showCart && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            style={{ animation: "fadeIn 0.3s ease-out" }}
          >
            <div
              className="bg-white/95 backdrop-blur-md p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl border border-white/50"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
                animation: "scaleIn 0.4s ease-out",
              }}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🌸</div>
                <h3 className="text-2xl font-light text-slate-800 mb-2">
                  Added to Your Collection
                </h3>
                <p className="text-slate-600 font-light">
                  Your item has been gracefully added to the cart
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={closeCart}
                  className="flex-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-6 py-3 rounded-2xl hover:from-slate-200 hover:to-slate-300 transition-all duration-300 font-medium"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={() => {
                    closeCart();
                    dispatch(openCartPopup());
                  }}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-2xl hover:from-teal-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg"
                >
                  View Bag
                </button>
              </div>
            </div>
          </div>
        )}

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "14px",
              fontWeight: "500",
            },
          }}
        />
      </div>

      {/* Enhanced Footer */}
      <footer
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 animate-pulse"></div>
        </div>

        <div className="relative px-8 py-12">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-2xl font-light text-white mb-4">About Us</h4>
              <p className="text-slate-300 leading-relaxed font-light">
                Discover the passion behind Gurjar Collection – where style
                meets tradition in perfect harmony.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-2xl font-light text-white mb-4">
                Contact Us
              </h4>
              <p className="text-slate-300 leading-relaxed font-light">
                Have questions? We're here to help you find your perfect style.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gentleGlow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </>
  );
};

export default Category;
