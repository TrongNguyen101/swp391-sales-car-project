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
import * as DecodePayload from "../../lib/DecodePayload";
import styles from "./AccessoryDetail.module.scss";
import AccessoryGalleryComponent from "./components/AccessoryGallery";

const cx = classNames.bind(styles);

function AccessoryDetailPage() {
  const { accessoryId } = useParams();
  const [accessory, setAccessories] = useState(null);
  const [userId, setUserId] = useState(null);
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
  const fetchAccessories = async () => {
    try {
      const response = await accessoryService.getAccessoryById(accessoryId);
      if (response.statusCode === 200) {
        setAccessories(response.data);
      } else {
        setOpenDialog(true);
        setMessage("The accessory is not available!");
      }
    } catch (error) {
      setOpenDialog(true);
    }
  };
  useEffect(() => {
    fetchAccessories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decoded = DecodePayload.decodePayload(token);
        setUserId(decoded.sub);
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/login");
      }
    }
  }, [token, navigate]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      const data = await cartService.postAddProductToCart(
        token,
        accessory.id,
        accessory.name,
        accessory.price,
        accessory.image,
        userId
      );
      if (data.statusCode === 200) {
        setMessage("Added to cart successfully!");
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper__line")}></div>
      {!accessory ? (
        <div className={cx("wrapper__container")}>
          {/* Show add to cart successfully dialog */}
          <Typography>Product not found</Typography>
        </div>
      ) : (
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
            </div>
          </div>
          <div className={cx("container")}>
            <section className={cx("container__accessory-overview")}>
              <div className={cx("container__accessory-image")}>
                <AccessoryGalleryComponent
                  accessoryId={accessoryId}
                  accessoryImage={accessory.image}
                />
              </div>
              <div className={cx("container__accessory-info")}>
                <Typography className={cx("information__name")}>
                  {accessory.name}
                </Typography>
                <Typography className={cx("information__price")}>
                  {accessory.price}
                </Typography>
                <div className={cx("information__description")}>
                  <Typography className={cx("information__description-title")}>
                    Description
                  </Typography>
                  <Typography>{accessory.description}</Typography>
                </div>
                <div className={cx("information__button")}>
                  <div className={cx("button__add-to-cart")}>
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
                  </div>
                  <Button
                    variant="outlined"
                    sx={{
                      width: "160px",
                      "&:hover": {
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                      },
                    }}
                  >
                    <span className={cx("button_buy-now")}>Buy now</span>
                  </Button>
                </div>
              </div>
            </section>
            <section className={cx("container__specification")}>
              <Typography className={cx("information__specification-title")}>
                Specification
              </Typography>
              <div className={cx("container__specification--list")}>
                <div className={cx("specification__item")}>
                  <Typography sx={{ fontWeight: "500" }}>
                    Dimensions:
                  </Typography>
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
      )}
      <div className={cx("wrapper__line")}></div>
    </div>
  );
}

export default AccessoryDetailPage;
