import { useState } from "react";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

const UserIcon = ({ user }) => {
  const [open, setOpen] = useState(false);

  // Guard clause: if no user no icon is shows
  if (!user) return null;

  return (
    <span id="user">
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div>
          <Tooltip
            title={user.username}
            arrow
            placement="bottom"
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            disableTouchListener
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  backgroundColor: "cornflowerblue",
                },
              },
              arrow: {
                sx: {
                  color: "cornflowerblue",
                },
              },
            }}
          >
            <IconButton
              size="large"
              onClick={() => setOpen(prev => !prev)}
            >
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
          </Tooltip>
        </div>
      </ClickAwayListener>
    </span>
  );
};

export default UserIcon;
