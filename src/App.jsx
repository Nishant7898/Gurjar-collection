import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar/Navbar(1)";
import Profiledropdown from ".//authpage/profiledropdown";
import MenSection from "./CategoriesProducts/MenSection";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductDetails from "./Components/productpage/productdetails";

import WomenSection from "./CategoriesProducts/WomenSection";

import Login from "./authpage/Loginpage";
import Signup from "./authpage/Signuppage";

import Femalesection from "./CategoriesProducts/Femalesection";
import Malesection from "./CategoriesProducts/Malesection";

import Wishlist from "./Components/Wishlist/Wishlist";

import CartPopup from "./Components/Cartpop/Cartpopup";
import Checkout from "./Components/Checkout/Checkout";

function App() {
  return (
    <>
      <div className="overflow-y-hidden">
        {" "}
        <BrowserRouter>
          <Navbar />
          <ToastContainer />

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
    </>
  );
}

export default App;
