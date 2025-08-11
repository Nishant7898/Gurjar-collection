import React from "react";
import Navbar from "../Components/Navbar/Navbar(1)";
import Category from "../Components/Category/Category(2)";
import Hero from "../Components/Banner/Hero(3)";
import Bannerbottom from "../Components/ShopByCategoryandBrands/Bannerbottom(4)";
import StartpageProducts from "../Components/Brandbottom/BrandsBottom(5)";
import BrandsBottom from "../Components/Brandbottom/BrandsBottom(5)";

import Midbanner from "../Components/Shortbanner/MidBanner(6)";

import Offer from "../Components/Limitedtimeoffer/Offerproducts(7)";
import Largebanner from "../Components/midbanner/MidBanner(8)";
import Womenproducts from "../Components/Womensection/SectionF(9)";
import MenProducts from "../Components/MenCategory/SectionM(10)";
import Latest from "../Components/Latest(11)";

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
