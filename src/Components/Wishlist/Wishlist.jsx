import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../Redux/Wishlistslice";
import { addToCart } from "../../Redux/cartslice";
import { toast } from "react-toastify";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";

const WishlistItem = memo(({ item, onRemove }) => {
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const isInCart =
    Array.isArray(cart) &&
    cart.some(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

  const handleButtonClick = () => {
    if (!added && !isInCart) {
      dispatch(addToCart({ ...item, quantity: 1 }));
      setAdded(true);
    } else {
      navigate("/cart");
    }
  };

  const price =
    typeof item.price === "number" ? item.price : Number(item.price) || 0;

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center border-b pb-6 last:border-b-0 group">
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0">
        <img
          src={item.img || "/placeholder-product.jpg"}
          alt={item.name || item.desc || "Product"}
          className="h-full w-full object-cover rounded-lg shadow-md"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder-product.jpg";
          }}
        />
        {item.size && (
          <span className="absolute top-2 left-2 bg-white text-xs font-medium px-2 py-1 rounded-full shadow">
            {item.size}
          </span>
        )}
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-medium text-gray-900 text-lg line-clamp-2">
          {item.name || item.desc}
        </h3>
        <p className="text-orange-600 font-semibold mt-1 text-lg">
          ₹{price.toLocaleString("en-IN")}
        </p>
      </div> 

      <div className="flex gap-3 sm:flex-col sm:gap-2 w-full sm:w-auto">
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          aria-label={`${added || isInCart ? "Go to Cart" : "Add to Cart"}`}
          type="button"
        >
          <ShoppingBag className="h-2   w-2" />
          <span>{added || isInCart ? "Go to Cart" : "Add to Cart"}</span>
        </button>

        <button
          onClick={() => {
            onRemove(item);
            toast.info(`${item.name || item.desc} removed from wishlist.`);
          }}
          className="border border-gray-300 hover:border-red-500 hover:text-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          aria-label={`Remove ${item.name || item.desc} from wishlist`}
          type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
});

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeFromWishlist(item));
  };

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to cart");
      return;
    }

    const cartItem = {
      ...item,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));
    toast.success(`${item.name || item.desc} added to cart!`);
  };

  return (
    <main className="py-6 px-4 sm:px-6 max-w-6xl mx-auto min-h-[60vh]">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Wishlist
        </h2>
        <p className="text-gray-500 mt-1">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-white  rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500 mt-1">Save items in your wishlist</p>
        </div>
      ) : (
        <section className="grid gap-6 divide-y divide-gray-200">
          {wishlist.map((item) => (
            <WishlistItem
              key={`${item.id}-${item.size || ""}`}
              item={item}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default Wishlist;
