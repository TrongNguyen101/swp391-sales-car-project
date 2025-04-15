import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const cx = classNames.bind(styles);

/**
 * HomePage component renders the main content of the home page, including various sections such as:
 * - Banner
 * - Battery content with cards for car and e-scooter charging stations
 * - Portable charging devices
 * - Warranty & Services
 * - VinFast's green future initiative
 * - Community information
 * - Newsletter subscription
 *
 * Each section contains relevant information and actions for the user to interact with.
 *
 * @returns {JSX.Element} The rendered home page component.
 */
function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("banner-container")}>
        <img src="bannerVinFast.jpg" alt="banner" />
      </div>
      <div className={cx("batery-content")}>
        <div className={cx("card-content")}>
          <div className={cx("batery-card-1")}>
            <div className={cx("batery-card-content")}>
              <div className={cx("batery-card-title")}>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
                  Car charging station and battery
                </Typography>
              </div>
              <div className={cx("batery-card-des")}>
                <Typography style={{ fontSize: "1rem", fontWeight: "400" }}>
                  With the customer-centric motto, VinFast applies a unique and
                  preeminent battery rental policy, distinctive from all others
                  in the world.
                </Typography>
              </div>
              <div className={cx("view-more")}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    letterSpacing: "0.075rem",
                    lineHeight: "normal",
                  }}
                >
                  see details
                </Typography>
              </div>
            </div>
          </div>
          <div className={cx("batery-card-2")}>
            <div className={cx("batery-card-content")}>
              <div className={cx("batery-card-title")}>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
                  E-Scooter charging station and battery{" "}
                </Typography>
              </div>
              <div className={cx("batery-card-des")}>
                <Typography style={{ fontSize: "1rem", fontWeight: "400" }}>
                  With the customer-centric motto, VinFast applies a unique and
                  preeminent battery rental policy, distinctive from all others
                  in the world.
                </Typography>
              </div>
              <div className={cx("view-more")}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    letterSpacing: "0.075rem",
                    lineHeight: "normal",
                  }}
                >
                  see details
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("batery-device")}>
          <div className={cx("device-content")}>
            <div className={cx("device-title")}>
              <Typography
                component={"h1"}
                sx={{ color: "#3c3c3c", fontWeight: "500", fontSize: "1.5rem" }}
              >
                Portable charging devices
              </Typography>
            </div>
            <div className={cx("device-des")}>
              <Typography
                component={"span"}
                sx={{ color: "#3c3c3c", fontWeight: "400", fontSize: "1rem" }}
              >
                VinFast offers various charging solutions to meet customer needs
                most conveniently.
              </Typography>
            </div>
            <div className={cx("view-more")}>
              <Typography
                component={"span"}
                sx={{
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  lineHeight: "normal",
                  letterSpacing: "1.2px",
                  color: "#007bff",
                }}
              >
                learn more
              </Typography>
            </div>
          </div>
          <div className={cx("device-image")}>
            <img src="batery-device.png" alt="batery-device"></img>
          </div>
        </div>
      </div>
      <div className={cx("block-service")}>
        <div className={cx("block-service-container")}>
          <div className={cx("block-service-content")}>
            <div className="block-title">
              <Typography
                sx={{ fontSize: "1.8rem", fontWeight: "500", color: "#3c3c3c" }}
              >
                Warranty & Services
              </Typography>
            </div>
            <div className={cx("block-des")}>
              <Typography sx={{ fontSize: "0.95rem", fontWeight: "300" }}>
                VinFast has invested thoughtfully and methodically to develop an
                extensive system of Showrooms, Distributors, and Service
                Workshops, intending to meet customer needs to the fullest.
              </Typography>
            </div>
            <div className={cx("block-service-btn")}>
              <Button
                variant="contained"
                sx={{ height: "70%", width: "220px" }}
              >
                Make An Appointment
              </Button>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "#ffff", height: "74%", width: "180px" }}
              >
                Warranty Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("block-green-tree")}>
        <div className={cx("block-green-tree-container")}>
          <div className={cx("block-green-tree-content")}>
            <div className={cx("block-green-tree-title")}>
              <Typography
                sx={{ fontSize: "1.6rem", fontWeight: "500", color: "#fff" }}
              >
                VinFast - For a Green Future
              </Typography>
            </div>
            <div className={cx("block-green-tree-des")}>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: "300", color: "#fff" }}
              >
                The "VinFast - For a Green Future" project is a testament to
                VinFast's strong commitment to the electric mobility revolution
                and a greener future worldwide. One of the project's primary
                objectives is to actualize a 'gift' from
                environmentally-conscious customers, fostering collaboration in
                shaping a sustainable future for all.
              </Typography>
            </div>
            <div className={cx("block-green-tree-btn")}>
              <Button
                variant="contained"
                sx={{ height: "100%", width: "126px" }}
              >
                See details
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("block-community")}>
        <div className={cx("block-community-container")}>
          <div className={cx("community-card-1")}>
            <div className={cx("community-card-content")}>
              <div className={cx("batery-card-title")}>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
                  Showroom & Charging stations
                </Typography>
              </div>
              <div className={cx("view-more")}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    letterSpacing: "0.075rem",
                    lineHeight: "normal",
                  }}
                >
                  learn more
                </Typography>
              </div>
            </div>
          </div>
          <div className={cx("community-card-2")}>
            <div className={cx("community-card-content")}>
              <div className={cx("batery-card-title")}>
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
                  VinFast Global Community
                </Typography>
              </div>
              <div className={cx("view-more")}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    letterSpacing: "0.075rem",
                    lineHeight: "normal",
                  }}
                >
                  learn more
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("block-subcribe")}>
        <div className={cx("block-subcribe-container")}>
          <div className={cx("block-subcribe-content")}>
            <div className={cx("block-subcribe-title")}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontStyle: "normal",
                  fontWeight: "500",
                  textAlign: "center",
                  lineHeight: "1.5",
                  color: "#fff",
                }}
              >
                Subcribe To Our Newsletter
              </Typography>
            </div>
            <div className={cx("block-subcribe-des")}>
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "300",
                  lineHeight: "150%",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Sign up to receive information about VinFast promotions and
                services.
              </Typography>
            </div>
            <div className={cx("block-subcribe-input")}>
              <input
                type="text"
                placeholder="Enter your email address"
                spellCheck={false}
              />
              <Button variant="contained" sx={{ height: "100%", width: "30%" }}>
                Subscribe
              </Button>
            </div>
            <div className={cx("block-subcribe-des-2")}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  fontWeight: "400",
                  lineHeight: "150%",
                  color: "#fff",
                }}
              >
                By registering, you confirm that you have read, understood and
                agreed to VinFast's{" "}
                <Link to={"/"}>
                  <Typography
                    component={"span"}
                    sx={{
                      textAlign: "center",
                      fontSize: "0.75rem",
                      fontWeight: "400",
                      lineHeight: "150%",
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    Privacy Policy.
                  </Typography>
                </Link>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
