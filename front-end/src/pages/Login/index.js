import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import * as authService from "../../services/AuthService";
import * as AuthValidator from "../../validation/AuthValidation";

const cx = classNames.bind(styles);

/**
 * LoginPage component renders a login form with email and password fields.
 * It includes functionality to show/hide the password, navigate to the home page,
 * and navigate to the forgot password page.
 *
 * @component
 * @returns {JSX.Element} The rendered login page component.
 */
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
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

  /**
   * Handles the login process by sending a POST request with the provided email and password.
   * Stores the received token in local storage and navigates to the home page upon successful login.
   * Displays appropriate error messages based on the response status.
   *
   * @returns {Promise<void>} - A promise that resolves when the login process is complete.
   */
  const fetchLogin = async () => {
    try {
      const response = await authService.postLogin(email, password);
      if (response.status === 200) {
        localStorage.setItem("Bearer", response.data.data.token);
        navigate("/");
        console.log(response.data);
      }
      if (response.status === 404) {
        setErrorEmail(response.data.message);
      }
      if (response.status === 400) {
        alert(response.data.message);
      }
      if (response.status === 401) {
        setErrorPassword(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const emailError = AuthValidator.validateEmail(email);
    const passwordError = AuthValidator.validatePassword(password);

    if (emailError) {
      setErrorEmail(emailError);
    }

    if (passwordError) {
      setErrorPassword(passwordError);
    }
    if (!emailError && !passwordError)
    fetchLogin();
  };

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <form className={cx("form")} onSubmit={handleOnSubmit}>
          <div className={cx("vinfast-logo")}>
            <div className={cx("logo-image")} onClick={handleBackToHome}>
              <img src="./logoJPG-removebg-preview.png" alt="vinfast-logo" />
            </div>
          </div>
          <div className={cx("form-group")}>
            <input
              type="email"
              id="email"
              className={!errorEmail ? cx("input") : cx("error-input")}
              placeholder="Email"
              spellCheck="false"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorEmail("");
              }}
            />
            {errorEmail && (
              <Typography sx={{ color: "red" }}>{errorEmail}</Typography>
            )}
          </div>
          <div className={cx("field-password")}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={!errorPassword ? cx("input") : cx("error-input")}
              placeholder="Password"
              spellCheck="false"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorPassword("");
              }}
            />
            {errorPassword && (
              <Typography sx={{ color: "red" }}>{errorPassword}</Typography>
            )}
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
              If you don't have an account{" "}
              <Link to="/register">
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
