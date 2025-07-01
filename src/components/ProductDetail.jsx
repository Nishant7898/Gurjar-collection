import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddtoCart } from "../redux/Cartslice";
import { openCartPopup } from "../redux/CartPopupSlice";
import Topweardata from "../data/Topweardata";
import BottomwearData from "../data/Bottomweardata";
// import EthnicwearData from "../data/Ethnicweardata";
import { FaStar, FaArrowLeft, FaHeart, FaShareAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Available sizes
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    // Get all products inside useEffect to avoid dependency issues
    const allProducts = [
      ...Topweardata,
      ...BottomwearData,
      // ...EthnicwearData,
    ];

    console.log("🔍 Debug Info:");
    console.log("URL ID:", id);
    console.log("URL ID (parsed):", parseInt(id));
    console.log("All products:", allProducts);
    console.log("Product IDs in data:", allProducts.map(item => ({ id: item.id, name: item.name })));

    // Try both string and number comparison
    const foundProduct = allProducts.find(item => 
      item.id === parseInt(id) || item.id === id || item.id.toString() === id
    );
    
    console.log("Found product:", foundProduct);

    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else {
      console.error("❌ Product not found! Available IDs:", allProducts.map(p => p.id));
      toast.error("Product not found!");
      navigate("/");
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    const cartItem = {
      ...product,
      selectedSize,
      quantity,
      cartId: `${product.id}-${selectedSize}` // Unique ID for cart item
    };

    dispatch(AddtoCart(cartItem));
    toast.success(`${product.name} added to cart!`, { icon: "🛍️" });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    const cartItem = {
      ...product,
      selectedSize,
      quantity,
      cartId: `${product.id}-${selectedSize}`
    };

    dispatch(AddtoCart(cartItem));
    dispatch(openCartPopup());
    toast.success("Added to cart! Opening bag...", { icon: "🛍️" });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist", {
      icon: isWishlisted ? "❌" : "❤️"
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-blue-400 mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden">
              <img
                src={product.image[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Thumbnails */}
            {product.image.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.image.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-blue-500 scale-110"
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title & Actions */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-semibold">{product.rating}</span>
                  <FaStar className="text-yellow-400" />
                  <span className="text-gray-400">(125 reviews)</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={toggleWishlist}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  {isWishlisted ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <CiHeart className="text-white text-xl" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <FaShareAlt className="text-white text-xl" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-blue-400">
              ₹{product.price}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Size</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border-2 rounded-lg font-semibold transition-all ${
                      selectedSize === size
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-red-400 text-sm mt-2">
                  Please select a size to continue
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-xl font-bold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 border-2 border-gray-600"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Buy Now
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-700">
              <div className="text-center p-4 bg-gray-900 rounded-lg">
                <div className="text-green-400 font-semibold">Free Delivery</div>
                <div className="text-sm text-gray-400">On orders above ₹999</div>
              </div>
              <div className="text-center p-4 bg-gray-900 rounded-lg">
                <div className="text-green-400 font-semibold">Easy Returns</div>
                <div className="text-sm text-gray-400">7 days return policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProductDetails;