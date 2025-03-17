import React, { useEffect, useState } from 'react';

import axios from 'axios';
import classNames from 'classnames/bind';
import { Typography, Avatar, Button, ListItem, Box } from '@mui/material';

import styles from './SidebarUser.module.scss';
import * as DecodePayload from '../../lib/DecodePayload';

const cx = classNames.bind(styles);
const API_URL = "https://localhost:7005/api/Users";

const Sidebar = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('Bearer');
        if (!token) {
          console.error("User not logged in");
          return;
        }

        const decodedPayload = DecodePayload.decodePayload(token);
        const userId = decodedPayload.sub;
        if (!userId) {
          console.error("User ID not found in token");
          return;
        }

        const response = await axios.get(`${API_URL}/${userId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.status === 200) {
          setUserData({ ...response.data.data, id: userId }); // Ensure userId is set in userData
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={cx('sidebar')}>
      <div className={cx('user-welcome')}>
        <Avatar sx={{ width: 80, height: 80 }} />
        <div className={cx('username')}>
          <Typography>{userData.userName || "User"}</Typography>
        </div>
        <div className={cx('greeting')}>
          <Typography>Hello</Typography>
        </div>
      </div>
      <div className={cx('category')}><Typography>VEHICLE INFORMATION:</Typography></div>
      <ListItem
        button={true}
        //onClick={handleNavigation("/dashboard/account")}
        sx={{
          cursor: "pointer",
          padding: "8px 35px",
          "&:hover": {
            "& .MuiListItemIcon-root, & .MuiTypography-root": {
              color: "primary.main",
            },
          },
        }}
      ><Typography>My Car</Typography></ListItem>
      <div className={cx('category')}><Typography>ORDERS & SERVICES:</Typography></div>
      <ListItem
        button={true}
        //onClick={handleNavigation("/dashboard/account")}
        sx={{
          cursor: "pointer",
          padding: "8px 35px",
          "&:hover": {
            "& .MuiListItemIcon-root, & .MuiTypography-root": {
              color: "primary.main",
            },
          },
        }}
      ><Typography>Transaction History</Typography></ListItem>

      <ListItem
        button={true}
        //onClick={handleNavigation("/dashboard/account")}
        sx={{
          cursor: "pointer",
          padding: "8px 35px",
          "&:hover": {
            "& .MuiListItemIcon-root, & .MuiTypography-root": {
              color: "primary.main",
            },
          },
        }}
      ><Typography>Orders History</Typography></ListItem>


      <div className={cx('category')}><Typography>ACCOUNT:</Typography></div>
      <ListItem
        button={true}
        //onClick={handleNavigation("/dashboard/account")}
        sx={{
          cursor: "pointer",
          padding: "8px 35px",
          "&:hover": {
            "& .MuiListItemIcon-root, & .MuiTypography-root": {
              color: "primary.main",
            },
          },
        }}
      ><Typography>Personal Information</Typography></ListItem>
      <Box sx={{padding: "10px"}}>
        <Button variant="outlined" color="error" fullWidth>
          <Typography  >Log Out</Typography>
        </Button>
      </Box>
    </div>
  );
};

export default Sidebar;