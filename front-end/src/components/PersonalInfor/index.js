import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import classNames from 'classnames/bind';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

import * as DecodePayload from '../../lib/DecodePayload'; // Import DecodePayload module
import * as AuthValidator from "../../validation/AuthValidation";
import * as authService from "../../services/AuthService";
import * as OTPValidator from "../../validation/OTPValidation";

import styles from './PersonalInfor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



const cx = classNames.bind(styles);
const API_URL = "https://localhost:7005/api/Users";

const PersonalInfo = () => {
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const [newPasswordDialogOpen, setNewPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [reNewPassword, setReNewPassword] = useState("");
  const [showReNewPassword, setShowReNewPassword] = useState(false);
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorReNewPassword, setErrorReNewPassword] = useState("");

  // Confirm password dialog
  const [confirmPasswordDialogOpen, setConfirmPasswordDialogOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  // OTP dialog
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpValue, setOtpValue] = useState(new Array(6).fill(""));
  const [errorOtp, setErrorOtp] = useState("");
  const otpRefs = useRef([]);

  // Information dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
    fetchUserData();
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('Bearer');
      if (!token) {
        navigate('/login'); // Redirect to login page if not logged in
      }

      const decodedPayload = DecodePayload.decodePayload(token);
      const userId = decodedPayload.sub; // Ensure the token contains the user ID
      if (!userId) {
        console("User ID not found in token!");
      }

      const response = await axios.get(`${API_URL}/${userId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.status === 200) {
        setUserData({ ...response.data.data, id: userId }); // Ensure userId is set in userData
        setEditData(response.data.data); // 
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(userData);
    setError({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const validate = () => {
    let tempError = {};
    if (editData.userName.length > 25) tempError.userName = "Name must be less than 25 characters.";
    if (editData.userName.length === 0) tempError.userName = "Name must not be empty.";
    if (!/\S+@\S+\.\S+/.test(editData.email)) tempError.email = "Email is not valid.";
    if (editData.email.length === 0) tempError.email = "Email must not be empty.";
    if (!/^\d+$/.test(editData.phone)) tempError.phone = "Phone must be a number.";
    if (editData.phone.length < 10 || editData.phone.length > 11) tempError.phone = "Phone must be 10 or 11 digits.";
    setError(tempError);
    return Object.keys(tempError).length === 0;
  };


  const handleSave = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (window.confirm("Do you want to save the changes?")) {
        try {
          const token = localStorage.getItem('Bearer');
          if (!token) {
            navigate('/login'); // Redirect to login page if not logged in
          }

          const userId = userData.id; // Ensure the user ID is correctly extracted
          if (!userId) {
            alert("User ID not found!");
            return;
          }

          const response = await axios.put(`${API_URL}/Edit/${userId}`, editData, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            setUserData(editData); // Cập nhật lại dữ liệu gốc
            setOpen(false);
            alert("Update successfully!");
          } else {
            alert(response.data.message || "Can not update the data!");
          }
        } catch (error) {
          console.error('Error', error);
          alert('Can not update the data!');
        }
      }
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
    if (!reNewPasswordError && !newPasswordError) fetchChangePassword();
  };

  const fetchChangePassword = async () => {
    try {
      const response = await authService.postResetPassword(
        userData.email,
        newPassword,
        reNewPassword,
        otpValue.join("")
      );
      if (response.status === 200) {
        setNewPasswordDialogOpen(false);
        setMessage(response.data.message);
        setOpenDialog(true);
      }
      if (response.status === 400) {
        setErrorNewPassword(response.data.message);
      }
    } catch (error) {
      console.log(error.response);
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
    const confirmPasswordError = AuthValidator.validatePassword(confirmPassword);

    if (confirmPasswordError) {
      setErrorConfirmPassword(confirmPasswordError);
    }

    if (!confirmPasswordError) fetchConfirmPassword();
  };

  const fetchConfirmPassword = async () => {
    try {
      const response = await authService.confirmPassword(userData.email, confirmPassword);
      if (response.status === 200) {
        setOtpDialogOpen(true);
        setConfirmPasswordDialogOpen(false);
        console.log("OTP sent to email: ", response);
      }
      if (response.status === 404) {
        setErrorConfirmPassword(response.data.message);
      }
      if (response.status === 400) {
        alert(response.data.message);
      }
      if (response.status === 401) {
        setErrorConfirmPassword(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }

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
      const response = await authService.postVerifyOTP(
        userData.email,
        otp
      );

      if (response.status === 200) {
        setOtpDialogOpen(false);
        setNewPasswordDialogOpen(true);
        console.log("OTP verified: ", response);
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

  const handleOtpDialogClose = () => {
    setOtpDialogOpen(false);
    setErrorOtp("");
    setOtpValue(new Array(6).fill(""));
  };


  return (
    <div className={cx('container__personal-info')}>
      <div className={cx('personal-info')}>
        <div className={cx('title')}>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: '500' }}>
            Personal Information
          </Typography>
          <Button onClick={handleClickOpen}>Edit Information</Button>
        </div>
        <div className={cx('info')}>
          <div className={cx('info-item')}>
            <span className={cx('label')}>Full Name:</span>
            <span className={cx('value')}>{userData.userName}</span>
          </div>
          <div className={cx('info-item')}>
            <span className={cx('label')}>Email:</span>
            <span className={cx('value')}>{userData.email}</span>
          </div>
          <div className={cx('info-item')}>
            <span className={cx('label')}>Phone Number:</span>
            <span className={cx('value')}>{userData.phone}</span>
          </div>
        </div>
        <div className={cx('password-change')}>
          <Button onClick={handleOpenConfirmPasswordDialog}>Change Password</Button>
        </div>
      </div>

      {/* Show update information dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit your information below:
          </DialogContentText>
          <form onSubmit={handleSave}>
            <TextField
              autoFocus
              margin="dense"
              name="userName"
              label="Full Name"
              type="text"
              fullWidth
              value={editData.userName}
              onChange={handleChange}
              error={!!error.userName}
              helperText={error.userName}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={editData.email}
              onChange={handleChange}
              error={!!error.email}
              helperText={error.email}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone Number"
              type="text"
              fullWidth
              value={editData.phone}
              onChange={handleChange}
              error={!!error.phone}
              helperText={error.phone}
            />
            <DialogActions>
              <Button onClick={handleClose} color="error" variant="outlined">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant='contained'>
                OK
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Show confirm passowrd dialog */}
      <Dialog
        open={confirmPasswordDialogOpen}
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

      {/* Show login successful dialog */}
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "440px", height: "140px" } }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: "500",
            lineHeight: "1.5",
          }}
        >
          {message}
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
};

export default PersonalInfo;