import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartslice";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../../Redux/Wishlistslice";
import toast from "react-hot-toast";

const products = [
  {
    id: 1,
    Name: "Formal Shirt",
    img: "https://saadaa.in/cdn/shop/files/81.jpg?v=1729237929&width=600",
    price: 999,
    desc: "Men Light Blue Formal Shirt",
  },
  {
    id: 2,
    Name: "Check Shirt",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR537kt28ZhawdiZwNK9o85jJr4mTAJH-SJuA&s",
    price: 1099,
    desc: "Dobby Steel Grey Check Shirt",
  },
  {
    id: 3,
    Name: "Tops For Women",
    img: "https://m.media-amazon.com/images/I/71V9cS6vRJL._UY1100_.jpg",
    price: 749,
    desc: "MANIBAA CLOTHING Tops for Women Printed Shirt Top for Women",
  },
  {
    id: 4,
    Name: "Salwar Suit",
    img: "https://m.media-amazon.com/images/I/91c-Cqyu6QL._UY1100_.jpg",
    price: 819,
    desc: "Faux georgette with heavy embroidery and hand work semi stitched multi color designer salwar suit",
  },
  {
    id: 5,
    Name: "Trouser",
    price: 1499,
    img: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/28282918/2024/3/15/ae32aaf4-b7cb-452d-b066-eb28a5c118841710485348248CampusSutraMenRelaxedEasyWashTrousers1.jpg",
    desc: "Men Beige Relaxed Cotton Easy Wash Trousers",
  },
  {
    id: 6,
    Name: "Jeans For Women",
    price: 1159,
    img: "https://www.crimsouneclub.com/cdn/shop/files/FD2654_1.jpg?v=1748600435",
    desc: "Blue Relaxed Fit Jeans For Women",
  },
];

const BrandsBottom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartitems = useSelector((state) => state.cart.items);
  const wishlistitems = useSelector((state) => state.wishlist);

  const isInCart = (id) => cartitems.some((item) => item.id === id);
  const isInWishlist = (id) => wishlistitems.some((item) => item.id === id);
const handleAddToCart=(item)=>{
  dispatch(addToCart({...item,quantity:1,size:"default"}))
  toast(
    <div className="flex gap-3 items-center">
          <img src={item.img} className="h-20 rounded-md w-20 object-cover" alt="" />
      <span className="font-semibold text-black">{item.Name} Added to Cart 🛒</span>
  
    </div>
  )

}
  const toggleWishlist = (item) => {
    if (isInWishlist(item.id)) {
      dispatch(removeFromWishlist(item.id));
      toast(
        <div className="flex items-center gap-3">
             <img
            src={item.img}
            alt={item.Name}
            className="w-20 h-20 rounded-md object-cover"
          />
          <span className="font-semibold text-black">
            {item.Name} Removed From The Wishlist 💔
          </span>{" "}
       
        </div>
      );
    } else {
      dispatch(addToWishlist(item));
      toast(
        <div className="flex items-center gap-3">
             <img
            src={item.img}
            alt={item.Name}
            className="w-20 h-20 rounded-md object-cover"
          />
          <span className="font-semibold text-black">
            {item.Name} Added To The Wishlist ❤️
          </span>
       
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-2 md:px-30 md:flex md:flex-wrap justify-center items-center gap-3 px-4 sm:px-10 lg:px-30 py-6">
      {products.map((item, idx) => {
        const inCart = isInCart(item.id);
        const inWishlist = isInWishlist(item.id);

        return (
          <div
            key={item.id}
            className="relative text-center rounded-md p-2 max-w-[300px] sm:max-w-[350px]"
          >
            <img
              src={item.img}
              className="h-[250px] w-full object-cover rounded-md hover:scale-95 transition-transform"
              alt={item.Name}
            />

            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(item)}
              className="absolute top-4 right-4 text-xl"
            >
              {inWishlist ? (
                <IoMdHeart className="text-red-500 text-2xl" />
              ) : (
                <IoMdHeartEmpty className="text-rose-500 text-2xl" />
              )}
            </button>

            <p className="font-semibold mt-2">{item.Name}</p>
            <p className="text-red-600 font-bold">₹{item.price}</p>

            <div className="flex justify-center mt-2 flex-row items-center gap-2">
              {!inCart ? (
                <button
                  onClick={()=>handleAddToCart(item)}
                  className="bg-orange-500 flex items-center gap-2 rounded-md font-semibold hover:scale-95 text-white p-2"
                >
                  {idx === 0 ? "Buy Now" : "Add To Cart"}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/cart")}
                  className="bg-green-500 flex items-center gap-2 rounded-md font-semibold hover:scale-95 text-white p-2"
                >
                  Go to Cart
                </button>
              )}

              {idx === 0 && (
                <HiMiniShoppingCart className="bg-gray-300 text-black w-10 h-10 p-2 rounded-md" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BrandsBottom;
