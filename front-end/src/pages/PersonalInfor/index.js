import React, { useRef, useState } from "react";

import classNames from "classnames/bind";
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

import * as AuthValidator from "../../validation/AuthValidation";
import * as authService from "../../services/AuthService";
import * as OTPValidator from "../../validation/OTPValidation";
import * as adminService from "../../services/AdminServices";
import { useUserData } from "../../App";

import styles from "./PersonalInfor.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const PersonalInfoPage = () => {
  // User data state
  const { userData, refetch } = useUserData();
  // Status of updating user information
  const [updateStatus, setUpdateStatus] = useState({});
  const [openWaitingDialog, setOpenWaitingDialog] = useState(false);

  const [newPasswordDialogOpen, setNewPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [reNewPassword, setReNewPassword] = useState("");
  const [showReNewPassword, setShowReNewPassword] = useState(false);
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorReNewPassword, setErrorReNewPassword] = useState("");

  // State for editing user information form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [openEditUserInformationDialog, setOpenEditUserInformationDialog] =
    useState(false);

  // State for editing information form
  const [errorFullname, setErrorFullname] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorAddress, setErrorAddress] = useState("");

  // Confirm password dialog
  const [openConfirmPasswordDialog, setConfirmPasswordDialogOpen] =
    useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  // OTP dialog
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpValue, setOtpValue] = useState(new Array(6).fill(""));
  const [errorOtp, setErrorOtp] = useState("");
  const otpRefs = useRef([]);

  // Information dialog
  const [openInformationDialog, setOpenInformationDialog] = useState(false);

  const handleClickOpenEditInformationForm = () => {
    setOpenEditUserInformationDialog(true);
    setUpdateStatus(null);
    setFullName(userData?.userName || "");
    setEmail(userData?.email || "");
    setPhone(userData?.phone || "");
    setAddress(userData?.address || "");
  };

  const handleCloseEditInformationForm = () => {
    setOpenEditUserInformationDialog(false);
    setUpdateStatus(null);
  };

  const handleCloseInformationDialog = () => {
    setOpenInformationDialog(false);
    setUpdateStatus("");
  };

  const handleSubmitEDitInformationForm = (event) => {
    event.preventDefault();

    const fullnameError = AuthValidator.validateFullname(fullName);
    if (fullnameError) {
      setErrorFullname(fullnameError);
      return;
    }

    const phoneError = AuthValidator.validatePhone(phone);
    if (phoneError) {
      setErrorPhone(phoneError);
      return;
    }
    const addressError = AuthValidator.validateAddress(address);
    if (addressError) {
      setErrorAddress(addressError);
      return;
    }
    if (!fullnameError && !phoneError && !addressError) {
      handleSave();
    }
  };

  const handleSave = async () => {
    try {
      const response = await adminService.userUpdateInformation(
        fullName,
        email,
        phone,
        address
      );
      if (response.statusCode === 200) {
        setUpdateStatus({
          type: "success",
          message: "Profile updated successfully",
        });
        await refetch();
        setOpenEditUserInformationDialog(false);
        setOpenInformationDialog(true);
      } else {
        setOpenEditUserInformationDialog(false);
        setUpdateStatus({ type: "error", message: "Failed to update profile" });
        setOpenInformationDialog(true);
      }
    } catch (error) {
      setOpenEditUserInformationDialog(false);
      setUpdateStatus({ type: "error", message: "Failed to update profile" });
    }
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowReNewPassword = () => {
    setShowReNewPassword(!showReNewPassword);
  };

  const handleResetPasswordClose = () => {
    setNewPasswordDialogOpen(false);
  };
  const handleChangePasswordSubmit = (event) => {
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
    if (!reNewPasswordError && !newPasswordError) {
      fetchChangePassword();
    }
  };

  const fetchChangePassword = async () => {
    try {
      const otp = otpValue.join("");
      let response;
      if (userData.roleId === 3) {
         response = await authService.postResetPassword(
          userData.email,
          newPassword,
          reNewPassword,
          otp
        );
      } else {
         response = await authService.postResetPassword(
          userData.email,
          newPassword,
          reNewPassword,
          otp
        );
      }
      if (response.statusCode === 200) {
        setNewPasswordDialogOpen(false);
        setUpdateStatus({
          type: "success",
          message: "Changed password successfully",
        });
        setOpenInformationDialog(true);
      } else {
        setNewPasswordDialogOpen(false);
        setUpdateStatus({
          type: "error",
          message: "Failed to change password",
        });
        setOpenInformationDialog(true);
      }
    } catch (error) {
      console.log("Error here: ", error);
    }
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOpenConfirmPasswordDialog = () => {
    setConfirmPasswordDialogOpen(true);
  };

  const handleConfirmPasswordClose = () => {
    setConfirmPasswordDialogOpen(false);
  };
  const handleConfirmPasswordSubmit = (event) => {
    event.preventDefault();

    const confirmPasswordError = AuthValidator.validateInput(confirmPassword);
    if (confirmPasswordError) {
      setErrorConfirmPassword(confirmPasswordError);
    }

    if (!confirmPasswordError) {
      setConfirmPasswordDialogOpen(false);
      setOpenWaitingDialog(true);
      setUpdateStatus({
        type: "success",
        message: "Sending OTP code to your email...",
      });
      fetchConfirmPassword();
    }
  };

  const fetchSendOTP = async (email) => {
    try {
      const response = await authService.postSendOTP(email);
      if (response.statusCode === 200) {
        localStorage.setItem("email", email);
        setOpenWaitingDialog(false);
        setOtpValue(new Array(6).fill(""));
        setOtpDialogOpen(true);
      } else {
        setOpenWaitingDialog(false);
        setUpdateStatus({
          type: "error",
          message: "Send OTP to email failed",
        });
        setOpenInformationDialog(true);
      }
    } catch (error) {
      setOpenWaitingDialog(false);
      setUpdateStatus({
        type: "error",
        message:
          "Internal server error. Please contact support for changing password.",
      });
      setOpenInformationDialog(true);
    }
  };

  const fetchConfirmPassword = async () => {
    try {
      const response = await authService.confirmPassword(
        userData.email,
        confirmPassword
      );
      if (response.statusCode === 200) {
        setOpenWaitingDialog(true);
        fetchSendOTP(userData.email);
        setConfirmPasswordDialogOpen(false);
      } else {
        setErrorConfirmPassword("Password is incorrect");
      }
    } catch {
      setConfirmPasswordDialogOpen(false);
      setUpdateStatus({
        type: "error",
        message:
          "Internal server error. Please contact support for changing password.",
      });
      setOpenInformationDialog(true);
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
      const response = await authService.postVerifyOTP(userData.email, otp);

      if (response.statusCode === 200) {
        setOtpDialogOpen(false);
        setNewPasswordDialogOpen(true);
        setErrorOtp("");
      } else {
        setErrorOtp("OTP is incorrect");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleOtpDialogClose = () => {
    setOtpDialogOpen(false);
    setErrorOtp("");
    setOtpValue(new Array(6).fill(""));
  };

  return (
    <div className={cx("container__personal-info")}>
      <div className={cx("personal-info")}>
        <div className={cx("title")}>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
            Personal Information
          </Typography>
          {userData.roleId === 1 ? null : (
            <Button
              variant="contained"
              onClick={handleClickOpenEditInformationForm}
            >
              Edit Information
            </Button>
          )}
        </div>
        <div className={cx("info")}>
          <div className={cx("info-item")}>
            <span className={cx("label")}>Full Name:</span>
            <span className={cx("value")}>{userData.userName}</span>
          </div>
          <div className={cx("info-item")}>
            <span className={cx("label")}>Email:</span>
            <span className={cx("value")}>{userData.email}</span>
          </div>
          <div className={cx("info-item")}>
            <span className={cx("label")}>Phone Number:</span>
            <span className={cx("value")}>{userData.phone}</span>
          </div>
          <div className={cx("info-item")}>
            <span className={cx("label")}>Address:</span>
            <span className={cx("value")}>
              {userData.address
                ? userData.address
                : "Please update your address"}
            </span>
          </div>
        </div>
        <div className={cx("password-change")}>
          {userData.roleId === 1 ? null : (
            <Button
              variant="outlined"
              onClick={handleOpenConfirmPasswordDialog}
            >
              Change Password
            </Button>
          )}
        </div>
      </div>

      {/* Show update information dialog */}
      <Dialog
        open={openEditUserInformationDialog}
        onClose={handleCloseEditInformationForm}
      >
        <DialogTitle>Edit Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit your information below:
          </DialogContentText>
          <form onSubmit={handleSubmitEDitInformationForm}>
            <TextField
              autoFocus
              margin="dense"
              name="userName"
              label="Full Name"
              type="text"
              fullWidth
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrorFullname("");
              }}
              error={!!errorFullname}
              helperText={errorFullname}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone Number"
              type="text"
              fullWidth
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrorPhone("");
              }}
              error={!!errorPhone}
              helperText={errorPhone}
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setErrorAddress("");
              }}
              error={!!errorAddress}
              helperText={errorAddress}
            />

            <DialogActions>
              <Button
                onClick={handleCloseEditInformationForm}
                color="error"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                OK
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Show confirm passowrd dialog */}
      <Dialog
        open={openConfirmPasswordDialog}
        aria-labelledby="forgot-password-dialog-title"
        aria-describedby="forgot-password-dialog-description"
      >
        <DialogTitle
          id="forgot-password-dialog-title"
          sx={{ textAlign: "center" }}
        >
          Please enter recent password.
        </DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          <form className={cx("form")} onSubmit={handleConfirmPasswordSubmit}>
            <div className={cx("form-group")}>
              <div className={cx("field-password")}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password"
                  className={
                    !errorConfirmPassword ? cx("input") : cx("error-input")
                  }
                  placeholder="Password"
                  spellCheck="false"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorConfirmPassword("");
                  }}
                />
                {errorConfirmPassword && (
                  <Typography sx={{ color: "red" }}>
                    {errorConfirmPassword}
                  </Typography>
                )}
                <div className={cx("icon")}>
                  <FontAwesomeIcon
                    onClick={handleShowConfirmPassword}
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    style={{ cursor: "pointer", color: "#8a8a8a" }}
                  ></FontAwesomeIcon>
                </div>
              </div>
            </div>
            <Button
              onClick={handleConfirmPasswordSubmit}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
            <Button
              onClick={handleConfirmPasswordClose}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Show change password dialog */}
      <Dialog
        open={newPasswordDialogOpen}
        aria-labelledby="forgot-password-dialog-title"
        aria-describedby="forgot-password-dialog-description"
      >
        <DialogTitle
          id="forgot-password-dialog-title"
          sx={{ textAlign: "center" }}
        >
          Please enter new password.
        </DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          <form className={cx("form")} onSubmit={handleChangePasswordSubmit}>
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
              onClick={handleChangePasswordSubmit}
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

      {/* Show information dialog */}
      <Dialog
        open={openInformationDialog}
        keepMounted
        onClose={handleCloseInformationDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "540px", height: "180px" } }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            marginTop: "20px",
            height: "80px",
          }}
        >
          {updateStatus && (
            <Typography
              color={updateStatus.type === "error" ? "error" : "success"}
              sx={{ fontWeight: 500, fontSize: "30px" }}
            >
              {updateStatus.message}
            </Typography>
          )}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleCloseInformationDialog}
            color="primary"
          >
            OK
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
          {updateStatus && (
            <Typography sx={{ fontWeight: 500, fontSize: "30px" }}>
              Sending OTP code to your email...
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonalInfoPage;
