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
      setMessage("Please login to view your cart");
      setOpenDialog(true);
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
    fetchCartItems();
    // eslint-disable-next-line
  }, []);



  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    fetchCartItems();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const saveCartItems = useCallback(async () => {
    if (!token || cartItems.length === 0) return;
    try {
      await cartService.updateCartItems(token, cartItems);
      console.log("Cart saved to server!");
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems, token]);

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

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      await saveCartItems();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      saveCartItems();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [saveCartItems]);

  useEffect(() => {
    return () => {
      saveCartItems();
    };
  }, [location.pathname, saveCartItems]);

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
    navigate("/login");
    setOpenDialog(false);
  };


  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className={cx("wrapper")}>
      {cartItems.length === 0 ? (
        <div className={cx("container")}>
          <div className={cx("container__left")}>
            <div className={cx("content__top")}>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "32px",
                }}
              >
                Your Cart is empty
              </Typography>
            </div>
          </div>
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
        </div>)}
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
