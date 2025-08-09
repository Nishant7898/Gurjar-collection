import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartslice";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";

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
  const cartitems=useSelector((state)=>state.cart.items)

  return (
    <div className="grid grid-cols-2 md:px-30   md:flex md:flex-wrap justify-center items-center gap-3 px-4 sm:px-10  lg:px-30 py-6">
      {products.map((item, idx) => (
        <div
          key={item.id}
          className="relative text-center rounded-md p-2 max-w-[300px] sm:max-w-[350px]"
        >
          <img
            src={item.img}
            className="h-[250px] w-full object-cover rounded-md hover:scale-95 transition-transform"
            alt={item.Name}
          />
          <IoMdHeartEmpty className="absolute top-4 right-4 text-xl text-white" />
          <p className="font-semibold mt-2">{item.Name}</p>
          <p className="text-red-600 font-bold">₹{item.price}</p>
          <div className="flex justify-center mt-2 flex-row items-center gap-2">
            <button
              onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
              className="bg-orange-500 flex items-center gap-2 rounded-md font-semibold hover:scale-95 text-white p-2"
            >
              {idx === 0 ? "Buy Now" : "Add To Cart"}
            </button>
            {idx === 0 && (
              <HiMiniShoppingCart className="bg-gray-300 text-black w-10 h-10 p-2 rounded-md" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandsBottom; 