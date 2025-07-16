import React from "react";
import Navbar from "../Components/Navbar(1)";
import Category from "../Components/Category(2)";
import Hero from "../Components/Hero(3)";
import Bannerbottom from "../Components/Bannerbottom(4)";
import StartpageProducts from "../Components/BrandsBottom(5)";
import BrandsBottom from "../Components/BrandsBottom(5)";

import Midbanner from "../Components/MidBanner(6)";

import Offer from "../Components/Offerproducts(7)";
import Largebanner from "../Components/MidBanner(8)";
import Womenproducts from "../Components/SectionF(9)";
import MenProducts from "../Components/SectionM(10)";
import Latest from "../Components/Latest(10)";

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
<Latest/>

    </div>
  );
};

export default Home;
