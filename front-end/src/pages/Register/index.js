import { Button, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

/**
 * RegisterPage component renders a registration form with fields for fullname, email, password, and password confirmation.
 * It includes functionality to show/hide passwords and navigate back to the home page.
 *
 * @component
 * @example
 * return (
 *   <RegisterPage />
 * )
 *
 * @returns {JSX.Element} The rendered registration page component.
 */
function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handleBackToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              type="text"
              id="fullname"
              className={cx("input")}
              placeholder="Fullname"
              spellCheck="false"
              required
            />
          </div>
          <div className={cx("form-group")}>
            <input
              type="email"
              id="email"
              className={cx("input")}
              placeholder="Email"
              spellCheck="false"
              required
            />
          </div>
          <div className={cx("field-password")}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={cx("input")}
              placeholder="Password"
              spellCheck="false"
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
          <div className={cx("field-password")}>
            <input
              type={showRePassword ? "text" : "password"}
              id="re-password"
              className={cx("input")}
              placeholder="Confirm password"
              spellCheck="false"
              required
            />
            <div className={cx("icon")}>
              <FontAwesomeIcon
                onClick={handleShowRePassword}
                icon={showRePassword ? faEyeSlash : faEye}
                style={{ cursor: "pointer", color: "#8a8a8a" }}
              ></FontAwesomeIcon>
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            className={cx("button")}
            sx={{ width: "100%", height: "46px" }}
          >
            register
          </Button>
          <div className={cx("login")}>
            <Typography>
              If you have an account{" "}
              <Link to="/login">
                <Typography
                  variant="span"
                  sx={{ color: "var(--primary-color)", cursor: "pointer" }}
                >
                  login here
                </Typography>
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
