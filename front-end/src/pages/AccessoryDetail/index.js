import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import * as accessoryService from "../../services/AccessoryService";
import styles from "./AccessoryDetail.module.scss";
import AccessoryGalleryComponent from "./components/AccessoryGallery";

const cx = classNames.bind(styles);

function AccessryDetailPage() {
  const { accessoryId } = useParams();
  const [accessory, setAccessories] = useState([]);

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
    // eslint-disable-next-line
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper__line")}></div>
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
                <Button variant="contained" sx={{ with: "500px" }}>
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

export default AccessryDetailPage;
