import { Button, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Cars.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as carService from "../../services/CarService";

const cx = classNames.bind(styles);

function CarsPage() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await carService.getCar();
      if (response.statusCode !== 200) {
        setCars([]);
      } else {
        setCars(JSON.parse(response.data));
        console.log(JSON.parse(response.data));
      }
    } catch (error) {
      setCars([]);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleClickCard = (carId) => () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/cars/${carId}`);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("banner-container")}>
        <img src="car-page-bannel.png" alt="banner" />
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
            Product Vinfast's Cars
          </Typography>
        </div>
        <div className={cx("list-cars")}>
          {cars
            .filter((car) => car.IsShowed)
            .map((car, index) => (
              <div
                className={cx("car-card")}
                key={index}
                onClick={() => handleClickCard(car.Id)}
              >
                <div className={cx("card-image")}>
                  <img
                    src={`https://localhost:7005/api/Images/Car/${car.Image}`}
                    alt={car.Name}
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
                    {car.Name}
                  </Typography>
                </div>
                <div className={cx("card-info")}>
                  <div className={cx("price")}>
                    <Typography>Price: {car.Price} vnd</Typography>
                  </div>
                  <div className={cx("seat")}>
                    <Typography>Seats: {car.Seat}</Typography>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={cx("block-subcribe")}>
        <div className={cx("block-subcribe-container")}>
          <div className={cx("block-subcribe-content")}>
            <div className={cx("block-subcribe-title")}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontStyle: "normal",
                  fontWeight: "500",
                  textAlign: "center",
                  lineHeight: "1.5",
                  color: "#fff",
                }}
              >
                Subcribe To Our Newsletter
              </Typography>
            </div>
            <div className={cx("block-subcribe-des")}>
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: "300",
                  lineHeight: "150%",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Sign up to receive information about VinFast promotions and
                services.
              </Typography>
            </div>
            <div className={cx("block-subcribe-input")}>
              <input
                type="text"
                placeholder="Enter your email address"
                spellCheck={false}
              />
              <Button variant="contained" sx={{ height: "100%", width: "30%" }}>
                Subscribe
              </Button>
            </div>
            <div className={cx("block-subcribe-des-2")}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  fontWeight: "400",
                  lineHeight: "150%",
                  color: "#fff",
                }}
              >
                By registering, you confirm that you have read, understood and
                agreed to VinFast's{" "}
                <Link to={"/"}>
                  <Typography
                    component={"span"}
                    sx={{
                      textAlign: "center",
                      fontSize: "0.75rem",
                      fontWeight: "400",
                      lineHeight: "150%",
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    Privacy Policy.
                  </Typography>
                </Link>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarsPage;
