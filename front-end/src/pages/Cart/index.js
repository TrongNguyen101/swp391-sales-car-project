import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./Cart.module.scss";
import * as cartService from "../../services/CartService";
import { useNavigate, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

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
        setCartItems(response.data);
      }
    } catch (error) {
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCartItems();
    // eslint-disable-next-line
  }, []);

  //  Increase quantity
  const handleIncreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
  };
  // Decrease quantity
  const handleDecreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
    }
  };

  // Save cart items
  const saveCartItems = async (token, cartItems) => {
    try {
      const response = await cartService.updateCartItems(token, cartItems);
      console.log("aaaa", response);
      return response.message;
    } catch (error) {
      console.log("Error saving cart items:", error.message);
      return error.message;
    }
  };

  useEffect(() => {
    console.log("cartItems: ", cartItems);
    saveCartItems(token, cartItems);

    const handleBeforeUnload = async (event) => {
      await saveCartItems(token, cartItems);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      saveCartItems(token, cartItems);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleSubmit = () => {
    const response = saveCartItems(token, cartItems);
    setMessage(response);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className={cx("wrapper")}>
      {cartItems.length === 0 ? (
        // UI cart empty
        <div className={cx("container")}>
          <div className={cx("content__empty")}>
            <Typography>Your Cart is empty</Typography>
          </div>
        </div>
      ) : (
        // UI cart not empty
        <div className={cx("container")}>
          <div className={cx("container__left")}>
            <div className={cx("content__top")}>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "32px",
                }}
              >
                Cart
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
                    <FontAwesomeIcon icon={faTrash} />
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
                    {cartItem.price} VND
                  </Typography>
                  <div className={cx("content__cartItem--infor__bottom")}>
                    <div
                      className={cx(
                        "content__cartItem--infor__bottom--quantity"
                      )}
                    >
                      <Button
                        onClick={() => handleDecreaseQuantity(index)}
                        variant="outlined"
                        sx={{ fontSize: "18px" }}
                      >
                        -
                      </Button>
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "24px",
                        }}
                      >
                        {cartItem.quantity}
                      </Typography>

                      <Button
                        onClick={() => handleIncreaseQuantity(index)}
                        variant="outlined"
                        sx={{ fontSize: "18px" }}
                      >
                        +
                      </Button>
                    </div>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "32px",
                        width: "500px",
                      }}
                    >
                      Subtotal:{" "}
                      {formatPrice(cartItem.price * cartItem.quantity)} VND
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
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  sx={{ width: "100%" }}
                >
                  Submit
                </Button>
              </div>
              <div className={cx("content__button")}>
                <Button
                  // onClick={handleResetPasswordClose}
                  color="error"
                  variant="outlined"
                  sx={{ width: "100%" }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          {/* Show adding accessory to cart successfully dialog */}
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
        </div>
      )}
    </div>
  );
}

export default CartPage;
