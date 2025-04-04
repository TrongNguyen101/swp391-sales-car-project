import { useNavigate, Link } from "react-router-dom";
import classnames from "classnames/bind";
import {
  Avatar,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import * as DecodePayload from "../../lib/DecodePayload";

// Bind styles to classname of html
const cx = classnames.bind(styles);

/**
 * HeaderComponent is a functional React component that renders the header section of the application.
 * It includes navigation links, a logo, and action buttons for login and test drive registration.
 *
 * @component
 *
 * @example
 * return (
 *   <HeaderComponent />
 * )
 *
 * @returns {JSX.Element} The rendered header component.
 *
 * @function
 * @name HeaderComponent
 *
 * @description
 * - Uses the `useNavigate` hook from `react-router-dom` to handle navigation.
 * - Provides functions to handle navigation to the login page, home page, and scroll to top.
 * - Renders a logo, navigation links, and action buttons.
 */

function HeaderComponent() {
  const navigate = useNavigate(); // Navigate page using useNavigate hook from library react-router-dom
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [disableDashboard, setDisableDashboard] = useState(true);
  const open = Boolean(anchorEl);
  /**
   * Redirects the user to the login page.
   * Utilizes the navigate hook to change the route to "/login".
   */
  const handleToLoginPage = () => {
    navigate("/login"); // Using hook naviagte to redicrect to login page
  };

  /**
   * Navigates to the home page and scrolls to the top of the screen with a smooth behavior.
   */
  const handleToHomePage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Handle event scroll to top of screen with behavior smooth
    navigate("/"); // Using hook naviagte to redicrect to home page
  };

  /**
   * Scrolls the window to the top of the page with a smooth scrolling behavior.
   */
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Handle event scroll to top of screen with behavior smooth
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToProfile = () => {
    navigate("/profile");
  };

  const handleToDashboard = () => {
    navigate("/dashboard/account");
  };
  const handleToTestDrive = () => {
    navigate("/testdrivegistration");
  };

  const handleLogout = () => {
    localStorage.removeItem("Bearer");
    localStorage.removeItem("productId");
    localStorage.removeItem("productVersion");
    localStorage.removeItem("priceBatteryRent");
    localStorage.removeItem("priceBatteryOwn");
    localStorage.removeItem("remainingAmountRent");
    localStorage.removeItem("remainingAmountOwn");
    setIsLoggedIn(false);
    handleClose();
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    if (token) {
      setIsLoggedIn(true);
      const decoded = DecodePayload.decodePayload(token);
      if (decoded.role === 1 || decoded.role === 3) {
        setDisableDashboard(false);
      }
    }
  }, []);

  return (
    <div className={cx("header-container")}>
      <div className={cx("header-content")}>
        <div className={cx("header-logo")} onClick={handleToHomePage}>
          <img src="VinFast-logo.svg" alt="logo" />
        </div>
        <div className={cx("header-nav")}>
          <div className={cx("nav-item")}>
            <Link to="/cars" onClick={handleScrollToTop}>
              <Typography variant="body1">Cars</Typography>
            </Link>
          </div>
          <div className={cx("nav-item")}>
            <Link to="/accessories" onClick={handleScrollToTop}>
              <Typography variant="body1">Accessories</Typography>
            </Link>
          </div>
          <div className={cx("nav-item")}>
            <Link to="/" onClick={handleScrollToTop}>
              <Typography variant="body1">About</Typography>
            </Link>
          </div>
          <div className={cx("nav-item")}>
            <Link to="/" onClick={handleScrollToTop}>
              <Typography variant="body1">Contact</Typography>
            </Link>
          </div>
        </div>
        <div className={cx("header-action")}>
          <div className={cx("login-text")}>
            <div
              className={isLoggedIn === true ? cx("disabled") : cx("account")}
              onClick={handleToLoginPage}
            >
              <Typography variant="body1">Account</Typography>
            </div>
            <div
              className={isLoggedIn === false ? cx("disabled") : cx("profile")}
            >
              <Tooltip title="Profile">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleToProfile}>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                  </ListItemIcon>
                  User Profile
                </MenuItem>
                <MenuItem
                  onClick={handleToDashboard}
                  sx={{ display: disableDashboard ? "none" : "block" }}
                >
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faClipboard}></FontAwesomeIcon>
                  </ListItemIcon>
                  Go To Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                    ></FontAwesomeIcon>
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
          <Button variant="contained" onClick={handleToTestDrive}>
            test drive registration
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
