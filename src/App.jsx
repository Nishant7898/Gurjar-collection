import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar(1)";
import Profiledropdown from "./Components/profiledropdown";
import MenSection from "./Components/MenSection";
import Tshirt from "./MaleClothes/Tshirt(M)";
import Oversized from "./MaleClothes/oversizedshirt";

import Formalshirt from "./MaleClothes/formal";
import Checkshirtt from "./MaleClothes/checkshirt";

import WomenSection from "./Components/WomenSection";
import TshirtW from "./FemaleClothes/Tshirt";
import Skirts from "./FemaleClothes/Skirts";
import Loginpage from "./authpage/Loginpage";
import SignupPage from "./authpage/Signuppage";
function App() {
  return (
    <>
      <div className="overflow-y-hidden">
        {" "}
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/Men" element={<MenSection/>}/>
            {/* Women Clothes Section--------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <Route path="/Women" element={<WomenSection/>}/>
            <Route path="/womentshirt" element={<TshirtW/>}/>
            <Route path="/Skirts" element={<Skirts/>}/>
            {/* Men Clothes Section---------------------->>>>>>>>>>>>>>>>>>>>> */}
            
            <Route path="/tshirt" element={<Tshirt/>}/>
            <Route path="/oversized" element={<Oversized/>}/>
            <Route path="/checkshirts" element ={<Checkshirtt/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/formalshirt" element={<Formalshirt/>}/>
            {/* ------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <Route path="/profile"element={<Profiledropdown/>}/>
            <Route path="/login" element={<Loginpage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
