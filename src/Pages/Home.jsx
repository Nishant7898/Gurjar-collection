import React from "react";
import Navbar from "../Components/Navbar";
import Category from "../Components/Category";
import Hero from "../Components/Hero";
import Bannerbottom from "../Components/Bannerbottom";

const Home = () => {
  return (
    <div className="overflow-hidden ">
    
    <Category/>
    <Hero/>
    <Bannerbottom/>
    </div>
  );
};

export default Home;
