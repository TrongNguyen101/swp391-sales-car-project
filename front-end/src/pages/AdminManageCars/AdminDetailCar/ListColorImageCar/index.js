import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import Slider from "react-slick";

import styles from "./ListColorImageCar.module.scss";
import * as adminCarService from "../../../../services/AdminCarServices";

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
    selectedIdImageColor(colors[index].colorId);
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
      const response = await adminCarService.getCarColorById(carId);
      if (response.statusCode !== 200) {
        setColors([]);
      } else {
        console.log("image car color:", response.data);
        setColors(response.data);
        selectedIdImageColor(response.data[0].colorId);
      }
    } catch (error) {
      setColors([]);
    }
  };

  useEffect(() => {
    fetchCarColors(carId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    src={`https://localhost:7005/api/Images/ColorDetail/${color.colorImage}`}
                    alt={color.ColorName}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings1Image} key={selectedColor}>
              <div className={cx("car-color-item")} key={0}>
                <img
                  src={`https://localhost:7005/api/Images/ColorDetail/${colors[0].colorImage}`}
                  alt={colors[0].colorName}
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
                src={`https://localhost:7005/api/Images/Color/${color.colorImage}`}
                alt={color.colorName}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListColorImageCarComponent;
