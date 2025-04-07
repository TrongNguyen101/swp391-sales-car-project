import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";

import classNames from "classnames/bind";

import styles from "./UpdateCardImageOfAccessory.module.scss";
import ImageUploadComponent from "../../../../components/AddImage";
import * as adminAccessoryServices from "../../../../services/AdminAccessoryServices";

import { useState } from "react";

const cx = classNames.bind(styles);

function UpdateCardImageOfAccessoryComponent({
  accessory,
  setMessage = () => { },
  setInforDialogOpen = () => { },
  fetchAccessoryDetails = () => { },
}) {
  const [cardImage, setCardImages] = useState([]);

  // state of the dialog to show the user
  const [
    openDialogAtUpdateCardAccessoryComponent,
    setOpenDialogAtUpdateCardAccessoryComponent,
  ] = useState(false);
  const [
    messageAtUpdateCardImageAccessoryComponent,
    setMessageAtUpdateCardImageAccessoryComponent,
  ] = useState("");

  // This function call back to ImageUploadComponent to get file image
  const handleUploadCard = (files) => setCardImages(files);

  // handle the save of the image
  const handleSaveCardImage = async () => {
    if (accessory.image) {
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

        const response = await adminAccessoryServices.adminUploadImageOfAccessory(
          accessory.id,
          formData
        );

        if (response.statusCode !== 200) {
          setMessage("Failed to upload image");
          setInforDialogOpen(true);
        } else {
          setMessage("Image uploaded successfully");
          setCardImages([]);
          fetchAccessoryDetails();
          setInforDialogOpen(true);
        }
      } catch (error) {
        setMessage("Failed to upload image");
        setInforDialogOpen(true);
      }
    }
  };

  const handleOpenConfirmDeleteCardImageDialog = () => {
    if (!accessory.image) {
      setMessage("No image to delete.");
      setInforDialogOpen(true);
      return;
    }
    setMessageAtUpdateCardImageAccessoryComponent(
      "Are you sure you want to delete the card image?"
    );
    setOpenDialogAtUpdateCardAccessoryComponent(true);
  };

  const handleDeleteCardImageOfAccessory = async () => {
    try {
      const typeOfImage = "cardImage";
      const response = await adminAccessoryServices.adminDeleteImageOfAccessory(
        accessory.id,
        typeOfImage
      );
      if (response.statusCode !== 200) {
        setOpenDialogAtUpdateCardAccessoryComponent(false);
        setMessage(response.message);
        setInforDialogOpen(true);
      } else {
        fetchAccessoryDetails();
        setMessage("The card image was deleted successfully.");
        setOpenDialogAtUpdateCardAccessoryComponent(false);
        setInforDialogOpen(true);
      }
    } catch (error) {
      setMessage("Internal server error. Please try again later.");
      setInforDialogOpen(true);
    }
  };

  const handleCloseConfirmDeleteCardImageDialog = () => {
    setOpenDialogAtUpdateCardAccessoryComponent(false);
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
              {accessory.image ? (
                <img
                  src={`https://localhost:7005/api/Images/Accessory/${accessory.image}`}
                  alt={accessory.model}
                />
              ) : (
                <ImageUploadComponent
                  title="Drag & drop an image here, or click to select card image of accessory"
                  allowedTypes={["image/jpeg", "image/png"]}
                  maxSize={10 * 1024 * 1024} // 10MB
                  onUpload={handleUploadCard}
                  multiple={false}
                  previewWidthSize="253px"
                  previewHeightSize="240px"
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
                {accessory.name}
              </Typography>
            </div>
            <div className={cx("card-info")}>
              <div className={cx("price")}>
                <Typography>
                  Price: {formatPrice(accessory.price)} vnd
                </Typography>
              </div>
            </div>
          </div>
        </Box>
        {/* Detail information of accessory area */}
        <Box sx={{ padding: "5px 20px", width: "600px" }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography sx={{ fontSize: "36px", fontWeight: 900 }}>
              {accessory.name}
            </Typography>

            {accessory.isShowed ? (
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
              Price:
            </Typography>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              {formatPrice(accessory.price)}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              Material:
            </Typography>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              {accessory.material}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              Origin:
            </Typography>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              {accessory.origin}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              Quantity:
            </Typography>
            <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
              {accessory.quantity}
            </Typography>
          </Box>

          {/* Action delete and update image */}
          <Box
            sx={{ display: "flex", justifyContent: "left", marginTop: "20px" }}
          >
            <Button variant="contained" onClick={handleSaveCardImage}>
              {accessory.image ? "Update Card Image" : "Add Card Image"}
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
        open={openDialogAtUpdateCardAccessoryComponent}
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
          {messageAtUpdateCardImageAccessoryComponent}
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
            onClick={handleDeleteCardImageOfAccessory}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UpdateCardImageOfAccessoryComponent;
