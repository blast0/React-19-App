// Layout.js
import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Navbar from "../Navigation/NavBar";
import { useTheme } from "../../context/themeProvider";

const Layout = ({ children }) => {
  const { toggleTheme, darkMode } = useTheme();
  const { user, logout } = useAuth0();
  return (
    <div>
      <Navbar
        user={user}
        theme={darkMode ? "dark" : "light"}
        setTheme={toggleTheme}
        signout={() => {
          logout();
        }}
      />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
