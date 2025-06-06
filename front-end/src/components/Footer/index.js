import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import classnames from "classnames/bind";
import { Typography } from "@mui/material";
import styles from "./Footer.module.scss";

const cx = classnames.bind(styles);

/**
 * FooterComponent is a functional React component that renders the footer section of the application.
 * It includes a logo that navigates to the home page when clicked, company information, an ecosystem section,
 * navigation links, and a contact hotline.
 *
 * @component
 *
 * @example
 * return (
 *   <FooterComponent />
 * )
 *
 * @returns {JSX.Element} The rendered footer component.
 */
function FooterComponent() {
  const navigate = useNavigate(); // Using hook useNavigate in library react-router-dom

  /**
   * Handles the event to scroll to the top of the screen with a smooth behavior
   * and navigates to the home page.
   */
  const handleToHomePage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Handle event scroll to top of screen with behavior smooth
    navigate("/"); // Using hook navigate to redicrect to home page
  };

  // Render component footer
  return (
    <div className={cx("footer-container")}>
      <div className={cx("footer-content")}>
        <div className={cx("footer-logo-infomation")}>
          <div className={cx("footer-logo")} onClick={handleToHomePage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="202"
              height="45"
              viewBox="0 0 202 45"
              fill="none"
            >
              <rect
                xmlns="http://www.w3.org/2000/svg"
                x="0.125"
                y="1.125"
                width="45.3022"
                height="42.6943"
                fill="url(#pattern0)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M110.708 21.1938C108.764 19.0304 105.984 18.1706 105.57 15.1006H101.711V30.5908H105.51V21.1938C105.51 21.7679 108.258 23.3167 109.324 24.9123C110.01 25.7041 110.429 26.6901 110.675 27.9724C110.811 28.6855 110.777 29.6339 110.777 30.5979H114.506V15.1098H110.708V21.1938Z"
                fill="#3C3C3C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M151.351 24.9067C151.08 24.9067 150.5 25.035 150.389 25.4106C150.404 25.3653 150.526 24.9534 150.54 24.9067C151.026 23.2891 151.931 20.2907 152.023 19.9944C152.114 20.3013 153.01 23.2855 153.495 24.9067H151.351ZM153.397 15.1013C149.544 15.1006 153.397 15.1006 149.544 15.1006C148.352 19.0035 146.92 23.5365 145.701 27.4323C145.373 28.4806 145.07 29.4687 144.723 30.5901C145.756 30.5901 146.615 30.5923 147.661 30.5915C148.735 30.5901 148.735 30.5901 149.148 29.5255C149.571 28.3559 149.553 28.2878 150.944 28.2878C152.488 28.2878 152.941 28.4409 153.531 27.3911L154.028 26.459C154.359 27.8157 154.692 29.193 155.035 30.5979C156.484 30.5979 158.129 30.5965 159.683 30.5965C159.575 30.2598 156.697 20.9974 155.249 16.3432C154.977 15.4713 154.336 15.1013 153.397 15.1013Z"
                fill="#3C3C3C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M177.215 22.0732C175.122 21.1056 173.456 21.012 173.456 19.7333C173.456 18.899 174.103 18.3581 175.186 18.3581C176.494 18.3581 177.749 18.9117 177.749 19.8339C178.568 19.8339 179.285 19.3491 179.549 18.558C179.779 17.7315 179.481 16.7562 178.673 16.1444C176.753 14.6927 173.647 14.9522 171.795 15.7333C170.099 16.4826 169.262 17.7634 169.262 19.5646C169.262 21.735 171.582 22.9762 172.443 23.4363C173.187 23.8375 174.48 24.4279 175.147 24.771C175.938 25.1757 176.302 25.8123 176.193 26.3411C176.062 26.9826 175.202 27.164 174.638 27.1527C174.025 27.1399 173.357 27.0662 171.961 26.3999C171.049 25.9328 170.094 25.2955 169.262 24.4215V27.1803C169.262 28.2734 170.243 29.0049 171.129 29.5684C172.219 30.2645 173.599 30.6054 174.968 30.6054C176.351 30.6054 177.714 30.3432 179.05 29.1325C179.78 28.345 180.339 27.3831 180.339 26.1022C180.339 24.3379 179.533 23.135 177.215 22.0732Z"
                fill="#3C3C3C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M70.6909 15.1437C71.0124 18.7262 68.9593 21.7118 68.1496 24.981C67.4427 23.0863 65.9441 18.4512 65.3293 16.5968C65.0905 15.8823 64.7943 15.1536 63.8709 15.1225C62.6959 15.0828 61.5187 15.1118 60.3466 15.1118C60.3387 15.2004 60.3135 15.2578 60.3293 15.3018C62.1278 20.2956 64.0392 25.6126 65.8672 30.5985H69.0291C69.5159 30.5985 70.3048 30.1597 70.578 29.3793C71.108 27.8652 73.4652 21.4176 74.2304 19.2245C74.6892 17.9132 74.9365 16.5401 74.8272 15.1437H70.6909Z"
                fill="#3C3C3C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M126.543 30.5979H130.828V24.5622C131.453 24.5622 132.553 24.5629 133.086 24.5622C134.622 24.5586 135.284 23.7867 135.284 22.5788V21.1845C133.823 21.186 132.374 21.1845 130.866 21.1845V18.5463H135.826V15.1006H126.543V30.5979Z"
                fill="#3C3C3C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M195.804 15.1362H189.656V18.3926H193.358V30.6278H197.658C197.658 26.5464 197.66 22.4861 197.66 18.3926C200.193 18.3926 200.459 18.4819 201.317 17.7958C201.969 17.1422 201.999 16.7991 201.997 14.3721C200.843 15.2446 197.821 15.1362 195.804 15.1362Z"
                fill="#3C3C3C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M88.1427 15.1006H85.5273V30.5979H89.7154C89.7154 28.2269 89.7161 25.9352 89.7154 23.6421C89.7154 21.2958 89.7161 18.9716 89.7161 16.6239C89.7161 15.287 88.818 15.1006 88.1427 15.1006Z"
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
          <div className={cx("footer-information")}>
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "1rem",
                lineHeight: "1.5rem",
                letterSpacing: "-0.02rem",
                color: "#3C3C3C",
                marginBottom: "1rem",
              }}
            >
              VinFast Commercial and Services Trading Limited Liability Company
            </Typography>
            <Typography
              sx={{
                fontWeight: "300",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
                letterSpacing: "-0.02rem",
                color: "#3C3C3C",
                marginBottom: "1rem",
              }}
            >
              <Typography sx={{ fontWeight: "bolder" }} component="span">
                Enterprise Registration Certificate:
              </Typography>{" "}
              No. 0108926276, first issued by Hanoi Authority for Planning and
              Investment (HAPI) on October 1st 2019 and subsequent changes.
            </Typography>
            <Typography
              sx={{
                fontWeight: "300",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
                letterSpacing: "-0.02rem",
                color: "#3C3C3C",
                marginBottom: "1rem",
              }}
            >
              <Typography sx={{ fontWeight: "bolder" }} component="span">
                Address:
              </Typography>{" "}
              No 7, Bang Lang 1 Street, Viet Hung Ward, Long Bien District, Ha
              Noi
            </Typography>
            <div className={cx("ecosystem")}>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  letterSpacing: "-0.02rem",
                  color: "#3c3c3c",
                  margin: "0 1.875rem 0 0",
                }}
              >
                Ecosystem
              </Typography>
              <ul className={cx("menu")}>
                <li className={cx("menu-item")}>
                  <Typography
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "12px",
                      lineHeight: "150%",
                      letterSpacing: "-0.02em",
                      color: "#8A8A8A",
                    }}
                  >
                    Vinhomes
                  </Typography>
                </li>
                <li className={cx("menu-item")}>
                  <Typography
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "12px",
                      lineHeight: "150%",
                      letterSpacing: "-0.02em",
                      color: "#8A8A8A",
                    }}
                  >
                    Vinmec
                  </Typography>
                </li>
                <li className={cx("menu-item")}>
                  <Typography
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "12px",
                      lineHeight: "150%",
                      letterSpacing: "-0.02em",
                      color: "#8A8A8A",
                    }}
                  >
                    Vinpearl
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={cx("footer-nav")}>
          <div className={cx("nav-item")}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "150%",
                color: "#3C3C3C",
                marginBottom: "0",
                cursor: "pointer",
              }}
            >
              about vinfast
            </Typography>
          </div>
          <div className={cx("nav-item")}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "150%",
                color: "#3C3C3C",
                marginBottom: "0",
                cursor: "pointer",
              }}
            >
              about vingroup
            </Typography>
          </div>
          <div className={cx("nav-item")}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "150%",
                color: "#3C3C3C",
                marginBottom: "0",
                cursor: "pointer",
              }}
            >
              featured news
            </Typography>
          </div>
          <div className={cx("nav-item")}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "150%",
                color: "#3C3C3C",
                marginBottom: "0",
                cursor: "pointer",
              }}
            >
              special offers
            </Typography>
          </div>
          <div className={cx("nav-item")}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "150%",
                color: "#3C3C3C",
                marginBottom: "0",
                cursor: "pointer",
              }}
            >
              find us
            </Typography>
          </div>
          <div className={cx("nav-item")}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "150%",
                color: "#3C3C3C",
                marginBottom: "0",
                cursor: "pointer",
              }}
            >
              privacy & term
            </Typography>
          </div>
        </div>
        <div className={cx("footer-contact")}>
          <div className={cx("hotline-content")}>
            <div className={cx("hotline-title")}>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "150%",
                  color: "#3C3C3C",
                  letterSpacing: "-0.02rem",
                  marginBottom: "1.5rem",
                }}
              >
                hotline
              </Typography>
            </div>
            <div className={cx("hotline-email")}>
              <div className={cx("hotline")}>
                <div className={cx("icon")}>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "1.5rem",
                    letterSpacing: "-0.02rem",
                  }}
                >
                  1900 23 23 89
                </Typography>
              </div>
              <div className={cx("email")}>
                <div className={cx("icon")}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "1.5rem",
                    letterSpacing: "-0.02rem",
                  }}
                >
                  support.vn@vinfastauto.com
                </Typography>
              </div>
            </div>
          </div>
          <div className={cx("contact-us")}>
            <div className={cx("contact-us-title")}>
              <Typography
                sx={{
                  letterSpacing: "-0.02rem",
                  color: "#3C3C3C",
                  marginBottom: "1rem",
                  fontWeight: "500",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                }}
              >
                Contact us
              </Typography>
            </div>
            <div className={cx("contact-us-content")}>
              <div className={cx("icon")}>
                <FontAwesomeIcon icon={faFacebook} />
              </div>
              <div className={cx("icon")}>
                <FontAwesomeIcon icon={faYoutube} />
              </div>
            </div>
          </div>
          <div className={cx("bct")}>
            <div className={cx("bct-certificate")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="153"
                height="58"
                viewBox="0 0 153 58"
                fill="none"
              >
                <rect width="153" height="58" fill="url(#pattern1)" />
                <defs>
                  <pattern
                    id="pattern1"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_1281_8705"
                      transform="translate(-0.00544662) scale(0.0019744 0.00520833)"
                    />
                  </pattern>
                  <image
                    id="image0_1281_8705"
                    width="512"
                    height="192"
                    xlinkHref="bct.png"
                  />
                </defs>
              </svg>
            </div>
            <div className={cx("copyright")}>
              <Typography
                component="span"
                sx={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "0.75rem",
                  lineHeight: "1.5rem",
                  letterSpacing: "-0.02rem",
                  color: "#3C3C3C",
                }}
              >
                VinFast. All rights reserved. <br></br> © Copyright 2024
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
