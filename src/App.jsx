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
function App() {
  return (
    <>
      <div className="overflow-y-hidden">
        {" "}
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/Men" element={<MenSection/>}/>
            <Route path="/Women" element={<WomenSection/>}/>
            <Route path="/womentshirt" element={<TshirtW/>}/>
            <Route path="/Skirts" element={<Skirts/>}/>
            <Route path="/tshirt" element={<Tshirt/>}/>
            <Route path="/oversized" element={<Oversized/>}/>
            <Route path="/checkshirts" element ={<Checkshirtt/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/formalshirt" element={<Formalshirt/>}/>
            <Route path="/profile"element={<Profiledropdown/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
