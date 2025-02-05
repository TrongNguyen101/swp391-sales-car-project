import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./CarDetail.module.scss";
import * as carService from "../../services/CarService";
import Slider from "react-slick";
import { Button, Typography } from "@mui/material";

const cx = classNames.bind(styles);

function CarDetailPage() {
  const { carId } = useParams();
  const [car, setCar] = useState({});
  const [selectedColor, setSelectedColor] = useState(0);

  const colors = [
    {
      id: 1,
      name: car.ColorImage1,
      image: car.ColorImage1,
    },
    {
      id: 2,
      name: car.ColorImage2,
      image: car.ColorImage2,
    },
    {
      id: 3,
      name: car.ColorImage3,
      image: car.ColorImage3,
    },
  ];

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedColor,
  };

  const handleColorChange = (index) => {
    setSelectedColor(index);
  };

  console.log(car);
  return (
    <div className={cx("container")}>
      <div className={cx("car-banner")}>
        <img
          src={`https://localhost:7005/api/Images/Banner/${car.ImageBanner}`}
          alt={car.Name}
        />
      </div>
      <div className={cx("content")}>
        <div className={cx("car-info")}>
          <div className={cx("price-title")}>
            <Typography
              variant="h3"
              sx={{
                color: "#3c3c3c",
                fontSize: "48px",
                fontWeight: "600",
                letterSpacing: "-.96px",
                lineHeight: "60px",
              }}
            >
              Price options of {car.Name}
            </Typography>
          </div>
          <div className={cx("price-info")}>
            <div className={cx("battery-price")}>
              <div className={cx("price-title")}>
                <Typography
                  variant="h5"
                  sx={{
                    fontStyle: "italic",
                    fontWeight: "1000",
                    color: "#3c3c3c",
                    fontSize: "24px",
                    lineHeight: "30px",
                  }}
                >
                  Price battery rental
                </Typography>
              </div>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "28px",
                  fontWeight: "400",
                  lineHeight: "normal",
                  color: "#3c3c3c",
                }}
              >
                {car.PriceBatteryRental}{" "}
                <Typography
                  variant="span"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "normal",
                    color: "#3c3c3c",
                  }}
                >
                  VND
                </Typography>
              </Typography>
            </div>
            <div className={cx("battery-price")}>
              <div className={cx("price-title")}>
                <Typography
                  variant="h5"
                  sx={{
                    fontStyle: "italic",
                    fontWeight: "1000",
                    color: "#3c3c3c",
                    fontSize: "24px",
                    lineHeight: "30px",
                  }}
                >
                  Price battery own
                </Typography>
              </div>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "28px",
                  fontWeight: "400",
                  lineHeight: "normal",
                  color: "#3c3c3c",
                }}
              >
                {car.PriceBatteryOwn}{" "}
                <Typography
                  variant="span"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "normal",
                    color: "#3c3c3c",
                  }}
                >
                  VND
                </Typography>
              </Typography>
            </div>
          </div>
          <div className={cx("deposit-btn")}>
            <Button variant="contained">
              <Typography sx={{ textTransform: "none" }}>
                Deposit {car.PriceDeposite} VND
              </Typography>
            </Button>
          </div>
        </div>
        <div className={cx("color-block")}>
          <div className={cx("car-color-block")}>
            <Slider {...settings} key={selectedColor}>
              {colors.map((color, index) => (
                <div className={cx("car-color-item")} key={index}>
                  <img
                    src={`https://localhost:7005/api/Images/ColorDetail/${color.image}`}
                    alt={color.name}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className={cx("car-color")}>
            {colors.map((color, index) => (
              <div
                key={index}
                className={cx("car-color-button", {
                  active: selectedColor === index,
                })}
                onClick={() => handleColorChange(index)}
              >
                <img
                  src={`https://localhost:7005/api/Images/Color/${color.image}`}
                  alt={color.name}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={cx("car-specs")}>
            <img src={`https://localhost:7005/api/Images/Spec/${car.SpecImage}`} alt={car.SpecImage} />
        </div>
      </div>
    </div>
  );
}

export default CarDetailPage;
