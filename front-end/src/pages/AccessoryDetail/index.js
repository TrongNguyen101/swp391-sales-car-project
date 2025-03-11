import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import * as accessoryService from "../../services/AccessoryService";
import * as DecodePayload from "../../lib/DecodePayload";

import styles from "./AccessoryDetail.module.scss";
import AccessoryGalleryComponent from "./components/AccessoryGallery";

const cx = classNames.bind(styles);

function AccessoryDetailPage() {
  const { accessoryId } = useParams();
  const [accessory, setAccessories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
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
      if (response.statusCode !== 200) {
        setAccessories([]);
      } else {
        setAccessories(response.data);
      }
    } catch (error) {
      setAccessories([]);
    }
  };

  useEffect(() => {
    fetchAccessories();
    const token = localStorage.getItem("Bearer");
    if (token) {
      setIsLoggedIn(true);
      const decoded = DecodePayload.decodePayload(token);
      setUserId(decoded.sub);
    }
    // eslint-disable-next-line
  }, []);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      // Add to cart
    } else {
      navigate("/login");
    }
  }

  return (
    <div className={cx("wrapper")}>
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
          <div>
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
            >
              <span className={cx("container__accessories--cart")}>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              <span className={cx("container__accessories--cart-number")}>
                <Typography sx={{ fontWeight: 900, fontSize: "24px" }}>
                  0
                </Typography>
              </span>
            </Button>
          </div>
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
              <Typography>
                If you’re in an emergency, you can easily press the Emergency
                SOS button to reach first responders and summon help in no time.
                If you’re in an emergency, you can easily press the Emergency
                SOS button to reach first responders and summon help in no time.
                If you’re in an emergency, you can easily press the Emergency
                SOS button to reach first responders and summon help in no time.
                If you’re in an emergency, you can easily press the Emergency
                SOS button to reach first responders and summon help in no time.
                {accessory.description}
              </Typography>
            </div>
            <div className={cx("information__button")}>
              <div className={cx("button__add-to-cart")}>
                <Button variant="contained" sx={{ with: "500px" }} onClick={handleAddToCart}>
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
      <div className={cx("wrapper__line-bottom")}></div>
    </div>
  );
}

export default AccessoryDetailPage;
