import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const cx = classNames.bind(styles);

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleBackToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  const handleToFogotPassword = () => {
    navigate("/");
  };

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <form className={cx("form")}>
          <div className={cx("vinfast-logo")}>
            <div className={cx("logo-image")} onClick={handleBackToHome}>
              <img src="./logoJPG-removebg-preview.png" alt="vinfast-logo" />
            </div>
          </div>
          <div className={cx("form-group")}>
            <input
              type="email"
              id="email"
              className={cx("input")}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={cx("field-password")}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={cx("input")}
              placeholder="Enter your password"
              required
            />
            <div className={cx("icon")}>
              <FontAwesomeIcon
                onClick={handleShowPassword}
                icon={showPassword ? faEyeSlash : faEye}
                style={{ cursor: "pointer", color: "#8a8a8a" }}
              ></FontAwesomeIcon>
            </div>
          </div>
          <div className={cx("forgot-password")}>
            <div
              className={cx("block-forgot-password")}
              onClick={handleToFogotPassword}
            >
              <Typography>Forgot password</Typography>
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            className={cx("button")}
            sx={{ width: "100%", height: "46px" }}
          >
            Login
          </Button>
          <div className={cx("register")}>
            <Typography>
              If you doesn't have account{" "}
              <Link to="/">
                <Typography
                  variant="span"
                  sx={{ color: "var(--primary-color)", cursor: "pointer" }}
                >
                  register here
                </Typography>
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
