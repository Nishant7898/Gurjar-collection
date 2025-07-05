import React from "react";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom"; // ✅ FIXED
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category/:categoryName" element={<ProductDetail />} />

        <Route path="/checkout" element={<Checkout />} />
      </Routes>
        
    </BrowserRouter>
  );
};

export default App;
