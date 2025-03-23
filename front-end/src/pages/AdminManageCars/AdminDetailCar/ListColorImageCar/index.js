import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import Slider from "react-slick";

import styles from "./ListColorImageCar.module.scss";
import * as carService from "../../../../services/CarService";

const cx = classNames.bind(styles);

function ListColorImageCarComponent({
  carId,
  selectedIdImageColor = () => {},
  requestFecthColorOfCar,
}) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [colors, setColors] = useState([]);

  const handleColorChange = (index) => {
    setSelectedColor(index);
    selectedIdImageColor(colors[index].Id);
  };

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

  const fetchCarColors = async (carId) => {
    try {
      const response = await carService.getCarColorById(carId);
      if (response.statusCode !== 200) {
        setColors([]);
      } else {
        setColors(JSON.parse(response.data));
        selectedIdImageColor(JSON.parse(response.data)[0].Id);
      }
    } catch (error) {
      setColors([]);
    }
  };

  useEffect(() => {
    fetchCarColors(carId);
  }, [carId, requestFecthColorOfCar]);

  return (
    <>
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
    </>
  );
}

export default ListColorImageCarComponent;
