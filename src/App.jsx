import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar(1)";
import Profiledropdown from ".//authpage/profiledropdown";
import MenSection from "./Components/MenSection";
import Tshirtt from "./MaleClothes/Tshirt(M)";
import Oversized from "./MaleClothes/oversizedshirt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Formalshirt from "./MaleClothes/formalshirt";
import Checkshirtt from "./MaleClothes/checkshirt";
import ProductDetails from "./Components/productdetails";

import WomenSection from "./Components/WomenSection";
import TshirtW from "./FemaleClothes/Tshirt";
import Skirts from "./FemaleClothes/Skirts";
import Login from "./authpage/Loginpage";
import Signup from "./authpage/Signuppage";
import Baggyjeans from "./MaleClothes/jeans";

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
         
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* Women Clothes Section--------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <Route path="/Women" element={<WomenSection />} />
            <Route path="/womentshirt" element={<TshirtW />} />
            <Route path="/Skirts" element={<Skirts />} />
            {/* Men Clothes Section---------------------->>>>>>>>>>>>>>>>>>>>> */}
 <Route path="/Men" element={<MenSection />} />
            <Route path="/tshirt" element={<Tshirtt />} />
            <Route path="/oversized" element={<Oversized />} />
            <Route path="/checkshirts" element={<Checkshirtt />} />
         
            <Route path="/Baggyjeans" element={<Baggyjeans />} />
            <Route path="/formalshirt" element={<Formalshirt />} />
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
