import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";

import ImageUploadComponent from "../../../../components/AddImage";
import * as adminCarServices from "../../../../services/AdminCarServices";

import { useState } from "react";

function UpdateBannerImageCarComponent({
  car,
  setMessage = () => {},
  setInforDialogOpen = () => {},
  fetchCarDetails = () => {},
}) {
  const [bannerImage, setBannerImages] = useState([]);

  // state of the dialog to show the user
  const [
    openDialogAtUpdateBannerCarComponent,
    setOpenDialogAtUpdateBannerCarComponent,
  ] = useState(false);
  const [
    messageAtUpdateBannerImageCarComponent,
    setMessageAtUpdateBannerImageCarComponent,
  ] = useState("");

  // This function call back to ImageUploadComponent to get file image
  const handleUploadBanner = (files) => setBannerImages(files);

  // handle the save of the image
  const handleSaveBannerImage = async () => {
    if (car.bannerImage) {
      setMessage("The banner image already exists. Please delete it first.");
      setInforDialogOpen(true);
      return;
    } else {
      try {
        if (!bannerImage.length || !bannerImage[0].file) {
          setMessage("Please select an image to upload");
          setInforDialogOpen(true);
          return;
        }
        const formData = new FormData();
        formData.append("bannerImage", bannerImage[0].file);

        const response = await adminCarServices.uploadImageOfCar(
          car.id,
          formData
        );

        if (response.statusCode !== 200) {
          setMessage("Failed to upload image");
          setInforDialogOpen(true);
        } else {
          setMessage("Image uploaded successfully");
          setBannerImages([]);
          fetchCarDetails();
          setInforDialogOpen(true);
        }
      } catch (error) {
        setMessage("Failed to upload image");
        setInforDialogOpen(true);
      }
    }
  };

  const handleOpenConfirmDeleteBannerImageDialog = () => {
    if (!car.bannerImage) {
      setMessage("No image to delete.");
      setInforDialogOpen(true);
      return;
    }
    setMessageAtUpdateBannerImageCarComponent(
      "Are you sure you want to delete the banner image?"
    );
    setOpenDialogAtUpdateBannerCarComponent(true);
  };

  const handleDeleteBannerImageOfCar = async () => {
    try {
      const typeOfImage = "bannerImage";
      const response = await adminCarServices.deleteImageOfCar(
        car.id,
        typeOfImage
      );
      if (response.statusCode !== 200) {
        setOpenDialogAtUpdateBannerCarComponent(false);
        setMessage(response.message);
        setInforDialogOpen(true);
      } else {
        fetchCarDetails();
        setMessage("The banner image was deleted successfully.");
        setOpenDialogAtUpdateBannerCarComponent(false);
        setInforDialogOpen(true);
      }
    } catch (error) {
      setMessage("Failed to delete image");
      setInforDialogOpen(true);
    }
  };

  const handleCloseConfirmDeleteBannerImageDialog = () => {
    setOpenDialogAtUpdateBannerCarComponent(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "500",
          textAlign: "center",
          padding: "20px",
        }}
      >
        Banner Image
      </Typography>
      {/* image banner area */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          padding: "40px",
          width: "100%",
          height: "100%",
        }}
      >
        {/* review banner image area */}
        <Box sx={{ width: "100%", height: "100%" }}>
          {car.bannerImage ? (
            <img
              src={`https://localhost:7005/api/Images/Banner/${car.bannerImage}`}
              alt={car.model}
            />
          ) : (
            <ImageUploadComponent
              title="Drag & drop an image here, or click to select banner image of car"
              allowedTypes={["image/jpeg", "image/png"]}
              maxSize={10 * 1024 * 1024} // 10MB
              onUpload={handleUploadBanner}
              multiple={false}
              previewWidthSize="100%"
              previewHeightSize="100%"
            />
          )}
        </Box>
        {/* Detail information of car area */}
      </Box>
      {/* Action delete or upload image */}
      <Box sx={{ padding: "5px 20px" }}>
        {/* Action delete and update image */}
        <Box
          sx={{ display: "flex", justifyContent: "left", marginTop: "20px" }}
        >
          <Button variant="contained" onClick={handleSaveBannerImage}>
            {car.bannerImage ? "Update Banner Image" : "Add Banner Image"}
          </Button>
          <Button
            onClick={handleOpenConfirmDeleteBannerImageDialog}
            variant="outlined"
            color="error"
            sx={{ marginLeft: "10px" }}
          >
            Delete Banner Image
          </Button>
        </Box>
      </Box>
      {/* Show comfirm delete banner image dialog */}
      <Dialog
        open={openDialogAtUpdateBannerCarComponent}
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
          {messageAtUpdateBannerImageCarComponent}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button
            variant="outlined"
            onClick={handleCloseConfirmDeleteBannerImageDialog}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteBannerImageOfCar}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UpdateBannerImageCarComponent;
