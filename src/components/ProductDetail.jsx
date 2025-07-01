import React, { useState, useEffect } from "react";
import { ArrowLeft, Heart, Share, Star, Plus, Minus, ShoppingBag, Zap, Truck, RotateCcw, Shield, Sparkles } from "lucide-react";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Mock product data
  const product = {
    name: "Celestial Dream Hoodie",
    price: 2499,
    rating: 4.8,
    reviews: 247,
    description: "Embrace the cosmic comfort with our premium celestial hoodie. Crafted with love from sustainable materials, this piece brings together comfort and consciousness. Perfect for your mindful moments and peaceful adventures.",
    image: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&h=600&fit=crop"
    ]
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${4 + Math.random() * 3}s`
          }}
        >
          <Sparkles 
            className="text-blue-200/10 w-3 h-3" 
            style={{
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        </div>
      ))}
    </div>
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Toast notification would go here
      return;
    }
    console.log("Added to cart:", { product, selectedSize, quantity });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      return;
    }
    console.log("Buy now:", { product, selectedSize, quantity });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 text-white relative overflow-hidden">
      <FloatingElements />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/3 left-1/5 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className={`flex items-center gap-3 text-white/80 hover:text-blue-400 mb-8 transition-all duration-500 hover:scale-105 group ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Collection</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images */}
            <div className={`space-y-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Main Image */}
              <div className="relative group">
                <div className="aspect-square bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-3xl overflow-hidden backdrop-blur-sm border border-gray-600/30 shadow-2xl">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={product.image[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onLoad={() => setImageLoading(false)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Image Thumbnails */}
              {product.image.length > 1 && (
                <div className="flex gap-4 justify-center">
                  {product.image.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-110 ${
                        selectedImage === index
                          ? "ring-3 ring-blue-400 shadow-lg shadow-blue-400/30 scale-110"
                          : "ring-2 ring-gray-600/50 hover:ring-gray-400/70"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedImage === index && (
                        <div className="absolute inset-0 bg-blue-400/20"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className={`space-y-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-semibold text-yellow-400">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="flex gap-3 ml-4">
                  <button
                    onClick={toggleWishlist}
                    className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                      isWishlisted
                        ? "bg-pink-500/20 text-pink-400 shadow-lg shadow-pink-500/20"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                  </button>
                  <button className="p-3 rounded-full bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white transition-all duration-300 hover:scale-110">
                    <Share className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                ₹{product.price.toLocaleString()}
              </div>

              {/* Description */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold mb-3 text-blue-300">About this product</h3>
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Choose your size</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-4 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                        selectedSize === size
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-amber-400 text-sm mt-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Please select a size to continue your journey
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Quantity</h3>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-600/50"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-600/50"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 border border-gray-600/50 flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-3"
                >
                  <Zap className="w-5 h-5" />
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Truck className="w-6 h-6 text-green-400" />
                    <div className="text-green-400 font-semibold">Free Delivery</div>
                  </div>
                  <div className="text-sm text-gray-400">On orders above ₹999</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <RotateCcw className="w-6 h-6 text-blue-400" />
                    <div className="text-blue-400 font-semibold">Easy Returns</div>
                  </div>
                  <div className="text-sm text-gray-400">7 days return policy</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 sm:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-6 h-6 text-purple-400" />
                    <div className="text-purple-400 font-semibold">Secure & Sustainable</div>
                  </div>
                  <div className="text-sm text-gray-400">Eco-friendly materials with secure payment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;