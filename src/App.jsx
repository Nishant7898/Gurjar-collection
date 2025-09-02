import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar/Navbar(1)";
import Profiledropdown from ".//authpage/profiledropdown";
import MenSection from "./CategoriesProducts/MenSection";
import './index.css'


import { Toaster } from "react-hot-toast";

import ProductDetails from "./Components/productpage/productdetails";

import WomenSection from "./CategoriesProducts/WomenSection";

import Login from "./authpage/Loginpage";
import Signup from "./authpage/Signuppage";

import Femalesection from "./CategoriesProducts/Femalesection";
import Malesection from "./CategoriesProducts/Malesection";

import Wishlist from "./Components/Wishlist/Wishlist";

import CartPopup from "./Components/Cartpop/Cartpopup";
import Checkout from "./Components/Checkout/Checkout";
import Footer from "./Components/Footer.jsx/Footer"

function App() {
  return (
    <>
      <div className="overflow-y-hidden">
        {" "}
        <BrowserRouter>
          <Navbar />
     

          <Routes>
            {/* ------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <Route path="/" element={<Home />} />

            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<CartPopup />} />
            <Route path="/checkout" element={<Checkout/>}/>

            <Route path="/product/:id" element={<ProductDetails />} />
            {/* Women Clothes Section--------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <Route path="/Women" element={<WomenSection />} />
            <Route path="/women/:category" element={<Femalesection />} />
            {/* Men Clothes Section---------------------->>>>>>>>>>>>>>>>>>>>> */}
            <Route path="/Men" element={<MenSection />} />
            <Route path="/men/:category" element={<Malesection />} />
            {/* ------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <Route path="/profile" element={<Profiledropdown />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
         <Toaster position="top-right" reverseOrder={false} />
           <Footer/>
    </>
  );
}

export default App;
