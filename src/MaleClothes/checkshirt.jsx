import React, { useState, useEffect } from "react";
import { Heart, ListFilter } from "lucide-react";
import MenCollection from "../ClothesData(M)/MenCollection";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartslice";
import { toast } from "react-toastify";

const Checkshirt = () => {
  const checkshirt = MenCollection.filter(
    (item) => item.category === "Check Shirt"
  );

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

  const handleLoadMore = () => {
    setvisiblecount((prev) => prev + (ismobile ? 4 : 6));
  };

  const filtered = checkshirt.filter((item) => {
    const price = parseInt(item.price.replace("₹", "").replace(",", ""));
    if (selectedPrice === "below500") return price < 500;
    if (selectedPrice === "500to800") return price >= 500 && price <= 800;
    if (selectedPrice === "above800") return price > 800;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const priceA = parseInt(a.price.replace("₹", "").replace(",", ""));
    const priceB = parseInt(b.price.replace("₹", "").replace(",", ""));
    if (sortOrder === "lowToHigh") return priceA - priceB;
    if (sortOrder === "highToLow") return priceB - priceA;
    return 0;
  });

  // ------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const handleAddToCart = (item) => {
    if (!user) {
      toast.warn("⚠️ Please log in to add items to cart!", {
        position: "top-right",
        autoClose: 3000,
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
        <img src={item.img} alt={item.desc} className="w-10 h-10 rounded" />
        <span>✅ {item.desc} added to cart</span>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
      }
    );
  };
  return (
    <div className="min-h-screen px-4 py-30">
      {/* Filter and Sort Controls */}
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

      {/* Product Grid */}
      <div className="grid grid-cols-2 w-full px-4 md:px-50 md:grid-cols-4 gap-6">
        {sorted.slice(0, visiblecount).map((item, index) => (
          <div
            key={item.id || `product-${index}`}
            className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            {/* Heart Icon */}
            <button className="absolute top-1 right-3 text-gray-400 p-1 z-10">
              <Heart size={20} />
            </button>

            {/* Image */}
            <img
              src={item.img}
              alt={item.desc}
              className="w-[300px] h-[300px] object-cover"
            />

            {/* Product Info */}
            <div className="p-3">
              <p className="font-semibold text-lg">{item.desc}</p>
              <span className="mt-5 flex flex-row">
                <p className="text-green-600 font-semibold text-md mt-1">
                  {item.price}{" "}
                  <span className="line-through font-semibold text-gray-400">
                    {item.MRP}
                  </span>
                </p>
              </span>
              <p className="text-red-500 font-semibold text-sm">
                {item.discount}
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(item)}
              className="mt-3 flex ml-[8vw] mb-4 bg-orange-600 font-bold text-white px-4 py-1 rounded-md hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {visiblecount < sorted.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkshirt;
