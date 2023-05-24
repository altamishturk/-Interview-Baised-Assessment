import React from "react";
import BestSellingProducts from "./BestSellingProducts";
import HeroSection from "./Hero";
// import Offer from "./Offer";
// import Product from "../components/Product";


function Home() {
 
    return (
        <>
        <div className="hero">
          <HeroSection/>
        </div>
       

        {/* <Offer/> */}

        {/* best seler  */}
        <BestSellingProducts/>

        </>

    );
}

export default Home;
