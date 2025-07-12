import React from "react";
import Navbar from "../Components/Navbar";
import Category from "../Components/Category";
import Hero from "../Components/Hero";
import Bannerbottom from "../Components/Bannerbottom";
import StartpageProducts from "../Components/BrandsBottom";
import BrandsBottom from "../Components/BrandsBottom";

const Home = () => {
  return (
    <div className="overflow-hidden ">
    
    <Category/>
    <Hero/>
    <Bannerbottom/>
    <BrandsBottom/>
    </div>
  );
};

export default Home;
