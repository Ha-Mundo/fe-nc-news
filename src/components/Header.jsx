import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/Context";
import Navbar from "./Navbar";

import { IconButton } from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="header">
      <Link to={"/"}>
        <h1 id="title">Nc-News</h1>
      </Link>
      <Navbar />
      <span id="user">
        <IconButton size="large">
          <AccountCircleTwoToneIcon
            sx={{
              fontSize: {
                xs: 32,
                sm: 40,
                md: 48,
              },
            }}
            className="icon"
            color="primary"
          />
        </IconButton>
        {/* {user.username} */}
      </span>
    </div>
  );
};

export default Header;
