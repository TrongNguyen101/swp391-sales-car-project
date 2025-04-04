import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./CarDetail.module.scss";
import * as carService from "../../services/CarService";
import Slider from "react-slick";
import { Button, Typography } from "@mui/material";
import * as DecodePayload from "../../lib/DecodePayload";
import { useUserData } from "../../App";

const cx = classNames.bind(styles);

function CarDetailPage() {
  const token = localStorage.getItem("Bearer");
  const isLoggedIn = Boolean(token);
  const { carId } = useParams();
  const { userData } = useUserData();
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const [user, setUser] = useState({});
  const [selectedColor, setSelectedColor] = useState(0);
  const [colors, setColors] = useState([]);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchCarColors = async (Id) => {
    try {
      const response = await carService.getCarColorById(Id);
      if (response.statusCode !== 200) {
        setColors([]);
      } else {
        setColors(JSON.parse(response.data));
      }
    } catch (error) {
      setColors([]);
    }
  };

  const fetchCarDetails = async (Id) => {
    try {
      const response = await carService.userGetCarById(Id);
      if (response.statusCode !== 200) {
        navigate("/cars");
        return;
      } else {
        setCar(JSON.parse(response.data));
      }
    } catch (error) {
      navigate("/cars");
      return;
    }
  };

  useEffect(() => {
    toTop();
    fetchCarColors(carId);
    fetchCarDetails(carId);
    const token = localStorage.getItem("Bearer");
    const decoded = DecodePayload.decodePayload(token);
    if (decoded) {
      setUser(decoded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedColor,
  };

  const settings1Image = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedColor,
  };

  const handleColorChange = (index) => {
    setSelectedColor(index);
  };

  const handleClickDepositButton = () => {
    const token = localStorage.getItem("Bearer");
    if (!token) {
      navigate("/login");
    } else {
      const productId = carId;
      localStorage.setItem("productId", productId);
      navigate(`/deposit/${carId}`);
    }
  };

  const depositButton = () => {
    if (!isLoggedIn || userData.roleId === 2) {
      return (
        <Button
          variant="contained"
          onClick={handleClickDepositButton}
          disabled={!user || user.role !== 1 ? false : true}
        >
          <Typography sx={{ textTransform: "none" }}>
            Deposit {car.PriceDeposite} VND
          </Typography>
        </Button>
      );
    } else {
      return null; // Return null if the condition is not met
    }
  };

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
          <div className={cx("deposit-btn")}>{depositButton()}</div>
        </div>
        <div className={cx("color-block")}>
          <div className={cx("car-color-block")}>
            {colors.length !== 1 ? (
              <Slider {...settings} key={selectedColor}>
                {colors.map((color, index) => (
                  <div className={cx("car-color-item")} key={index}>
                    <img
                      src={`https://localhost:7005/api/Images/ColorDetail/${color.ColorImage}`}
                      alt={color.ColorName}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings1Image} key={selectedColor}>
                <div className={cx("car-color-item")} key={0}>
                  <img
                    src={`https://localhost:7005/api/Images/ColorDetail/${colors[0].ColorImage}`}
                    alt={colors[0].ColorName}
                  />
                </div>
              </Slider>
            )}
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
                  src={`https://localhost:7005/api/Images/Color/${color.ColorImage}`}
                  alt={color.ColorName}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={cx("car-specs")}>
          <img
            src={`https://localhost:7005/api/Images/Spec/${car.SpecImage}`}
            alt={car.SpecImage}
          />
        </div>
      </div>
    </div>
  );
}

export default CarDetailPage;
