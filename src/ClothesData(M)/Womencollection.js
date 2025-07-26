const Womencollection = [
  // T-Shirts
  {
    id: "woment-shirt-1",
    img: "https://m.media-amazon.com/images/I/71eeQuGByEL._UY1100_.jpg",
    name: "Oversized T-Shirt",
    desc: "ADORN Women Western Stylish Embossed Print Cotton Oversized T-Shirt",
    price: "300", // Swapped with MRP
    discount: "25% off", // Calculated: (399 - 300) / 399 * 100
    MRP: "399",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
  },
  // Tops
  {
    id: "top-1",
    img: "https://fastcolors.in/cdn/shop/files/Maroon_Sleeveless_Women_s_Crop_Top_5058_-_FastColors-4953108.jpg?v=1729851421&width=800",
    name: "Maroon Crop Top",
    desc: "Maroon Sleeveless Women Crop Top 5058",
    price: "599",
    discount: "40% off", // Calculated: (999 - 599) / 999 * 100
    MRP: "999",
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
  },
  // Skirts
  {
    id: "skirt-1",
    img: "https://img1.junaroad.com/uiproducts/21008430/zoom_1-1709223803.jpg",
    name: "Printed Pleated Skirt",
    desc: "Women Mid-Rise Printed Pleated Skirt",
    price: "599",
    discount: "40% off", // Calculated: (999 - 599) / 999 * 100
    MRP: "999",
    category: "Skirts",
    sizes: ["S", "M", "L", "XL"],
  },
  // Salwar Suits
  {
    id: "salwarsuit-1",
    img: "https://5.imimg.com/data5/SELLER/Default/2023/9/343556834/YN/YE/XY/155257574/designer-salwar-kameez-for-women.jpg",
    name: "Cotton Salwar Suit",
    desc: "Women Cotton Designer Salwar Suit",
    price: "499",
    discount: "29% off", // Calculated: (699 - 499) / 699 * 100
    MRP: "699",
    category: "Salwar Suits",
    sizes: ["S", "M", "L", "XL"],
  },
];

// Log to check for duplicates
console.log("Womencollection IDs:", Womencollection.map((item) => item.id));
console.log(
  "Duplicate IDs:",
  Womencollection.filter((item, index, arr) => arr.findIndex((i) => i.id === item.id) !== index).map((item) => item.id)
);

export default Object.freeze(Womencollection); // Freeze for stability