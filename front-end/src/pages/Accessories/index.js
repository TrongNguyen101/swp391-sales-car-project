import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button, Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./Accessories.module.scss";
import Sidebar from "../../components/Sidebar";
import * as accessoryService from "../../services/AccessoryService";

const cx = classNames.bind(styles);

function AccessoriesPage() {
  const navigate = useNavigate();
  const [accessories, setAccessories] = useState([]);

  const handleClickCard = (accessoryId) => () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/accessories/${accessoryId}`);
  };

  const fetchAccessories = async () => {
    try {
      const response = await accessoryService.getAllAccessories();
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
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("container__category")}>
        <Sidebar />
        <div className={cx("banner-container")}>
          <img src="img_banner.jpg" alt="banner" />
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("page-title")}>
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Product Vinfast's Accessories
          </Typography>
        </div>
        <div className={cx("list-accessories")}>
          {accessories.map((accessory, index) => (
            <div
              className={cx("accessory-card")}
              key={index}
              onClick={handleClickCard(accessory.id)}
            >
              <div className={cx("card-image")}>
                <img
                  src={`https://localhost:7005/api/Images/Car/${accessory.image}`}
                  alt={accessory.name}
                />
              </div>
              <div className={cx("card-title")}>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  {accessory.name}
                </Typography>
              </div>
              <div className={cx("card-info")}>
                <div className={cx("price")}>
                  <Typography>Price: {accessory.price} vnd</Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccessoriesPage;
