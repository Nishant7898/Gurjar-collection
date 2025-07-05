import React from "react";
import "./index.css";
import Navbar from "../components/Navbar";
import Category from "../components/Category";
import { Link } from "react-router-dom";
import Topweardata from "../data/Topweardata";
import BottomwearData from "../data/Bottomweardata";
import Cart from '../components/Cart'
import Hero from '../components/hero'
const Home = () => {
  

  return (
    <>
      <Navbar />
       <Hero/>
      <Category />

           

      <Cart />
    </>
  );
};
export default Home