import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames/bind";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  TextField,
  Typography,
} from "@mui/material";

import * as adminCarServices from "../../../services/AdminCarServices";
import styles from "./AdminDetailCar.module.scss";
import ImageUploadComponent from "../../../components/AddImage";
import ListColorImageCarComponent from "./ListColorImageCar";
import UpdateImagesColorCar from "./UpdateImagesColorCar";

const cx = classNames.bind(styles);

function AdminDetailCarPage() {
  //state of the values of the form
  const [car, setCar] = useState({});
  const [cardImage, setCardImages] = useState([]);
  const [bannerImage, setBannerImages] = useState([]);
  // state of the message to show the user
  const [message, setMessage] = useState("");
  // state of the dialog to show the user
  const [inforDialogOpen, setInforDialogOpen] = useState(false);
  // get the carId from the url
  const { carId } = useParams();

  const [newColerImages, setNewColerImages] = useState([]);

  // fetch the car details by the carId
  const fetchCarDetails = async (Id) => {
    try {
      const response = await adminCarServices.getCarById(Id);
      if (response.statusCode !== 200) {
        setMessage("Failed to fetch car details");
        setInforDialogOpen(true);
      } else {
        setCar(response.data);
        console.log(response.data);
      }
    } catch (error) {
      setMessage("Failed to fetch car details");
      setInforDialogOpen(true);
    }
  };

  useEffect(() => {
    fetchCarDetails(carId);
  }, [carId]);

  // handle the upload of the card image
  const handleUploadCard = (files) => setCardImages(files);
  const handleUploadBanner = (files) => setBannerImages(files);

  // handle the save of the image
  const handleSaveCardImage = async () => {
    if (!cardImage.length || !cardImage[0].file) {
      setMessage("Please select an image to upload");
      setInforDialogOpen(true);
    } else {
      try {
        const formData = new FormData();
        formData.append("cardImage", cardImage[0].file);

        const response = await adminCarServices.uploadCardImageOfCar(
          carId,
          formData
        );

        if (response.statusCode !== 200) {
          setMessage("Failed to upload image");
          setInforDialogOpen(true);
        } else {
          setMessage("Image uploaded successfully");
          fetchCarDetails(carId);
          setInforDialogOpen(true);
        }
      } catch (error) {
        setMessage(error);
        setInforDialogOpen(true);
      }
    }
  };

  // handle the save of the image
  const handleSaveBannerImage = async () => {
    if (!cardImage.length || !cardImage[0].file) {
      setMessage("Please select an image to upload");
      setInforDialogOpen(true);
    } else {
      try {
        const formData = new FormData();
        formData.append("cardImage", cardImage[0].file);

        const response = await adminCarServices.uploadCardImageOfCar(
          carId,
          formData
        );

        if (response.statusCode !== 200) {
          setMessage("Failed to upload image");
          setInforDialogOpen(true);
        } else {
          setMessage("Image uploaded successfully");
          fetchCarDetails(carId);
          setInforDialogOpen(true);
        }
      } catch (error) {
        setMessage(error);
        setInforDialogOpen(true);
      }
    }
  };

  const fetchDeleteCarImage = async (Id) => {
    try {
      const response = await adminCarServices.getCarById(Id);
      if (response.statusCode !== 200) {
        setMessage("Failed to fetch car details");
        setInforDialogOpen(true);
      } else {
        setCar(response.data);
        console.log(response.data);
      }
    } catch (error) {
      setMessage("Failed to fetch car details");
      setInforDialogOpen(true);
    }
  };

  // const handleUploadColor = (files) => setNewColerImages(files);

  const handleUploadColor = (files) => {
    const formattedFiles = files.map((file) => ({
      file,
      url: URL.createObjectURL(file.file), // Tạo URL để hiển thị ảnh
    }));
    setNewColerImages(formattedFiles);
  };

  const handleCloseDialog = () => {
    setInforDialogOpen(false);
  };

  // format the price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <Box sx={{ padding: "20px", width: "100%", backgroundColor: "#f7f7f7" }}>
      <Typography
        sx={{
          width: "100%",
          fontWeight: 900,
          fontSize: "36px",
          boxShadow: "rgba(0, 0, 0, 0.08) 0px 0.625rem 1.25rem",
        }}
      >
        Detail page{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px",
        }}
      >
        <Box>
          <div className={cx("car-card")}>
            <div className={cx("card-image")}>
              {car.image ? (
                <img
                  src={`https://localhost:7005/api/Images/Car/${car.image}`}
                  alt={car.model}
                />
              ) : (
                <ImageUploadComponent
                  title="Drag & drop an image here, or click to select card image of car"
                  allowedTypes={["image/jpeg", "image/png"]}
                  maxSize={10 * 1024 * 1024} // 10MB
                  onUpload={handleUploadCard}
                  multiple={false}
                  previewWidthSize="354.5px"
                  previewHeightSize="220px"
                />
              )}
            </div>
            <div className={cx("card-title")}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                {car.model}
              </Typography>
            </div>
            <div className={cx("card-info")}>
              <div className={cx("price")}>
                <Typography>
                  Price: {formatPrice(car.priceBatteryRental)} vnd
                </Typography>
              </div>
              <div className={cx("seat")}>
                <Typography>Seats: {car.seat}</Typography>
              </div>
            </div>
          </div>
        </Box>
        <Box sx={{ padding: "5px 20px", width: "600px" }}>
          <Typography sx={{ fontSize: "36px", fontWeight: 900 }}>
            Model: {car.model}
          </Typography>
          <Typography>Seat: {car.seat}</Typography>
          <Typography>
            Price Battery Rental: {formatPrice(car.priceBatteryRental)}
          </Typography>
          <Typography>
            Price Battery Own: {formatPrice(car.priceBatteryOwn)}
          </Typography>
          <Typography>{car.priceDeposite}</Typography>
          <Typography>{car.quantity}</Typography>
          <Typography>{car.isShowed}</Typography>
          <Button variant="contained" onClick={handleSaveCardImage}>
            Save Image
          </Button>
          <Button variant="outlined" color="error" sx={{ marginLeft: "10px" }}>
            Delete Image
          </Button>
        </Box>
      </Box>
      <Dialog
        open={inforDialogOpen}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "440px", height: "140px" } }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: "500",
            lineHeight: "1.5",
          }}
        >
          {message}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Box>
        <UpdateImagesColorCar carId={carId} />
      </Box>
    </Box>
  );
}

export default AdminDetailCarPage;
