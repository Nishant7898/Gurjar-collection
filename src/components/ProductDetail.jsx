import React from "react";
import  { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Topweardata from "../data/Topweardata";
import BottomwearData from "../data/Bottomweardata";

const ProductDetail = () => {
  const selectedcategory = useSelector((state) => state.filter.category);
  
 
  const getProducts = () => {
    switch (selectedcategory) {
      case "T-shirts":
      case "T-Shirts":
        return Topweardata;
      case "Bottom Wear":
      case "Bottomwear":
        return BottomwearData;
      default:
        return [];
    }
  };
    const navigate = useNavigate();
    useEffect(() => {
    if (!selectedcategory || selectedcategory === "All") {
      navigate("/");
    }
  }, [selectedcategory, navigate]);

  const Products = getProducts();


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          {selectedcategory}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {Products.length} {Products.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {Products.map((item) => (
          <div 
            key={item.id} 
            className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
          >
            {/* Product Image */}
            <div className="relative  overflow-hidden rounded-lg mb-3">
              <img
                src={item.image?.[0]} alt={item.name}
                className="h-48 sm:h-52 lg:h-100 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                {item.name}
              </h3>
              
              {item.description && (
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <p className="text-blue-600 font-semibold text-lg">
                  ₹{item.price ? item.price.toLocaleString() : 'N/A'}
                </p>
                
                {/* Add to Cart Button */}
                <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                  Add to Cart
                </button>
              </div>

              {/* Additional product details if available */}
              {item.originalPrice && item.originalPrice > item.price && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 line-through text-sm">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-green-600 text-sm font-medium">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}

        
              {item.rating && (
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">
                        {i < Math.floor(item.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">({item.rating})</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    
      {Products.length >= 10 && (
        <div className="text-center mt-8">
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;