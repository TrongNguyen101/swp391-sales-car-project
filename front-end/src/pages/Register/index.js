import { Button, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as authService from "../../services/AuthService";
import * as AuthValidator from "../../validation/AuthValidation";

const cx = classNames.bind(styles);

/**
 * RegisterPage component handles the user registration process.
 * It includes form fields for fullname, email, password, and confirm password.
 * It validates the input fields and displays error messages if validation fails.
 * On successful registration, it navigates the user to the login page.
 *
 * @component
 * @example
 * return (
 *   <RegisterPage />
 * )
 *
 * @returns {JSX.Element} The rendered RegisterPage component.
 */
function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const [errorFullname, setErrorFullname] = useState("");

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

  /**
   * Handles the registration process by sending user details to the server.
   * 
   * @returns {Promise<void>} - A promise that resolves when the registration process is complete.
   * 
   * @throws {Error} - Throws an error if the registration process fails.
   */
  const fetchRegister = async () => {
    try {
      const response = await authService.postRegister(
        fullname,
        email,
        password
      );
      if (response.status === 200) {
        console.log(response.data);
        alert(response.data.message);
        navigate("/login");
      }
      if (response.status === 409) {
        setErrorEmail(response.data.message);
      }
      if (response.status === 400) {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  /**
   * Handles the form submission event.
   * Validates the fullname, email, password, and confirm password fields.
   * Sets error messages for each field if validation fails.
   * If all validations pass, triggers the register fetch request.
   *
   * @param {Event} event - The form submission event.
   */
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const fullnameError = AuthValidator.validateFullname(fullname);
    const emailError = AuthValidator.validateEmail(email);
    const passwordError = AuthValidator.validatePassword(password);
    const rePasswordError = AuthValidator.validateConfirmPassword(
      password,
      rePassword
    );

    if (emailError) {
      setErrorEmail(emailError);
    }
    if (passwordError) {
      setErrorPassword(passwordError);
    }
    if (rePasswordError) {
      setErrorRePassword(rePasswordError);
    }
    if (fullnameError) {
      setErrorFullname(fullnameError);
    }

    if (!emailError && !passwordError && !rePasswordError && !fullnameError) {
      fetchRegister();
    }
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
              type="text"
              id="fullname"
              className={!errorFullname ? cx("input") : cx("error-input")}
              placeholder="Fullname"
              spellCheck="false"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
                setErrorFullname("");
              }}
            />
            {errorFullname && (
              <Typography sx={{ color: "red" }}>{errorFullname}</Typography>
            )}
          </div>
          <div className={cx("form-group")}>
            <input
              type="text"
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
          <div className={cx("field-password")}>
            <input
              type={showRePassword ? "text" : "password"}
              id="re-password"
              className={!errorRePassword ? cx("input") : cx("error-input")}
              placeholder="Confirm password"
              spellCheck="false"
              value={rePassword}
              onChange={(e) => {
                setRePassword(e.target.value);
                setErrorRePassword("");
              }}
            />
            {errorRePassword && (
              <Typography sx={{ color: "red" }}>{errorRePassword}</Typography>
            )}
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
