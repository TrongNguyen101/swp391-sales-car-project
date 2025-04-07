import { useEffect, useState } from "react";

import classNames from "classnames/bind";

import MainImage from "./MainImage";
import ImageThumbnail from "./ImageThumbnail";
import styles from "./AccessoryGallery.module.scss";
import * as accessoryService from "../../../../services/AccessoryService";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const AccessoryGalleryComponent = ({
  handleDeleteDetailImage = () => {},
  requestFecthDetailImageList,
}) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const { accessoryId } = useParams();

  const fetchAccessoryImages = async () => {
    try {
      const response = await accessoryService.getAccessoryImagesByAccessoryId(
        accessoryId
      );
      if (response.statusCode !== 200) {
        setImages([]);
        setSelectedImage(null);
      } else {
        setImages(response.data);
        setSelectedImage(response.data[0].colorImage);
        handleDeleteDetailImage(response.data[0].id);
        setImages((prevImages) => [...response.data]);
        console.log(response.data);
      }
    } catch (error) {
      setImages([]);
    }
  };

  useEffect(() => {
    fetchAccessoryImages();
    // eslint-disable-next-line
  }, [requestFecthDetailImageList]);

  const handleSetImageForAction = (image) => {
    setSelectedImage(image.colorImage);
    handleDeleteDetailImage(image.id);
  };

  return (
    <div className={cx("gallery")}>
      <div className={cx("gallery__main-image")}>
        {selectedImage && (
          <MainImage
            src={`https://localhost:7005/api/Images/Accessory/${selectedImage}`}
          />
        )}
      </div>
      <div className={cx("gallery__thumbnails")}>
        {images.map((img, index) => (
          <ImageThumbnail
            key={index}
            src={`https://localhost:7005/api/Images/Accessory/${img.colorImage}`}
            onClick={() => handleSetImageForAction(img)}
            isActive={img.colorImage === selectedImage}
          />
        ))}
      </div>
    </div>
  );
};

export default AccessoryGalleryComponent;
