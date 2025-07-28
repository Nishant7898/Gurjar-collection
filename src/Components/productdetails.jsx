import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartslice";
import { addToWishlist, removeFromWishlist } from "../Redux/Wishlistslice";
import { toast } from "react-toastify";
import { ArrowLeft, Heart, Star, Truck, Shield, RotateCcw } from "lucide-react";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Product from location state or Redux state
  const allProducts = useSelector((state) => state.product?.allproducts) || [];
  const product = location.state?.product || allProducts.find((p) => p.id === id);

  const user = useSelector((state) => state.auth.currentUser);
  const wishlist = useSelector((state) => state.wishlist);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check if product is wishlisted
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // Toggle wishlist add/remove
  const toggleWishlist = () => {
    if (!user) {
      toast.warn("⚠️ Please log in to manage wishlist!", {
        position: "top-right",
      });
      return;
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist(product));
      toast.info("Removed from wishlist", { position: "top-right" });
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist", { position: "top-right" });
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (!user) {
      toast.warn("⚠️ Please log in to add items to cart!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        desc: product.desc,
        price: product.price,
        quantity: quantity,
        size: selectedSize,
      })
    );

    toast.success(
      <div className="flex items-center gap-3">
        <img src={product.img} alt={product.desc} className="w-10 h-10 rounded" />
        <span>✅ {product.desc} added to cart</span>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
      }
    );
  };

  const productImages = product.images || [product.img];

  return (
    <div className="min-h-screen bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Image Section */}
            <div className="space-y-4 relative">
              <img
                src={productImages[selectedImage]}
                alt={product.desc}
                className="w-full h-[500px] object-cover rounded-lg"
              />
              {/* Wishlist Heart Toggle */}
              <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                type="button"
              >
                <Heart
                  size={24}
                  color={isWishlisted ? "red" : "gray"}
                  fill={isWishlisted ? "red" : "none"}
                  strokeWidth={2.5}
                />
              </button>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {productImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${product.desc} ${index + 1}`}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                        selectedImage === index ? "border-orange-500" : "border-gray-200"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.desc}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-green-600">{product.price}</span>
                  {product.MRP && product.MRP !== product.price && (
                    <span className="text-xl text-gray-400 line-through">{product.MRP}</span>
                  )}
                  {product.discount && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                      {product.discount}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">(4.5) 128 reviews</span>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Size</h3>
                <div className="flex gap-2 flex-wrap">
                  {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition ${
                        selectedSize === size
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      type="button"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition"
                    aria-label="Decrease quantity"
                    type="button"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border border-gray-300 rounded min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition"
                    aria-label="Increase quantity"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                  type="button"
                >
                  Add to Cart
                </button>
                <button className="w-full border border-orange-600 text-orange-600 py-3 rounded-lg font-semibold hover:bg-orange-50 transition" type="button">
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck size={20} />
                    <span className="text-sm">Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <RotateCcw size={20} />
                    <span className="text-sm">Easy Returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield size={20} />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Category:</span> {product.category}
                  </p>
                  <p>
                    <span className="font-medium">Material:</span> 100% Cotton
                  </p>
                  <p>
                    <span className="font-medium">Care:</span> Machine wash cold
                  </p>
                  <p>
                    <span className="font-medium">Fit:</span> Regular fit
                  </p>
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
