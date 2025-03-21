import { Paper, Typography, Box, Grid2 } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCarSide,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Overview.module.scss";
import { useEffect, useState } from "react";
import * as AdminService from "../../services/AdminServices";

const cx = classNames.bind(styles);

function Overview() {
  const [totalAccounts, setTotalAccounts] = useState(0);

  const fetchTotalAccounts = async () => {
    try {
      const response = await AdminService.countUsers();
      if (response.statusCode !== 200) {
        console.log(response.message);
      } else {
        setTotalAccounts(response.data);
      }
    } catch (error) {
      return error.response.data.meassage;
    }
  };

  useEffect(() => {
    fetchTotalAccounts();
  }, []);

  return (
    <Box className={cx("dashboard-container")}>
      <Typography variant="h4" gutterBottom sx={{ color: "#3c3c3c", paddingTop: "20px", fontWeight: "bold" }}>
        Welcome to the Dashboard
      </Typography>
      <Grid2
        className={cx("dashboard-container__grid2")}
        container
        spacing={3}
      >
        <Grid2 item xs={12} md={4} sx={{ width: "30%" }}>
          <Paper
            className={cx("dashboard-card")}
            elevation={4}
            sx={{ backgroundColor: "primary.main", color: "white" }}
          >
            <FontAwesomeIcon icon={faUser} size="3x" />
            <Typography variant="h6">Total Accounts</Typography>
            <Typography variant="body1">
              {totalAccounts === 1
                ? totalAccounts + " Account"
                : totalAccounts + " Accounts"}
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item xs={12} md={4} sx={{ width: "30%" }}>
          <Paper
            className={cx("dashboard-card")}
            elevation={3}
            sx={{ backgroundColor: "warning.main", color: "white" }}
          >
            <FontAwesomeIcon icon={faCarSide} size="3x" />
            <Typography variant="h6">Deposit Transactions</Typography>
            <Typography variant="body1">View total orders</Typography>
          </Paper>
        </Grid2>
        <Grid2 item xs={12} md={4} sx={{ width: "30%" }}>
          <Paper
            className={cx("dashboard-card")}
            elevation={3}
            sx={{ backgroundColor: "success.main", color: "white" }}
          >
            <FontAwesomeIcon icon={faShoppingCart} size="3x" />
            <Typography variant="h6">Accessory Transactions</Typography>
            <Typography variant="body1">View total transactions</Typography>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Overview;
