import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Add this import
import { setCategory } from "../redux/Filterslice";
import { openCartPopup } from "../redux/CartPopupSlice";
import Topweardata from "../data/Topweardata";
import BottomwearData from "../data/Bottomweardata";
// import EthnicwearData from "../data/Ethnicweardata";
import { FaStar } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import cart from "../assets/market.png";

import { AddtoCart } from "../redux/Cartslice";

const Category = () => {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add this hook

  // Add item to cart and automatically show cart popup
  const handleAddToCart = (item, event) => {
    event.stopPropagation(); // Prevent navigation when clicking add to cart
    dispatch(AddtoCart(item));
    setShowCart(true); // Automatically show cart popup
    toast.success(`${item.name} added to cart!`, { icon: "🛍️" });
  };

  // Handle product click to navigate to details page
  const handleProductClick = (productId) => {
    console.log("🔍 Navigating to product ID:", productId); // Debug log
    navigate(`/product/${productId}`);
  };

  // Close cart popup
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
    // if (selectedcategory === "Ethnic & Traditional Wear") return EthnicwearData;
    return mergedproducts;
  };

  const filterproducts = getfilterproducts();

  const Togglewishlist = (id, event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent navigation when clicking wishlist

    const isInWishlist = wishlist.includes(id);

    if (isInWishlist) {
      setwishlist((prev) => prev.filter((itemId) => itemId !== id));
      toast("Removed from Wishlist", { icon: "❌" });
    } else {
      setwishlist((prev) => [...prev, id]);
      toast("Added to Wishlist", { icon: "❤️" });
    }
  };

  // Fixed: Add "All" category and update logic
  const categories = [
    "Top Wear",
    "Bottom Wear",
    "Ethnic & Traditional Wear",
  ];

  return (
    <>
      <div className="w-full pt-20 px-4 pb-10 bg-black min-h-screen">
        <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center mb-8">
          Find the Best Collection For You...! 🥰
        </h3>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat === "All" ? "" : cat))}
              className={`
                px-5 cursor-pointer py-2 rounded-full font-semibold transition-transform duration-300
                ${
                  selectedcategory === cat ||
                  (cat === "All" && selectedcategory === "")
                    ? "bg-blue-600 text-white shadow-lg scale-110"
                    : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
                }
                focus:outline-none focus:ring-4 focus:ring-blue-400
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2 sm:px-6">
          {filterproducts.map((item) => (
            <div
              key={item.id}
              onClick={() => handleProductClick(item.id)} // Add click handler
              className="relative border rounded-2xl shadow-md bg-white p-4 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105" // Add cursor-pointer and hover effect
            >
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-full h-56 sm:h-80 md:h-90 lg:h-100 object-cover rounded-xl mb-4 transition-transform duration-500"
              />

              {/* Wishlist Icon */}
              <button
                onClick={(e) => Togglewishlist(item.id, e)}
                className="absolute top-4 right-4 text-red-500 text-3xl cursor-pointer hover:scale-125 transition-transform bg-transparent border-none p-0 focus:outline-none"
              >
                {wishlist.includes(item.id) ? <FaHeart /> : <CiHeart />}
              </button>

              <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-gray-700">{item.rating}</span>
                <FaStar className="text-yellow-400" />
              </div>
              <p className="flex right-3 bottom-6 absolute text-center items-center text-blue-600 font-bold text-lg">
                ₹{item.price}
              </p>

              {/* Fixed: Add to Bag button now properly calls handleAddToCart */}
              <button
                onClick={(e) => handleAddToCart(item, e)} // Pass event to prevent navigation
                className="right-0 shadow-lg hover:bg-blue-500 font-bold duration-105 flex hover:scale-105 transition-all p-2 rounded-full w-fit cursor-pointer items-center text-center justify-end"
              >
                Add to Bag
                <img className="p-3 h-10 w-10" src={cart} alt="cart icon" />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Popup - Import your CartPopup component and uncomment this line */}
        {/* <CartPopup isOpen={showCart} onClose={closeCart} /> */}

        {/* Temporary cart popup for testing - remove when using actual CartPopup */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Item Added to Cart! 🛍️
              </h3>
              <p className="text-gray-600 mb-4">
                Your item has been successfully added to the cart.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={closeCart}
                  className="flex-1 bg-gray-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Continue Shopping
                </button>
                <button   
                  onClick={() => {
                    closeCart(); // close local popup
                    dispatch(openCartPopup()); // open global CartPopup
                  }}
                  className="cursor-pointer flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View Bag
                </button>
              </div>
            </div>
          </div>
        )}

        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <hr className="text-white" />
      <footer>
        <div className=" table-footer-group  w-full  h-50">
        <ul className="text-white text-xl font-bold">About Us
          <li className="text-xs">Discover the passion behind Gurjar Collection – where style meets tradition.</li>
        </ul>
        <ul className="text-white font-bold">Contact Us: <li>Have questions? We're here to help</li></ul>
        </div>
      </footer>
    </>
  );
};

export default Category;