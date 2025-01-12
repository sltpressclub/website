import React from "react";
import { Header } from "./"; // Importing Header component
import { Footer } from "./"; // Importing Footer component

// Layout Component - A wrapper for common elements (Header and Footer) around page content
const Layout = ({ children }) => {
  return (
    <>
      {/* Rendering the Header component */}
      <Header />

      {/* Rendering the page's children content */}
      {children}

      {/* Rendering the Footer component */}
      <Footer />
    </>
  );
};

export default Layout;
