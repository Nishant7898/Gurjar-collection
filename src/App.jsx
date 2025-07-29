import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar(1)";
import Profiledropdown from ".//authpage/profiledropdown";
import MenSection from "./Components/MenSection";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductDetails from "./Components/productdetails";

import WomenSection from "./Components/WomenSection";

import Login from "./authpage/Loginpage";
import Signup from "./authpage/Signuppage";

import Femalesection from "./FemaleClothes/Femalesection";
import Malesection from "./MaleClothes/Malesection";

import Wishlist from "./Components/Wishlist";

import CartPopup from "./Components/Cartpopup";

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
