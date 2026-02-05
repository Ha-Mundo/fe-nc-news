import React from "react";
import AutorenewTwoToneIcon from "@mui/icons-material/AutorenewTwoTone";

const Loader = () => {
  return (
    <div className="flex-col">
      <AutorenewTwoToneIcon
        fontSize="large"
        color="primary"
        sx={{
          animation: "loader-spin 1.5s linear infinite",
          transformOrigin: "center",
          transformBox: "fill-box",
          display: "inline-block",
        }}
      />
      <p className="loading-txt">Loading...</p>
    </div>
  );
};

export default Loader;
