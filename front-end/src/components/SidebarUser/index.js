import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import { Typography, Avatar, Button, ListItem, Box } from "@mui/material";

import styles from "./SidebarUser.module.scss";
import { useUserData } from "../../layouts/ProfileUserLayout";

const cx = classNames.bind(styles);

const SidebarUser = () => {
  const navigate = useNavigate();
  const { userData } = useUserData();

  const handleNavigation = (path) => () => {
    navigate(path);
  };

  const handleShowRole = () => {
    if (userData.roleId === 1) {
      return <Typography>Welcome</Typography>;
    }
    if (userData.roleId === 2) {
      return <Typography>Welcome customer</Typography>;
    }
    if (userData.roleId === 3) {
      return <Typography>Welcome staff</Typography>;
    }
    return null;
  };

  return (
    <div className={cx("sidebar")}>
      <div className={cx("user-welcome")}>
        <Avatar sx={{ width: 80, height: 80 }} />
        <div className={cx("greeting")}>{handleShowRole()}</div>
        <div className={cx("username")}>
          <Typography>{userData.userName || "User"}</Typography>
        </div>
      </div>

      {userData.roleId === 2 ? (
        <div>
          <div className={cx("category")}>
            <Typography>ACCOUNT</Typography>
          </div>
          <ListItem
            button="true"
            onClick={handleNavigation("/profile")}
            sx={{
              cursor: "pointer",
              padding: "8px 15px",
              "&:hover": {
                "& .MuiListItemIcon-root, & .MuiTypography-root": {
                  color: "primary.main",
                },
              },
            }}
          >
            <Typography>Personal Information</Typography>
          </ListItem>
          <div className={cx("category")}>
            <Typography>ORDERS & SERVICES</Typography>
          </div>
          <ListItem
            button="true"
            onClick={handleNavigation("/deposit-transaction-history")}
            sx={{
              cursor: "pointer",
              padding: "8px 15px",
              "&:hover": {
                "& .MuiListItemIcon-root, & .MuiTypography-root": {
                  color: "primary.main",
                },
              },
            }}
          >
            <Typography>Transaction History</Typography>
          </ListItem>
        </div>
      ) : null}

      <Box sx={{ padding: "40px 0" }}>
        <Button variant="outlined" color="error" fullWidth>
          <Typography>Log Out</Typography>
        </Button>
      </Box>
    </div>
  );
};

export default SidebarUser;
