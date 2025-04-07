import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { forwardRef, useRef, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as authService from "../../services/AuthService";
import * as AuthValidator from "../../validation/AuthValidation";
import * as OTPValidator from "../../validation/OTPValidation";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const [errorFullname, setErrorFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [openWaitingDialog, setOpenWaitingDialog] = useState(false);

  // state for OTP
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpValue, setOtpValue] = useState(new Array(6).fill(""));
  const [errorOtp, setErrorOtp] = useState("");
  const otpRefs = useRef(new Array(6).fill(null));

  const navigate = useNavigate();

  const [openInformationDialog, setOpenInformationDialog] = useState(false);
  const [informationContent, setInformationContent] = useState("");

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

    const phoneError = AuthValidator.validatePhone(phone);

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

    if (phoneError) {
      setErrorPhone(phoneError);
    }

    if (
      !emailError &&
      !passwordError &&
      !rePasswordError &&
      !fullnameError &&
      !phoneError
    ) {
      handleCheckEmail(email);
    }
  };

  const handleCheckEmail = async (emailNeedToCheck) => {
    try {
      const response = await authService.checkEmailExistForCreateAccount(emailNeedToCheck);
      if (response.statusCode === 404) {
        setErrorEmail("");
        setOpenWaitingDialog(true); // Show waiting dialog
        fetchSendOTP(emailNeedToCheck); // Send OTP to email
      } else if (response.statusCode === 200) {
        setErrorEmail("Email already exists");
      } else {
        setErrorEmail("Check email failed");
      }
    } catch (error) {
      setInformationContent({
        type: "error",
        message: "Internal server error. Please contact support",
      });
      setOpenInformationDialog(true);
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
      setErrorEmail("Send OTP to email failed");
    }
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

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && otpValue[index] === "" && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = () => {
    const otp = otpValue.join("");
    const otpError = OTPValidator.validateOTP(otp);
    if (otpError) {
      setErrorOtp(otpError);
    } else {
      fetchRegister(otp);
    }
  };

  const fetchRegister = async (otp) => {
    try {
      const response = await authService.postRegister(
        fullname,
        email,
        password,
        rePassword,
        phone,
        otp
      );

      if (response.statusCode === 200) {
        setOtpDialogOpen(false);
        setErrorOtp("");
        setOtpValue(new Array(6).fill(""));
        setInformationContent({
          type: "success",
          message: "Register successfully.",
        });
        setOpenDialog(true);
      } else {
        setErrorOtp("Invalid OTP code");
      }
    } catch (error) {
      setInformationContent({
        type: "error",
        message: "Internal server error. Please contact support",
      });
      setOpenInformationDialog(true);
    }
  };

  const handleOtpDialogClose = () => {
    setOtpDialogOpen(false);
    setErrorOtp("");
    setOtpValue(new Array(6).fill(""));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/login");
  };

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

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
              placeholder="Full name"
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
              autoComplete="new-email"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorEmail("");
              }}
            />
            {errorEmail && (
              <Typography sx={{ color: "red" }}>{errorEmail}</Typography>
            )}
          </div>
          <div className={cx("form-group")}>
            <input
              type="text"
              id="phone"
              className={!errorPhone ? cx("input") : cx("error-input")}
              placeholder="Phone"
              spellCheck="false"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrorPhone("");
              }}
            />
            {errorPhone && (
              <Typography sx={{ color: "red" }}>{errorPhone}</Typography>
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
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorPassword("");
              }}
            />
            {errorRePassword && (
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
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
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
            {informationContent && (
              <Typography
                color={
                  informationContent.type === "error" ? "error" : "success"
                }
                sx={{ fontWeight: 500, fontSize: "30px" }}
              >
                {informationContent.message}
              </Typography>
            )}
          </Typography>
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
      </Dialog>
    </div>
  );
}

export default RegisterPage;
