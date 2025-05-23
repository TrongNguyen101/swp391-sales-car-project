import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import {
  Button,
  CircularProgress,
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
import { useUserData } from "../../App";

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
  const { refetch } = useUserData(); // Get user data from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [errorForgotPasswordEmail, setErrorForgotPasswordEmail] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  // update new password
  const [newPasswordDialogOpen, setNewPasswordDialogOpen] = useState(false);
  const [otpValue, setOtpValue] = useState(new Array(6).fill(""));
  const [errorOtp, setErrorOtp] = useState("");
  const [navigateTo, setNavigateTo] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [reNewPassword, setReNewPassword] = useState("");
  const [errorReNewPassword, setErrorReNewPassword] = useState("");
  const [showReNewPassword, setShowReNewPassword] = useState(false);

  const [openWaitingDialog, setOpenWaitingDialog] = useState(false);
  const [informationContent, setInformationContent] = useState({});
  const [openInformationDialog, setOpenInformationDialog] = useState(false);

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
      if (response.statusCode === 200) {
        localStorage.setItem("Bearer", response.data.token);
        console.log("Login successfully", response.data.token);
        setInformationContent({
          type: "success",
          message: "Login successfully",
        });
        setNavigateTo("/");
        setOpenInformationDialog(true);
      }
      if (response.statusCode === 404) {
        setErrorEmail(response.message);
      }
      if (response.statusCode === 400) {
        setInformationContent({
          type: "error",
          message: response.message,
        });
        setOpenInformationDialog(true);
      }
      if (response.statusCode === 401) {
        setErrorPassword(response.message);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
      setInformationContent({
        type: "error",
        message: "Internal server error. Please contact support",
      });
    }
  };

  const handleOnLogin = (event) => {
    event.preventDefault();
    const emailError = AuthValidator.validateEmail(email);
    const passwordError = AuthValidator.validatePassword(password);

    if (emailError) {
      setErrorEmail(emailError);
    }

    if (passwordError) {
      setErrorPassword(passwordError);
    }
    if (!emailError && !passwordError) {
      fetchLogin();
    }
  };

  const handleForgotPasswordSubmit = () => {
    const emailError = AuthValidator.validateEmail(forgotPasswordEmail);
    if (emailError) {
      setErrorForgotPasswordEmail(emailError);
    } else {
      handleCheckEmail(forgotPasswordEmail);
    }
  };

  const handleCheckEmail = async (emailNeedToCheck) => {
    try {
      const response = await authService.checkEmail(emailNeedToCheck);
      if (response.statusCode === 200) {
        setErrorForgotPasswordEmail("");
        setOpenForgotPasswordDialog(false);
        setOpenWaitingDialog(true); // Show waiting dialog
        fetchSendOTP(emailNeedToCheck); // Send OTP to email
      } else if (response.statusCode === 404) {
        setErrorForgotPasswordEmail("Email not found");
      } else {
        setErrorForgotPasswordEmail("Check email failed");
      }
    } catch (error) {
      setInformationContent({
        type: "error",
        message: "Internal server error. Please contact support",
      });
    }
  };

  const fetchSendOTP = async (email) => {
    try {
      const response = await authService.postSendOTP(email);
      if (response.statusCode === 200) {
        localStorage.setItem("email", email);
        setOpenWaitingDialog(false);
        setOtpDialogOpen(true);
      } else {
        setErrorEmail("Send OTP to email failed");
        setOpenWaitingDialog(false);
      }
    } catch (error) {
      console.log("Error at fetchSendOTP", error);
      setOpenWaitingDialog(false);
      setErrorForgotPasswordEmail("Send OTP to email failed");
    }
  };

  const handleCloseDialog = () => {
    setOpenInformationDialog(false);
    navigate(navigateTo);
    setNavigateTo("");
    refetch(); // Fetch user data after login
  };

  const handleForgotPasswordClose = () => {
    setOpenForgotPasswordDialog(false);
    setErrorForgotPasswordEmail("");
    setForgotPasswordEmail("");
  };

  const handleOtpDialogClose = () => {
    setOtpDialogOpen(false);
    setErrorOtp("");
    setOtpValue(new Array(6).fill(""));
    setOpenForgotPasswordDialog(true);
    setErrorForgotPasswordEmail("");
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtpValue = [...otpValue];
      newOtpValue[index] = value;
      setOtpValue(newOtpValue);
    }
    setTimeout(() => {
      if (value !== "" && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }, 0);
  };

  const handleOtpSubmit = () => {
    const otp = otpValue.join("");
    const otpError = OTPValidator.validateOTP(otp);
    if (otpError) {
      setErrorOtp(otpError);
    } else {
      fetchVerifyOTP(otp);
    }
  };

  const fetchVerifyOTP = async (otp) => {
    try {
      const response = await authService.postVerifyOTP(
        localStorage.getItem("email"),
        otp
      );

      if (response.statusCode === 200) {
        setOtpDialogOpen(false);
        setNewPasswordDialogOpen(true);
        setErrorOtp("");
      }
      if (response.status === 400) {
        setErrorOtp(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && otpValue[index] === "" && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault(); // Prevent default paste behavior

    const pastedText = e.clipboardData.getData("text");
    const cleanText = pastedText.replace(/\D/g, ""); // Remove non-numeric characters

    if (!cleanText) return;

    const newOtpValue = [...otpValue];

    for (let i = 0; i < cleanText.length && i < otpRefs.current.length; i++) {
      newOtpValue[i] = cleanText[i];
    }

    setOtpValue(newOtpValue);

    // Move focus to the last entered character
    const nextIndex = Math.min(cleanText.length, otpRefs.current.length - 1);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowReNewPassword = () => {
    setShowReNewPassword(!showReNewPassword);
  };

  // Reset password
  const handleResetPasswordSubmit = (event) => {
    event.preventDefault();
    const newPasswordError = AuthValidator.validatePassword(newPassword);
    const reNewPasswordError = AuthValidator.validateConfirmPassword(
      newPassword,
      reNewPassword
    );

    if (newPasswordError) {
      setErrorNewPassword(newPasswordError);
    }

    if (reNewPasswordError) {
      setErrorReNewPassword(reNewPasswordError);
    }
    if (!reNewPasswordError && !newPasswordError) fetchResetPassword();
  };

  const fetchResetPassword = async () => {
    try {
      var otp = otpValue.join("");
      const response = await authService.postResetPassword(
        localStorage.getItem("email"),
        newPassword,
        reNewPassword,
        otp
      );
      if (response.statusCode === 200) {
        setNewPasswordDialogOpen(false);
        setInformationContent({
          type: "success",
          message: "Reset password successfully",
        });
        setOpenInformationDialog(true);
        setNavigateTo("/login");
      } else {
        setInformationContent({
          type: "error",
          message: "Reset password failed",
        });
        setOpenInformationDialog(true);
      }
    } catch (error) {
      console.log(error.response);
      setInformationContent({
        type: "error",
        message: "Reset password failed",
      });
      setOpenInformationDialog(true);
    }
  };

  const handleResetPasswordClose = () => {
    setNewPasswordDialogOpen(false);
  };

  const handleToFogotPassword = () => {
    setOpenForgotPasswordDialog(true);
  };

  return (
    <div className={cx("container")}>
      {/* Form login */}
      <div className={cx("content")}>
        <form className={cx("form")} onSubmit={handleOnLogin}>
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

      {/* Show forgot password popup */}
      <Dialog
        open={openForgotPasswordDialog}
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

      {/* Show reset password popup */}
      <Dialog
        open={newPasswordDialogOpen}
        aria-labelledby="forgot-password-dialog-title"
        aria-describedby="forgot-password-dialog-description"
      >
        <DialogTitle
          id="forgot-password-dialog-title"
          sx={{ textAlign: "center" }}
        >
          Reset Password
        </DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          <DialogContentText
            id="forgot-password-dialog-description"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "300",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            Please enter new password.
          </DialogContentText>
          <form className={cx("form")} onSubmit={handleResetPasswordSubmit}>
            <div className={cx("form-group")}>
              <div className={cx("field-password")}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="password"
                  className={
                    !errorNewPassword ? cx("input") : cx("error-input")
                  }
                  placeholder="Password"
                  spellCheck="false"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setErrorNewPassword("");
                  }}
                />
                {errorNewPassword && (
                  <Typography sx={{ color: "red" }}>
                    {errorNewPassword}
                  </Typography>
                )}
                <div className={cx("icon")}>
                  <FontAwesomeIcon
                    onClick={handleShowNewPassword}
                    icon={showNewPassword ? faEyeSlash : faEye}
                    style={{ cursor: "pointer", color: "#8a8a8a" }}
                  ></FontAwesomeIcon>
                </div>
              </div>
              <div className={cx("field-password")}>
                <input
                  type={showReNewPassword ? "text" : "password"}
                  id="re-password"
                  className={
                    !errorReNewPassword ? cx("input") : cx("error-input")
                  }
                  placeholder="Confirm password"
                  spellCheck="false"
                  value={reNewPassword}
                  onChange={(e) => {
                    setReNewPassword(e.target.value);
                    setErrorReNewPassword("");
                  }}
                />
                {errorReNewPassword && (
                  <Typography sx={{ color: "red" }}>
                    {errorReNewPassword}
                  </Typography>
                )}
                <div className={cx("icon")}>
                  <FontAwesomeIcon
                    onClick={handleShowReNewPassword}
                    icon={showReNewPassword ? faEyeSlash : faEye}
                    style={{ cursor: "pointer", color: "#8a8a8a" }}
                  ></FontAwesomeIcon>
                </div>
              </div>
            </div>
            <Button
              onClick={handleResetPasswordSubmit}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
            <Button
              onClick={handleResetPasswordClose}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Show Enter OTP code popup */}
      <Dialog
        open={otpDialogOpen}
        aria-labelledby="otp-dialog-title"
        aria-describedby="otp-dialog-description"
        sx={{ textAlign: "center" }}
      >
        <DialogTitle id="otp-dilog-title">Enter OTP code</DialogTitle>
        <DialogContentText
          sx={{
            fontSize: "1.2rem",
            fontWeight: "300",
            width: "400px",
            height: "50px",
          }}
        >
          Please enter OTP code sent to your email
        </DialogContentText>
        <div className={cx("otp-inputs")}>
          {otpValue.map((value, index) => (
            <input
              key={index}
              ref={(el) => (otpRefs.current[index] = el)}
              margin="10px"
              type="text"
              variant="outlined"
              value={value}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              inputProps={{
                maxLength: 1,
              }}
              onPaste={handleOtpPaste}
              error={!!errorOtp}
            />
          ))}
        </div>
        {errorOtp && (
          <Typography sx={{ color: "red", textAlign: "center" }}>
            {errorOtp}
          </Typography>
        )}
        <DialogActions sx={{ justifyContent: "center", marginBottom: "15px" }}>
          <Button variant="contained" onClick={handleOtpSubmit}>
            Submit
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleOtpDialogClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Show waiting dialog */}
      <Dialog
        open={openWaitingDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "540px", height: "180px" } }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: "30px" }}>
            Sending OTP code to your email...
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>

      {/* Show information dialog */}
      <Dialog
        open={openInformationDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "540px", height: "160px" } }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {informationContent && (
            <Typography
              color={informationContent.type === "error" ? "error" : "success"}
              sx={{ fontWeight: 500, fontSize: "30px" }}
            >
              {informationContent.message}
            </Typography>
          )}
        </DialogTitle>

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
    </div>
  );
}

export default LoginPage;
