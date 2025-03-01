import { useEffect, useState } from "react";

import classNames from "classnames/bind";

import MainImage from "./MainImage";
import ImageThumbnail from "./ImageThumbnail";
import styles from "./AccessoryGallery.module.scss";
import * as accessoryService from "../../../../services/AccessoryService";

const cx = classNames.bind(styles);

const AccessoryGallery = ({ accessoryId }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchAccessoryImages = async () => {
    try {
      const response = await accessoryService.getAccessoryImagesByAccessoryId(
        accessoryId
      );
      if (response.statusCode !== 200) {
        setImages([]);
      } else {
        setImages(response.data);
        setSelectedImage(response.data[0].colorImage);
      }
    } catch (error) {
      setImages([]);
    }
  };

  useEffect(() => {
    fetchAccessoryImages();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={cx("gallery")}>
      <div className={cx("gallery__main-image")}>
        <MainImage
          src={`https://localhost:7005/api/Images/Accessory/${selectedImage}`}
        />
      </div>
      <div className={cx("gallery__thumbnails")}>
        {images.map((img, index) => (
          <ImageThumbnail
            key={index}
            src={`https://localhost:7005/api/Images/Accessory/${img.colorImage}`}
            onClick={() => setSelectedImage(img.colorImage)}
            isActive={img.colorImage === selectedImage}
          />
        ))}
      </div>
    </div>
  );
};

export default AccessoryGallery;
