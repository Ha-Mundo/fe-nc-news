import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <h1 id="title">Nc-News</h1>
      </Link>
      <Navbar />
    </div>
  );
};

export default Header;
