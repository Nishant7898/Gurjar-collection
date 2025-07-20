import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar(1)";
import Profiledropdown from "./Components/profiledropdown";
import MenSection from "./Components/MenSection";

function App() {
  return (
    <>
      <div className="overflow-y-hidden">
        {" "}
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/Men" element={<MenSection/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/profile"element={<Profiledropdown/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
