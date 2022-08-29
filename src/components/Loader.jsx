import React from "react";
import AutorenewTwoToneIcon from "@mui/icons-material/AutorenewTwoTone";

const Loader = () => {
  return (
    <div className="flex-col">
      <AutorenewTwoToneIcon
        id="loader"
        fontSize="large"
        className="icon"
        color="primary"
      />{" "}
      <p className="loading-txt">Loading...</p>
    </div>
  );
};

export default Loader;
