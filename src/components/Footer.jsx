import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <Link to={"/"}>
        <h1 id="title">Nc-News-2022</h1>
      </Link>
    </div>
  );
};

export default Footer;
