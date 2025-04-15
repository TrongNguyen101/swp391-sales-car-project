import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import * as accessoryService from "../../services/AccessoryService";
import * as cartService from "../../services/CartService";
import { useUserData } from "../../App";

import styles from "./AccessoryDetail.module.scss";
import AccessoryGalleryComponent from "./components/AccessoryGallery";

const cx = classNames.bind(styles);

function AccessoryDetailPage() {
  const { userData } = useUserData();
  const { accessoryId } = useParams();
  const [accessory, setAccessories] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("Bearer");
  const isLoggedIn = Boolean(token);

  const navigate = useNavigate();

  // Handle click breadcrumb
  const handleClickHomeBreadcrumb = () => {
    navigate("/");
  };

  const handleClickAccessoryBreadcrumb = () => {
    navigate("/accessories");
  };

  // Fetch accessory by id
  const fetchAccessoryDetail = async () => {
    try {
      const response = await accessoryService.userGetAccessoryById(accessoryId);
      if (response.statusCode === 200) {
        setAccessories(response.data);
        console.log(response.data);
      } else {
        navigate("/accessories");
        return;
      }
    } catch (error) {
      navigate("/accessories");
      return;
    }
  };
  useEffect(() => {
    // eslint-disable-next-line
  }, [accessoryId]);

  useEffect(() => {
    fetchAccessoryDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, accessoryId]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      console.log("User id:", userData.userId);
      const response = await cartService.postAddProductToCart(
        token,
        accessory.id,
        accessory.name,
        accessory.price,
        accessory.image,
        userData.userId
      );
      if (response.statusCode === 200) {
        setMessage("Added to cart successfully!");
        setOpenDialog(true);
      } else {
        setMessage(response.message);
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add to cart!");
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const cartButton = () => {
    if (!isLoggedIn || userData.roleId === 2) {
      return (
        <Button
          variant="text"
          sx={{
            color: "gray",
            width: "0px",
            height: "40px",
            padding: "0px",
            "&:hover": {
              color: "var(--primary-color)",
            },
          }}
          onClick={() => navigate("/cart")}
        >
          <span className={cx("container__accessories--cart")}>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
        </Button>
      );
    } else {
      return null; // Return null if the condition is not met
    }
  };

  const addToCartButton = () => {
    if (!isLoggedIn || userData.roleId === 2) {
      return (
        <Button
          variant="contained"
          sx={{ with: "500px" }}
          onClick={handleAddToCart}
        >
          Add to Cart
          <span className={cx("icon")}>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
        </Button>
      );
    } else {
      return null; // Return null if the condition is not met
    }
  };

  // format the price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper__line")}></div>
      <div className={cx("wrapper__container")}>
        <div className={cx("wrapper__navigation")}>
          <div className={cx("container__navigation")}>
            <div className={cx("container__breadcrumb")}>
              <div className={cx("container__breadcrumb--navigation")}>
                <Typography
                  onClick={handleClickHomeBreadcrumb}
                  sx={{
                    paddingRight: "0.5em",
                    ":hover": { color: "var(--primary-color)" },
                    fontWeight: "500",
                  }}
                >
                  Home
                </Typography>
                <Typography sx={{ paddingRight: "0.5em" }}>/</Typography>
                <Typography
                  onClick={handleClickAccessoryBreadcrumb}
                  sx={{
                    ":hover": { color: "var(--primary-color)" },
                    fontWeight: "500",
                  }}
                >
                  Accessories
                </Typography>
              </div>
              <Typography
                sx={{
                  fontWeight: "500",
                }}
              >
                / {accessory.name}
              </Typography>
            </div>
            {cartButton()}
          </div>
        </div>
        <div className={cx("container")}>
          <section className={cx("container__accessory-overview")}>
            <div className={cx("container__accessory-image")}>
              <AccessoryGalleryComponent accessoryId={accessoryId} />
            </div>
            <div className={cx("container__accessory-info")}>
              <Typography className={cx("information__name")}>
                {accessory.name}
              </Typography>
              <Typography className={cx("information__price")}>
                {formatPrice(accessory.price)} VND
              </Typography>
              <div className={cx("information__description")}>
                <Typography className={cx("information__description-title")}>
                  Quantity: {accessory.quantity}
                </Typography>
              </div>
              <div className={cx("information__description")}>
                <Typography className={cx("information__description-title")}>
                  Description
                </Typography>
                <Typography>{accessory.description}</Typography>
              </div>
              <div className={cx("information__button")}>
                <div className={cx("button__add-to-cart")}>
                  {addToCartButton()}
                </div>
              </div>
            </div>
          </section>
          <section className={cx("container__specification")}>
            <Typography className={cx("information__specification-title")}>
              Specification
            </Typography>
            <div className={cx("container__specification--list")}>
              <div className={cx("specification__item")}>
                <Typography sx={{ fontWeight: "500" }}>Dimensions:</Typography>
                <div className={cx("specification__value")}>
                  {accessory.dimensions}
                </div>
              </div>
              <div className={cx("specification__item")}>
                <Typography sx={{ fontWeight: "500" }}>Material:</Typography>
                <div className={cx("specification__value")}>
                  {accessory.material}
                </div>
              </div>
              <div className={cx("specification__item")}>
                <Typography sx={{ fontWeight: "500" }}>Origin:</Typography>
                <div className={cx("specification__value")}>
                  {accessory.origin}
                </div>
              </div>
              <div className={cx("specification__item")}>
                <Typography sx={{ fontWeight: "500" }}>Warranty:</Typography>
                <div className={cx("specification__value")}>
                  {accessory.warranty}
                </div>
              </div>
              <div className={cx("specification__item")}>
                <Typography sx={{ fontWeight: "500" }}>Weight:</Typography>
                <div className={cx("specification__value")}>
                  {accessory.weight}
                </div>
              </div>
              <div className={cx("specification__item")}>
                <Typography sx={{ fontWeight: "500" }}>Color:</Typography>
                <div className={cx("specification__value")}>
                  {accessory.color}
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Show adding accessory to cart successfully dialog */}
        <Dialog
          open={openDialog}
          keepMounted
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          sx={{ "& .MuiDialog-paper": { width: "540px" } }}
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
          <DialogActions sx={{ justifyContent: "center", padding: "20px" }}>
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
      <div className={cx("wrapper__line")}></div>
    </div>
  );
}

export default AccessoryDetailPage;
