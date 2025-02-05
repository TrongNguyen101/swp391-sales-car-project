import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CarDetail.module.scss";
import * as carService from "../../services/CarService";

const cx = classNames.bind(styles);

function CarDetailPage() {
  const { carId } = useParams();
  const [car, setCar] = useState({});

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchCarDetails = async (Id) => {
    try {
      const response = await carService.getCarById(Id);
      if (response.statusCode !== 200) {
        setCar({});
      } else {
        setCar(JSON.parse(response.data));
      }
    } catch (error) {
      setCar({});
    }
  };

  useEffect(() => {
    toTop();
    fetchCarDetails(carId);
  }, [carId]);

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("car-color-block")}>
          <div className={cx("color-image-result")}>
            <img
              src={`https://localhost:7005/api/Images/Car/${car.Image}`}
              alt={car.Name}
            />
          </div>
          <div className={cx("car-color")}>
            <div className={cx("car-color-item")}>
              <img src="../vinfast-vf3-white.png" alt="demo" />
            </div>
            <div className={cx("car-color-item")}>
              <img src="../vinfast-vf3-red.png" alt="demo" />
            </div>
            <div className={cx("car-color-item")}>
              <img src="../vinfast-vf3-grey.png" alt="demo" />
            </div>
          </div>
        </div>
        <div className={cx("car-detail")}>
          <div className={cx("car-image")}>
            <img
              src={`https://localhost:7005/api/Images/Car/${car.Image}`}
              alt={car.Name}
            />
          </div>
          <div className={cx("car-info")}>
            <Typography variant="h4">{car.Name}</Typography>
            <Typography variant="body1">{car.Seat}</Typography>
            <Typography variant="h6">Price: {car.Price}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailPage;
