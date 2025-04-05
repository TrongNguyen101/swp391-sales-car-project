import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import classNames from "classnames/bind";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./Cart.module.scss";
import * as cartService from "../../services/CartService";
import * as DecodePayload from "../../lib/DecodePayload";

const cx = classNames.bind(styles);
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const token = localStorage.getItem("Bearer");
  const isLoggedIn = Boolean(token);

  const fetchCartItems = async () => {
    if (!isLoggedIn) {
      setMessage("Please login to view your cart");
      setOpenDialog(true);
      return;
    }
    try {
      const response = await cartService.getAllCartItems(token);
      if (response.statusCode !== 200) {
        setCartItems([]);
      } else {
        setCartItems(response.data);
        console.log(response.data);
        localStorage.setItem("cartItems", JSON.stringify(response.data));
      }
    } catch (error) {
      setCartItems([]);
      setMessage("An error occurred while fetching your cart.");
      setOpenDialog(true);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveCartItems = useCallback(
    debounce(async (items) => {
      if (!token || items.length === 0) return;
      try {
        const response = await cartService.updateCartItems(token, items);
        if (response.statusCode !== 200) {
          setMessage(response.message);
          setOpenDialog(true);
        }
      } catch (error) {
        setMessage("An error occurred while saving your cart.");
        setOpenDialog(true);
      }
    }, 500),
    [token]
  );

  useEffect(() => {
    fetchCartItems();
    const handleBeforeUnload = () => saveCartItems(cartItems);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      saveCartItems(cartItems);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, saveCartItems]);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems, saveCartItems]);

  const handleIncreaseQuantity = (index) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (index) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDeleteCartItem = async (cartItemId) => {
    try {
      const response = await cartService.deleteCartItem(cartItemId);
      if (response.statusCode !== 200) {
        console.log("Failed to delete item from cart:");
      } else {
        console.log("Item deleted from cart successfully!");
        fetchCartItems();
      }
    } catch (error) {
      console.error("Failed to delete item from cart:", error);
    }
  };

  const handleSubmit = () => {
    const decoded = DecodePayload.decodePayload(token);
    navigate(`/invoice/${decoded.sub}`);
    console.log(decoded);
  };

  const handleCloseDialog = () => {
    if (isLoggedIn) {
      fetchCartItems();
      setOpenDialog(false);
    } else {
      navigate("/login");
      setOpenDialog(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className={cx("wrapper")}>
      {cartItems.length === 0 ? (
        <div className={cx("container_cart-empty")}>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "32px",
            }}
          >
            Your Cart is empty
          </Typography>
        </div>
      ) : (
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
              <div className={cx("content__cartItems")} key={cartItem.id}>
                <div className={cx("content__cartItem--image")}>
                  <img
                    src={`https://localhost:7005/api/Images/Accessory/${cartItem.imageUrl}`}
                    alt={cartItem.name}
                  />
                </div>
                <div className={cx("content__cartItem--infor")}>
                  <div className={cx("content__cartItem--infor__top")}>
                    <Typography>Code: {cartItem.id}</Typography>
                    <IconButton
                      onClick={(e) => handleDeleteCartItem(cartItem.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
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
                    {formatPrice(cartItem.price)} VND
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
                  Go to checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Dialog
        open={openDialog}
        keepMounted
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
  );
}

export default CartPage;
