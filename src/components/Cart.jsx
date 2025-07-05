import React from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Cartslice";
import Topweardata from "../data/Topweardata";
import BottomwearData from "../data/Bottomweardata";

const Cart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedsize, setselectedsize] = useState(null);
  const allproducts=[...Topweardata,BottomwearData]
  const product=allproducts.find((item)=>item.id===parseInt(id))
  const handleaddtocart=()=>{
    if(!selectedsize) return alert("Select a Size")
      dispatch(addToCart({...product,selectedsize}));
    alert(`${product.name}added to the cart!`)
  }
  const handlebuynow=()=>{
    if(!selectedsize) return alert("Select a Size")
      localStorage.setItem("Buy Now",JSON.stringify({...product,selectedsize}))
    window.location.href= "/payment"
  }

  return product ?( 
       <div className="p-6">
      <img src={product.image[0]} alt={product.name} className="w-full max-w-md rounded" />
      <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-600 my-2">{product.description}</p>
      <p className="text-lg font-semibold text-pink-600">₹{product.price}</p>
       <div className="mt-4">
        <p className="font-semibold mb-1">Select Size:</p>
        <div className="flex gap-2">
          {product.size.map((s) => (
            <button
              key={s}
              onClick={() => setselectedsize(s)}
              className={`px-4 py-2 border rounded ${selectedsize === s ? "bg-pink-600 text-white" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleaddtocart}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
        <button
          onClick={handlebuynow}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Buy Now
        </button>
      </div>
  </div>): (
    <p className="text-center text-gray-500 mt-10">Product not found.</p>
  );
};


export default Cart;