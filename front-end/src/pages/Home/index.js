import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Typography } from "@mui/material";

const cx = classNames.bind(styles);

function HomePage() {
  return (
    <div className={cx("container")}>
      <div className={cx("banner-container")}>
        <img
          src="bannerVinFast.jpg"
          alt="banner"
          style={{ width: "100%", height: "100%" }}
        />
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
      <div style={{ width: "100%", height: "369px" }}>
        <img
          src="vinfastauto.com_vn_vi.png"
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

export default HomePage;
