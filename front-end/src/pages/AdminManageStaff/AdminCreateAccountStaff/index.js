import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "./AdminCreateAccountStaff.module.scss";
import * as AuthValidator from "../../../validation/AuthValidation";
import * as authService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function AdminCreateAccountStaffPage() {
  const navigate = useNavigate();
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
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [informationContent, setInformationContent] = useState("");
  const [openInformationDialog, setOpenInformationDialog] = useState(false);

  const [statusResponse, setStatusResponse] = useState(false);

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
      const response = await authService.checkEmailExistForCreateAccount(
        emailNeedToCheck
      );
      if (response.statusCode === 404) {
        setErrorEmail("");
        fetchRegister();
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
    }
  };

  const fetchRegister = async () => {
    try {
      const response = await authService.createNewAccountStaff(
        fullname,
        email,
        password,
        rePassword,
        phone
      );

      if (response.statusCode === 200) {
        setOpenInformationDialog(true);
        setInformationContent({
          type: "success",
          message: "Create account successfully",
        });
        setStatusResponse(true);
      } else {
        setInformationContent({
          type: "error",
          message: "Create account failed",
        });
        setOpenInformationDialog(true);
        setStatusResponse(false);
      }
    } catch (error) {
      setInformationContent({
        type: "error",
        message: "Internal server error. Please contact support",
      });
      setOpenInformationDialog(true);
      setStatusResponse(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handleCloseInformationDialog = () => {
    setOpenInformationDialog(false);
    setInformationContent("");
    if (statusResponse) {
      navigate("/dashboard/account-staff");
      return;
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "500" }}
        >
          Create new account for staff
        </Typography>
        <form className={cx("form")} onSubmit={handleOnSubmit}>
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
            Create account
          </Button>
        </form>
      </div>
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
            onClick={handleCloseInformationDialog}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminCreateAccountStaffPage;
