import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import * as authService from "../../services/AuthService";
import * as AuthValidator from "../../validation/AuthValidation";
import * as OTPValidator from "../../validation/OTPValidation";


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
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [errorForgotPasswordEmail, setErrorForgotPasswordEmail] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpValue, setOtpValue] = useState(new Array(6).fill(""));
  const [errorOtp, setErrorOtp] = useState("");
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleBackToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        setMessage(response.data.message);
        setOpenDialog(true);
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

  const fetchSendOTP = async (email) => {
    try {
      const response = await authService.postSendOTP(email);
      if (response.status !== 200) {
        setErrorForgotPasswordEmail(response.data.message);
      } else {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      return error.response;
    }
  };

  const fetchVerifyOTP = async (otp) => {};

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
    if (!emailError && !passwordError) fetchLogin();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/");
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
    setErrorForgotPasswordEmail("");
    setForgotPasswordEmail("");
  };

  const handleOtpDialogClose = () => {
    setOtpDialogOpen(false);
  };

  const handleOtpChange = (e, index) => {
    const {value} = e.target;
    if(/^[0-9]$/.test(value) || value === "") {
      const newOtpValue = [...otpValue];
      newOtpValue[index] = value;
      setOtpValue(newOtpValue);
    }
    if(value !==null && index < otpRefs.cunrrent.Length - 1){
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpSubmit = () => {
    const otp = otpValue.join("");
    const otpError = OTPValidator.validateOTP(otp);
    if(otpError) {
      setErrorOtp(otpError);
    } else {
      fetchVerifyOTP(otp);
    }
  };

  const handleToFogotPassword = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordSubmit = () => {
    const emailError = AuthValidator.validateEmail(forgotPasswordEmail);
    if (emailError) {
      setErrorForgotPasswordEmail(emailError);
    } else {
      fetchSendOTP(forgotPasswordEmail);
      localStorage.setItem("email", forgotPasswordEmail);
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
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "440px", height: "180px" } }}
      >
        <DialogTitle id="alert-dialog-slide-title" sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontSize: "1.6rem", fontWeight: "500", lineHeight: "1.5" }}
          >
            {message}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography
              variant="h6"
              sx={{ fontSize: "1.2rem", fontWeight: "300", lineHeight: "1.5" }}
            >
              You have successfully logged in.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={forgotPasswordOpen}
        onClose={handleForgotPasswordClose}
        aria-labelledby="forgot-password-dialog-title"
        aria-describedby="forgot-password-dialog-description"
      >
        <DialogTitle id="forgot-password-dialog-title">
          Forgot Password
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="forgot-password-dialog-description">
            To reset your password, please enter your email address.
          </DialogContentText>
          <TextField
            autoFocus={true}
            margin="dense"
            id="forgot-password-email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={forgotPasswordEmail}
            onChange={(e) => {
              setForgotPasswordEmail(e.target.value);
              setErrorForgotPasswordEmail("");
            }}
            error={!!errorForgotPasswordEmail}
            helperText={errorForgotPasswordEmail}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleForgotPasswordSubmit}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            onClick={handleForgotPasswordClose}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog 
      open={otpDialogOpen}
      >
        <DialogTitle></DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginPage;
