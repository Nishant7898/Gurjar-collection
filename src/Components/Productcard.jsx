// src/components/ProductCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartslice"; // ✅ Fix action import
import { toast } from "react-toastify"; // optional

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="border p-4 rounded-md shadow hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="font-bold text-lg mt-2">{product.name}</h2>
      <p className="text-gray-700 mt-1">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 mt-3 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
