import React from "react";
import "./index.css";
import Navbar from "../components/Navbar";
import Category from "../components/Category";

import Cart from '../components/Cart'

const Home = () => {
 
  return (
    <>
      <Navbar />
      <Category />
    
     <Cart/>
    </>
  );
};
export default Home;
