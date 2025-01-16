import { useNavigate, Link } from "react-router-dom";
import classnames from "classnames/bind";
import { Button, Typography } from "@mui/material";
import styles from "./Header.module.scss";

// Bind styles to classname of html
const cx = classnames.bind(styles);

function HeaderComponent() {
  const navigate = useNavigate(); // Navigate page using useNavigate hook from library react-router-dom

  // Function handle event redicrect to login page
  const handleToLoginPage = () => {
    navigate("/login"); // Using hook navigate to redicrect to login page
  };

  // Function handle event redicrect to home page
  const handleToHomePage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Handle event scroll to top of screen with behavior smooth
    navigate("/"); // Using hook naviagte to redicrect to home page
  };

  // Function handle event scroll to top page
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Handle event scroll to top of screen with behavior smooth
  };

  // Render component header
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("header-logo")} onClick={handleToHomePage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="110"
            height="25"
            viewBox="0 0 110 25"
            fill="none"
          >
            <rect
              xmlns="http://www.w3.org/2000/svg"
              x="1.08154"
              y="0.625"
              width="24.3539"
              height="23.7191"
              fill="url(#pattern0)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M60.5289 11.7743C59.484 10.5724 57.9895 10.0948 57.7672 8.38922H55.6924V16.9949H57.7347V11.7743C57.7347 12.0933 59.2118 12.9537 59.7851 13.8402C60.1539 14.2801 60.3793 14.8278 60.5111 15.5402C60.5842 15.9364 60.566 16.4633 60.566 16.9989H62.5708V8.39434H60.5289V11.7743Z"
              fill="#3C3C3C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M82.3786 13.837C82.2328 13.837 81.9212 13.9083 81.8617 14.117C81.8698 14.0918 81.9352 13.863 81.9425 13.837C82.2042 12.9384 82.6905 11.2726 82.74 11.108C82.7891 11.2785 83.2708 12.9364 83.5314 13.837H82.3786ZM83.4788 8.38962C81.4071 8.38922 83.4788 8.38922 81.4071 8.38922C80.7665 10.5575 79.9968 13.0758 79.3412 15.2401C79.1649 15.8226 79.0021 16.3715 78.8154 16.9945C79.3709 16.9945 79.8329 16.9957 80.395 16.9953C80.9726 16.9945 80.9726 16.9945 81.1945 16.403C81.4218 15.7533 81.4121 15.7155 82.1598 15.7155C82.9897 15.7155 83.2333 15.8005 83.5507 15.2173L83.8178 14.6995C83.9956 15.4532 84.175 16.2183 84.3594 16.9989C85.1384 16.9989 86.0225 16.9981 86.8579 16.9981C86.7999 16.811 85.2528 11.6652 84.4742 9.07955C84.3281 8.59518 83.9833 8.38962 83.4788 8.38962Z"
              fill="#3C3C3C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M96.2815 12.2629C95.1565 11.7253 94.2604 11.6734 94.2604 10.9629C94.2604 10.4994 94.6087 10.199 95.1905 10.199C95.8937 10.199 96.5687 10.5065 96.5687 11.0189C97.0086 11.0189 97.394 10.7495 97.5363 10.31C97.66 9.85085 97.4996 9.30899 97.0651 8.96914C96.0333 8.16264 94.3632 8.30677 93.3678 8.74073C92.4558 9.15698 92.0059 9.86857 92.0059 10.8692C92.0059 12.075 93.2534 12.7646 93.7161 13.0201C94.1158 13.243 94.8109 13.5711 95.1696 13.7617C95.5949 13.9865 95.7909 14.3402 95.7321 14.6339C95.6618 14.9903 95.1994 15.0911 94.8963 15.0848C94.5666 15.0777 94.2074 15.0368 93.4571 14.6666C92.9665 14.4071 92.4535 14.0531 92.0059 13.5675V15.1002C92.0059 15.7074 92.5335 16.1138 93.0098 16.4269C93.5959 16.8136 94.3373 17.003 95.0734 17.003C95.8172 17.003 96.5497 16.8573 97.268 16.1847C97.6604 15.7472 97.9608 15.2128 97.9608 14.5012C97.9608 13.5211 97.5278 12.8528 96.2815 12.2629Z"
              fill="#3C3C3C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.0164 8.41307C39.1892 10.4033 38.0855 12.062 37.6502 13.8782C37.2702 12.8256 36.4645 10.2505 36.134 9.22036C36.0057 8.82341 35.8464 8.41858 35.35 8.40126C34.7184 8.3792 34.0855 8.39535 33.4554 8.39535C33.4511 8.44457 33.4376 8.47647 33.4461 8.50089C34.413 11.2752 35.4405 14.2291 36.4232 16.9991H38.123C38.3847 16.9991 38.8088 16.7553 38.9557 16.3217C39.2406 15.4806 40.5078 11.8986 40.9191 10.6802C41.1658 9.95164 41.2988 9.18885 41.24 8.41307H39.0164Z"
              fill="#3C3C3C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M69.042 16.9989H71.3456V13.6457C71.6816 13.6457 72.273 13.646 72.5595 13.6457C73.3852 13.6437 73.7409 13.2148 73.7409 12.5438V11.7692C72.9558 11.77 72.1768 11.7692 71.3657 11.7692V10.3035H74.0324V8.38922H69.042V16.9989Z"
              fill="#3C3C3C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M106.277 8.40901H102.972V10.2181H104.962V17.0155H107.274C107.274 14.748 107.274 12.4923 107.274 10.2181C108.636 10.2181 108.779 10.2677 109.24 9.88655C109.591 9.52346 109.607 9.33286 109.606 7.9845C108.985 8.46926 107.361 8.40901 106.277 8.40901Z"
              fill="#3C3C3C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M48.3972 8.38922H46.9912V16.9989H49.2427C49.2427 15.6816 49.243 14.4084 49.2427 13.1345C49.2427 11.831 49.243 10.5398 49.243 9.2355C49.243 8.49279 48.7602 8.38922 48.3972 8.38922Z"
              fill="#3C3C3C"
            />
            <defs xmlns="http://www.w3.org/2000/svg">
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_1944_870"
                  transform="scale(0.000558347 0.000583771)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
              <image
                id="image0_1944_870"
                width="1791"
                height="1713"
                xlinkHref="logoJPG-removebg-preview.png"
              ></image>
            </defs>
          </svg>
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
          <div className={cx("login-text")} onClick={handleToLoginPage}>
            <Typography variant="body1">Account</Typography>
          </div>
          <Button variant="contained" onClick={handleToHomePage}>
            test drive registration
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
