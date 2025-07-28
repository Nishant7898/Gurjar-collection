// src/components/ProductCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addtoCart } from "../Redux/cartslice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addtoCart(product));
  };

  return (
    <div className="border p-4 rounded-md shadow">
      <img src={product.img} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="font-bold">{product.name}</h2>
      <p>₹{product.price}</p>
      <button onClick={handleAddToCart} className="bg-blue-500 text-white p-2 mt-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
