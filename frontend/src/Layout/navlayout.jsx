import React from "react";
import Navbar from "../components/navbar";

const NavLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default NavLayout;
