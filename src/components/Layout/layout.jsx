// Layout.js
import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";
import Navbar from "../ui/custom/nav-bar/Navbar";

const Layout = ({ children }) => {
  console.log(children);
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
