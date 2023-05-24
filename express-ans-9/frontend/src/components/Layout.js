import React from "react";
import Navbar from "../lauout/Navbar";
import Footer from "../lauout/Footer";

const Layout = ({ item: Item,...rest }) => {
  return (
    <>
                <Navbar />
                <Item/>
                <Footer />
    </>
  );
};

export default Layout;
