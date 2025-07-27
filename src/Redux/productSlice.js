import { createSlice } from '@reduxjs/toolkit';
import Mencollection from "../ClothesData/MenCollection";
import Womencollection from "../ClothesData/Womencollection";

// Combine and normalize data
const allproducts = [...Mencollection, ...Womencollection].map((item, index) => ({
  id: item.id || `product-${index}`,
  name: item.name || item.Name || item.desc || "Unnamed Product",
  desc: item.desc || "No description available",
  price: item.price.toString(),
  MRP: item.MRP?.toString() || item.price.toString(),
  discount: item.discount || "0% off",
  category: item.category || item.category || (item.name === "T-shirt" ? "T-Shirts" : item.name === "Tops" ? "Tops" : "Unknown"),
  img: item.img || "https://via.placeholder.com/300",
  sizes: item.sizes || ["S", "M", "L", "XL"],
  images: item.images || [item.img || "https://via.placeholder.com/300"],
}));

const productSlice = createSlice({
  name: "product",
  initialState: {
    allproducts: Object.freeze(allproducts),
  },
  reducers: {},
});

export default productSlice.reducer;