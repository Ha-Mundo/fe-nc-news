import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/Context";
import Navbar from "./Navbar";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="header">
      <Link to={"/"}>
        <h1 id="title">Nc-News</h1>
      </Link>
      <Navbar />
      <span>User: {user.username}</span>
    </div>
  );
};

export default Header;
