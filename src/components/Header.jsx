import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/Context";
import Navbar from "./Navbar";
import UserIcon from "./UserIcon";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="header">
      <Link to={"/"}>
        <h1 id="title">Nc-News</h1>
      </Link>

      <Navbar />

      <UserIcon user={user} />
    </div>
  );
};

export default Header;
