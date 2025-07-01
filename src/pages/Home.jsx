import React from "react";
import "./index.css";
import Navbar from "../components/Navbar";
import Category from "../components/Category";
import { Link } from "react-router-dom";
import Topweardata from "../data/Topweardata";
import BottomwearData from "../data/Bottomweardata";
import Cart from '../components/Cart'

const Home = () => {
  

  return (
    <>
      <Navbar />
      <Category />

           

      <Cart />
    </>
  );
};
export default Home