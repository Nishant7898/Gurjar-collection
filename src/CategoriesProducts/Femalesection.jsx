// Femalesection.jsx

import React, { useState, useEffect } from "react";
import { Heart, ListFilter } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartslice";
import toast from "react-hot-toast";
import Womencollection from "../ClothesData/Womencollection";
import { addToWishlist, removeFromWishlist } from "../Redux/Wishlistslice";

// ---------------- Product Grid ----------------
const ProductGrid = ({
  items,
  visiblecount,
  handleLoadMore,
  ismobile,
  handleProductClick,
  handleAddToCart,
}) => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  // Custom Wishlist Toast
  const showWishlistToast = (product, type) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } bg-white shadow-lg rounded-lg flex items-center gap-3 p-3 border-l-4 ${
          type === "add" ? "border-green-500" : "border-red-500"
        }`}
      >
        <img
          src={product.img}
          alt={product.Name || product.desc}
          className="w-12 h-12 object-cover rounded"
        />
        <div className="text-sm">
          <p className="font-semibold">{product.Name || product.desc}</p>
          <p className={type === "add" ? "text-green-600" : "text-red-600"}>
            {type === "add"
              ? "Added to Wishlist ❤️"
              : "Removed from Wishlist 💔"}
          </p>
        </div>
      </div>
    ));
  };

  const handleToggleWishlist = (item) => {
    if (isWishlisted(item.id)) {
      dispatch(removeFromWishlist(item.id)); // ✅ always send `id`
      showWishlistToast(item, "remove");
    } else {
      dispatch(addToWishlist(item)); // ✅ always send full object
      showWishlistToast(item, "add");
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 w-full px-4 md:px-50 md:grid-cols-4 gap-6">
        {items.slice(0, visiblecount).map((item) => (
          <div
            key={item.id}
            className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            {/* Wishlist Heart */}
            <button
              className="absolute top-1 right-3 p-1 z-10"
              onClick={() => handleToggleWishlist(item)}
              aria-label="Toggle wishlist"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <Heart
                color={isWishlisted(item.id) ? "red" : "gray"}
                fill={isWishlisted(item.id) ? "red" : "none"}
                size={20}
                strokeWidth={2.5}
              />
            </button>

            {/* Product Image */}
            <div
              onClick={() => handleProductClick(item)}
              className="cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.desc}
                loading="lazy"
                className="w-[300px] h-[300px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Details */}
            <div className="p-3">
              <p className="font-semibold text-lg">{item.desc}</p>
              <span className="mt-5 flex flex-row">
                <p className="text-green-600 font-semibold text-md mt-1">
                  {item.price}
                  <span className="line-through font-semibold text-gray-400 ml-2">
                    {item.MRP}
                  </span>
                </p>
              </span>
              <p className="text-red-500 font-semibold text-sm">
                {item.discount}
              </p>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => handleAddToCart(item)}
              className="mt-3 flex ml-[8vw] mb-4 bg-orange-600 font-bold text-white px-4 py-1 rounded-md hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Load More */}
      {visiblecount < items.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

// ---------------- Female Section ----------------
const Femalesection = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);

  const handleProductClick = (item) => {
    const productId =
      item.id || `product-${item.desc?.replace(/\s+/g, "-").toLowerCase()}`;
    navigate(`/product/${productId}`, { state: { product: item } });
  };

  const handleAddToCart = (item) => {
    if (!user) {
      toast.error("⚠️ Please log in to add items to cart!");
      return;
    }

    dispatch(
      addToCart({
        id: item.id,
        desc: item.desc,
        price: item.price,
        quantity: 1,
      })
    );

    toast.success(
      <div className="flex items-center gap-3">
        <img src={item.img} alt={item.desc} className="w-10 h-10 rounded" />
        <span>✅ {item.desc} added to cart</span>
      </div>
    );
  };

  const validCategories = ["Tops", "T-Shirts", "Skirts", "Salwar-Suits"];

  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [visiblecount, setvisiblecount] = useState(12);
  const [ismobile, setismobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setismobile(mobile);
      setvisiblecount(mobile ? 8 : 12);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (category && validCategories.includes(category)) {
      setSelectedCategory(category);
      setvisiblecount(ismobile ? 8 : 12);
    } else if (category && !validCategories.includes(category)) {
      navigate(`/women`);
      setSelectedCategory("");
    }
  }, [category, navigate, ismobile]);

  const handleLoadMore = () => {
    setvisiblecount((prev) => prev + (ismobile ? 4 : 6));
  };

  const categories = {
    Tops: Womencollection.filter((item) => item.category === "Tops"),
    "T-Shirts": Womencollection.filter((item) => item.category === "T-Shirts"),
    Skirts: Womencollection.filter((item) => item.category === "Skirts"),
    "Salwar-Suits": Womencollection.filter(
      (item) => item.category === "Salwar-Suits"
    ),
  };

  const filteredItems = selectedCategory
    ? categories[selectedCategory] || Womencollection
    : Womencollection;

  const filtered = filteredItems.filter((item) => {
    const price = parseInt(item.price?.replace("₹", "").replace(",", "") || 0);
    if (selectedPrice === "below500") return price < 500;
    if (selectedPrice === "500to800") return price >= 500 && price <= 800;
    if (selectedPrice === "above800") return price > 800;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const priceA = parseInt(a.price?.replace("₹", "").replace(",", "") || 0);
    const priceB = parseInt(b.price?.replace("₹", "").replace(",", "") || 0);
    if (sortOrder === "lowToHigh") return priceA - priceB;
    if (sortOrder === "highToLow") return priceB - priceA;
    return 0;
  });

  return (
    <div className="min-h-screen px-4 py-30">
      {/* Categories */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => {
            navigate(`/women`);
            setSelectedCategory("");
          }}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            !selectedCategory
              ? "bg-orange-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-orange-600 hover:text-white"
          }`}
        >
          All
        </button>
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              navigate(`/women/${cat}`);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCategory === cat
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-orange-600 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between mb-8">
        {/* Price Filter */}
        <div className="relative">
          <select
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="appearance-none w-full md:w-48 bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg"
          >
            <option value="">Filter by Price</option>
            <option value="below500">Below ₹500</option>
            <option value="500to800">₹500 - ₹800</option>
            <option value="above800">Above ₹800</option>
          </select>
          <ListFilter
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        {/* Sort */}
        <div className="relative">
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none w-full md:w-48 bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg"
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
          <ListFilter
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        items={sorted}
        visiblecount={visiblecount}
        handleLoadMore={handleLoadMore}
        ismobile={ismobile}
        handleProductClick={handleProductClick}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Femalesection;
