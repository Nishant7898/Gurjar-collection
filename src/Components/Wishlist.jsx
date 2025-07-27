// src/components/Wishlist.jsx
import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../Redux/Wishlistslice";
import { toast } from "react-toastify";

const WishlistItem = memo(({ item, onRemove }) => (
  <div className="flex flex-col sm:flex-row gap-4 items-center border-b pb-4 last:border-b-0">
    <img
      src={item.img}
      alt={item.name || item.desc}
      className="h-20 w-20 sm:h-16 sm:w-16 object-cover rounded shadow-sm"
      loading="lazy"
    />
    <div className="flex-1 text-center sm:text-left">
      <p className="font-medium text-gray-900 text-lg truncate">{item.name || item.desc}</p>
      <p className="text-gray-600 text-sm mt-1">₹{item.price}</p>
    </div>
    <button
      onClick={() => {
        onRemove(item);
        toast.info(`${item.name || item.desc} removed from wishlist.`);
      }}
      className="mt-2 sm:mt-0 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-3 py-1 text-sm font-semibold transition"
      aria-label={`Remove ${item.name || item.desc} from wishlist`}
    >
      Remove
    </button>
  </div>
));

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeFromWishlist(item));
  };

  return (
    <main className="py-[15vh] px-4 max-w-4xl mx-auto min-h-[60vh] flex flex-col">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
        My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">Your wishlist is empty.</p>
      ) : (
        <section className="flex flex-col gap-6">
          {wishlist.map((item) => (
            <WishlistItem key={item.id} item={item} onRemove={handleRemove} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Wishlist;
