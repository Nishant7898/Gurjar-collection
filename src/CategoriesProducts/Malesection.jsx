import React, { useState, useEffect } from "react";
import { Heart, ListFilter } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartslice";
import toast from "react-hot-toast";
import MenCollection from "../ClothesData/MenCollection";
import { addToWishlist, removeFromWishlist } from "../Redux/Wishlistslice";

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
  const user = useSelector((state) => state.auth.currentUser);

  // Fixed wishlist check - handle different possible wishlist structures
  const isWishlisted = (id) => {
    if (!wishlist) return false;
    
    // If wishlist is an array
    if (Array.isArray(wishlist)) {
      return wishlist.some((item) => item.id === id);
    }
    
    // If wishlist has an items property that's an array
    if (wishlist.items && Array.isArray(wishlist.items)) {
      return wishlist.items.some((item) => item.id === id);
    }
    
    return false;
  };

  const toggleWishlist = (item) => {
    if (!user) {
      toast.error("Please Login!", {
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#ef4444",
          fontSize: "16px",
          fontWeight: "600",
          padding: "16px",
        },
        icon: "⚠️",
        duration: 3000,
      });
      return;
    }

    const isCurrentlyWishlisted = isWishlisted(item.id);
    
    if (isCurrentlyWishlisted) {
      dispatch(removeFromWishlist(item.id));
      toast.success(
        <div className="flex items-center gap-3">
          <img
            src={item.img}
            alt={item.Name || item.desc}
            className="w-12 h-12 rounded-md object-cover"
          />
          <span className="font-semibold text-gray-800">
            {item.Name || item.desc} removed from wishlist
          </span>
        </div>,
        {
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "#374151",
            border: "1px solid #f3f4f6",
          },
          icon: "💔",
          duration: 2500,
        }
      );
    } else {
      dispatch(addToWishlist(item));
      toast.success(
        <div className="flex items-center gap-3">
          <img
            src={item.img}
            alt={item.Name || item.desc}
            className="w-12 h-12 rounded-md object-cover"
          />
          <span className="font-semibold text-gray-800">
            {item.Name || item.desc} added to wishlist
          </span>
        </div>,
        {
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "#374151",
            border: "1px solid #f3f4f6",
          },
          icon: "❤️",
          duration: 2500,
        }
      );
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
            <button
              className="absolute top-2 right-2 p-2 z-10 bg-white/80 rounded-full hover:bg-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(item);
              }}
              aria-label="Toggle wishlist"
            >
              <Heart
                color="#ef4444"
                fill={isWishlisted(item.id) ? "#ef4444" : "none"}
                size={22}
                strokeWidth={2}
                className="transition-all duration-200"
              />
            </button>

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

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(item);
              }}
              className="mt-3 flex ml-[8vw] mb-4 bg-orange-600 font-bold text-white px-4 py-1 rounded-md hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

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

const Malesection = () => {
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
      toast.error("Please Login!", {
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#ef4444",
          fontSize: "16px",
          fontWeight: "600",
          padding: "16px",
        },
        icon: "⚠️",
        duration: 3000,
      });
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
        <img 
          src={item.img} 
          alt={item.desc} 
          className="w-12 h-12 rounded-md object-cover" 
        />
        <span className="font-semibold text-gray-800">
          {item.desc} added to cart
        </span>
      </div>,
      {
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#374151",
          border: "1px solid #f3f4f6",
        },
        duration: 2500,
      }
    );
  };

  const validCategories = [
    "Formal-Shirts",
    "T-Shirts",
    "Oversized-T-Shirts",
    "Check-Shirt",
    "Oversized-Shirts",
  ];

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
      navigate(`/men`);
      setSelectedCategory("");
    }
  }, [category, navigate, ismobile]);

  const handleLoadMore = () => {
    setvisiblecount((prev) => prev + (ismobile ? 4 : 6));
  };

  const categories = {
    "Formal-Shirts": MenCollection.filter(
      (item) => item.category.trim() === "Formal Shirts"
    ),
    "T-Shirts": MenCollection.filter((item) => item.category === "T-Shirts"),
    "Oversized-T-Shirts": MenCollection.filter(
      (item) => item.category === "Oversized T-Shirts"
    ),
    "Check-Shirt": MenCollection.filter(
      (item) => item.category === "Check Shirt"
    ),
    "Oversized-Shirts": MenCollection.filter(
      (item) => item.category === "Oversized Shirts"
    ),
  };

  const filteredItems = selectedCategory
    ? categories[selectedCategory] || MenCollection
    : MenCollection;

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
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => {
            navigate(`/men`);
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
              navigate(`/men/${cat}`);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCategory === cat
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-orange-600 hover:text-white"
            }`}
          >
            {cat.replace(/-/g, " ")}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 justify-between mb-8">
        <div className="relative">
          <select
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="appearance-none w-full md:w-48 bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 cursor-pointer"
          >
            <option value="">Filter by Price</option>
            <option value="below500">Below ₹500</option>
            <option value="500to800">₹500 - ₹800</option>
            <option value="above800">Above ₹800</option>
          </select>
          <ListFilter
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>

        <div className="relative">
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none w-full md:w-48 bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 cursor-pointer"
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
          <ListFilter
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

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

export default Malesection;