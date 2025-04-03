import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";

import * as cartService from "../../services/CartService";
import * as DepositService from "../../services/DepositService";

import styles from "./CreateURLPaymentOfAccessory.module.scss";
import { useUserData } from "../../App";

const cx = classNames.bind(styles);

function CreateURLPaymentOfAccessory() {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const [cartItems, setCartItems] = useState([]);

  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorCustomerName, setErrorCustomerName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorAddress, setErrorAddress] = useState("");

  const token = localStorage.getItem("Bearer");
  const isLoggedIn = Boolean(token);

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      const response = await cartService.getAllCartItems(token);
      if (response.statusCode !== 200) {
        setCartItems([]);
      } else {
        console.log(response.data);
        localStorage.setItem("cartItems", JSON.stringify(response.data));
        setCartItems(response.data);
      }
    } catch (error) {
      setCartItems([]);
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    fetchCartItems();
    setCustomerName(userData.userName);
    setEmail(userData.email);
    setPhone(userData.phone);
    setAddress(userData.address);

    // eslint-disable-next-line
  }, [userData]);

  const handleOrderSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    if (!customerName || customerName.trim().length === 0) {
      setErrorCustomerName("Full Name is required");
      isValid = false;
    }

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorEmail("Valid Email is required");
      isValid = false;
    }

    if (!phone || !/^\d{10,15}$/.test(phone)) {
      setErrorPhone("Valid Phone number is required");
      isValid = false;
    }

    if (!address || address.trim().length === 0) {
      setErrorAddress("Address is required");
      isValid = false;
    }

    if (isValid) {
      fetchCreateURLPaymentOfAccessory();
    }
  };

  const fetchCreateURLPaymentOfAccessory = async () => {
    try {
      const Amount = cartItems.reduce(
        (sum, item) => (sum += item.price * item.quantity),
        0
      );
      console.log(Amount);
      const amountString = formatPrice(Amount);
      console.log(amountString);
      const paymentInformation = {
        OrderInfo: "Accessory",
        Amount: amountString,
      };

      const response = await DepositService.createPaymentURL(
        paymentInformation
      );

      if (response.statusCode === 200) {
        console.log(response.data);
        localStorage.setItem("customerName", customerName);
        localStorage.setItem("phone", phone);
        localStorage.setItem("email", email);
        localStorage.setItem("address", address);
        localStorage.setItem("typeofProduct", "accessory");
        window.location.href = response.data;
      }
    } catch (error) {
      setMessage("Error creating accessory");
      setOpenErrorDialog(true);
      console.log(error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("container__left")}>
          <div className={cx("content__top")}>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "32px",
              }}
            >
              Complete your order
            </Typography>
            <div className={cx("content__top--cart-number")}>
              <Typography sx={{ fontWeight: 900, fontSize: "24px" }}>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </Typography>
            </div>
          </div>
          {cartItems.map((cartItem, index) => (
            <div className={cx("content__cartItems")}>
              <div className={cx("content__cartItem--image")}>
                <img
                  src={`https://localhost:7005/api/Images/Accessory/${cartItem.imageUrl}`}
                  alt={cartItem.name}
                />
              </div>
              <div className={cx("content__cartItem--infor")}>
                <div className={cx("content__cartItem--infor__top")}>
                  <Typography>Code: {cartItem.id}</Typography>
                </div>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "32px",
                    paddingBottom: "10px",
                  }}
                >
                  {cartItem.productName}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "24px",
                    paddingBottom: "10px",
                  }}
                >
                  Unit price: {formatPrice(cartItem.price)} VND
                </Typography>
                <div className={cx("content__cartItem--infor__bottom")}>
                  <div
                    className={cx("content__cartItem--infor__bottom--quantity")}
                  >
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "24px",
                      }}
                    >
                      Quantity: {cartItem.quantity}
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "32px",
                      width: "500px",
                    }}
                  >
                    Subtotal: {formatPrice(cartItem.price * cartItem.quantity)}{" "}
                    VND
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={cx("container__right")}>
          <div className={cx("content")}>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "32px",
                paddingBottom: "20px",
              }}
            >
              Order Summary
            </Typography>

            {/*information of User --------------------------------------------------------------------------------------------------------------- */}
            {/* wrapper */}
            <Box sx={{ padding: "20px", backgroundColor: "#f7f7f7" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  sx={{ width: "500px", margin: "10px 0", padding: "0 10px" }}
                >
                  <TextField
                    sx={{ width: "100%", marginBottom: "1em" }}
                    type="text"
                    label="Full Name"
                    spellCheck="false"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      setErrorCustomerName("");
                    }}
                    error={!!errorCustomerName}
                    helperText={errorCustomerName || ""}
                  />

                  <TextField
                    sx={{ width: "100%", marginBottom: "1em" }}
                    type="email"
                    label="Email"
                    spellCheck="false"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorEmail("");
                    }}
                    error={!!errorEmail}
                    helperText={errorEmail || ""}
                  />

                  <TextField
                    sx={{ width: "100%", marginBottom: "1em" }}
                    type="tel"
                    label="Phone"
                    spellCheck="false"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrorPhone("");
                    }}
                    error={!!errorPhone}
                    helperText={errorPhone || ""}
                  />

                  <TextField
                    sx={{ width: "100%", marginBottom: "1em" }}
                    type="text"
                    label="Address"
                    spellCheck="false"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrorAddress("");
                    }}
                    error={!!errorAddress}
                    helperText={errorAddress || ""}
                  />
                </Box>
              </Box>
            </Box>
            {/*information of User --------------------------------------------------------------------------------------------------------------- */}

            <div className={cx("content__Total")}>
              <Typography>Total</Typography>
              <Typography>
                {formatPrice(
                  cartItems.reduce(
                    (sum, item) => (sum += item.price * item.quantity),
                    0
                  )
                )}{" "}
                VND
              </Typography>
            </div>
            <div className={cx("content__button")}>
              <Button
                onClick={handleOrderSubmit}
                color="primary"
                variant="contained"
                sx={{ width: "100%" }}
              >
                Pay now with VNPay
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Show create invoice to cart successfully dialog */}
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": { width: "440px", paddingBottom: "10px" },
        }}
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
      {/* Show error dialog */}
      <Dialog
        open={openErrorDialog}
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
            onClick={handleCloseErrorDialog}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateURLPaymentOfAccessory;
