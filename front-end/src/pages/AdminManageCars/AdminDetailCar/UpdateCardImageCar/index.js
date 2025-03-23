import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";

import classNames from "classnames/bind";

import styles from "./UpdateCardCar.module.scss";
import ImageUploadComponent from "../../../../components/AddImage";
import * as adminCarServices from "../../../../services/AdminCarServices";

import { useState } from "react";

const cx = classNames.bind(styles);

function UpdateCardCarComponent({
  car,
  setMessage = () => {},
  setInforDialogOpen = () => {},
  fetchCarDetails = () => {},
}) {
  const [cardImage, setCardImages] = useState([]);

  // state of the dialog to show the user
  const [
    openDialogAtUpdateCardCarComponent,
    setOpenDialogAtUpdateCardCarComponent,
  ] = useState(false);
  const [
    messageAtUpdateCardImageCarComponent,
    setMessageAtUpdateCardImageCarComponent,
  ] = useState("");

  // This function call back to ImageUploadComponent to get file image
  const handleUploadCard = (files) => setCardImages(files);

  // handle the save of the image
  const handleSaveCardImage = async () => {
    if (car.image) {
      setMessage("The card image already exists. Please delete it first.");
      setInforDialogOpen(true);
      return;
    } else {
      if (!cardImage.length || !cardImage[0].file) {
        setMessage("Please select an image to upload");
        setInforDialogOpen(true);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("cardImage", cardImage[0].file);

        const response = await adminCarServices.uploadImageOfCar(
          car.id,
          formData
        );

        if (response.statusCode !== 200) {
          setMessage("Failed to upload image");
          setInforDialogOpen(true);
        } else {
          setMessage("Image uploaded successfully");
          setCardImages([]);
          fetchCarDetails();
          setInforDialogOpen(true);
        }
      } catch (error) {
        setMessage(error);
        setInforDialogOpen(true);
      }
    }
  };

  const handleOpenConfirmDeleteCardImageDialog = () => {
    if (!car.image) {
      setMessage("No image to delete.");
      setInforDialogOpen(true);
      return;
    }
    setMessageAtUpdateCardImageCarComponent(
      "Are you sure you want to delete the card image?"
    );
    setOpenDialogAtUpdateCardCarComponent(true);
  };

  const handleDeleteCardImageOfCar = async () => {
    try {
      const typeOfImage = "cardImage";
      const response = await adminCarServices.deleteImageOfCar(
        car.id,
        typeOfImage
      );
      if (response.statusCode !== 200) {
        setOpenDialogAtUpdateCardCarComponent(false);
        setMessage("The attempt to delete the image failed.");
        setInforDialogOpen(true);
      } else {
        fetchCarDetails();
        setMessage("The card image was deleted successfully.");
        setOpenDialogAtUpdateCardCarComponent(false);
        setInforDialogOpen(true);
      }
    } catch (error) {
      setMessage(error);
      setInforDialogOpen(true);
    }
  };

  const handleCloseConfirmDeleteCardImageDialog = () => {
    setOpenDialogAtUpdateCardCarComponent(false);
  };

  // format the price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <Box>
      {/* The content of update card image component */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          padding: "40px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* review Card image area */}
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
        {/* Detail information of car area */}
        <Box sx={{ padding: "5px 20px", width: "600px" }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography sx={{ fontSize: "36px", fontWeight: 900 }}>
              {car.model}
            </Typography>

            {car.isShowed ? (
              <Typography
                sx={{ fontSize: "36px", fontWeight: 900, color: "green" }}
              >
                Public
              </Typography>
            ) : (
              <Typography
                sx={{ fontSize: "36px", fontWeight: 900, color: "red" }}
              >
                Hiden
              </Typography>
            )}
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              Price Battery Rental:
            </Typography>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              {formatPrice(car.priceBatteryRental)}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              Price Battery Own:
            </Typography>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              {formatPrice(car.priceBatteryOwn)}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              Price Deposit:
            </Typography>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              {formatPrice(car.priceDeposite)}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              Quantity:
            </Typography>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              {car.quantity}
            </Typography>
          </Box>

          {/* Action delete and update image */}
          <Box
            sx={{ display: "flex", justifyContent: "left", marginTop: "20px" }}
          >
            <Button variant="contained" onClick={handleSaveCardImage}>
              {car.image ? "Update Card Image" : "Add Card Image"}
            </Button>
            <Button
              onClick={handleOpenConfirmDeleteCardImageDialog}
              variant="outlined"
              color="error"
              sx={{ marginLeft: "10px" }}
            >
              Delete Card Image
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Show comfirm delete card image dialog */}
      <Dialog
        open={openDialogAtUpdateCardCarComponent}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "540px" } }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: "500",
            lineHeight: "1.5",
            padding: "20px",
          }}
        >
          {messageAtUpdateCardImageCarComponent}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button
            variant="outlined"
            onClick={handleCloseConfirmDeleteCardImageDialog}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteCardImageOfCar}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UpdateCardCarComponent;
