import React from "react";
import Navbar from "../Components/Navbar";
import Category from "../Components/Category";
import Hero from "../Components/Hero";
import Bannerbottom from "../Components/Bannerbottom";
import StartpageProducts from "../Components/BrandsBottom";
import BrandsBottom from "../Components/BrandsBottom";

import Midbanner from "../Components/MidBanner(6)";

import Offer from "../Components/Offerproducts(7)";
import Largebanner from "../Components/MidBanner(8)";
import Womenproducts from "../Components/SectionF(9)";
import MenProducts from "../Components/SectionM(10)";

const Home = () => {
  return (
    <div className="overflow-hidden ">
    
 <Category/>
 <Hero/>
 <Bannerbottom/>
 <BrandsBottom/>
 <Midbanner/>
<Offer/>
<Largebanner/>
<Womenproducts/>
<MenProducts/>

    </div>
  );
};

export default Home;
