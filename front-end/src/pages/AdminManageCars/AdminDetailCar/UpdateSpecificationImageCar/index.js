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

function UpdateSpecificationImageCarComponent({
  car,
  setMessage = () => {},
  setInforDialogOpen = () => {},
  fetchCarDetails = () => {},
}) {
  const [speImage, setSpeImages] = useState([]);

  // state of the dialog to show the user
  const [
    openDialogAtUpdateSpeCarComponent,
    setOpenDialogAtUpdateSpeCarComponent,
  ] = useState(false);
  const [
    messageAtUpdateSpeImageCarComponent,
    setMessageAtUpdateSpeImageCarComponent,
  ] = useState("");

  // This function call back to ImageUploadComponent to get file image
  const handleUploadSpe = (files) => setSpeImages(files);

  // handle the save of the image
  const handleSaveSpeImage = async () => {
    if (car.image) {
      setMessage(
        "The specification image already exists. Please delete it first."
      );
      setInforDialogOpen(true);
      return;
    } else {
      if (!speImage.length || !speImage[0].file) {
        setMessage("Please select an image to upload");
        setInforDialogOpen(true);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("specificationsImage", speImage[0].file);

        const response = await adminCarServices.uploadImageOfCar(
          car.id,
          formData
        );

        if (response.statusCode !== 200) {
          setMessage("Failed to upload image");
          setInforDialogOpen(true);
        } else {
          setMessage("Image uploaded successfully");
          setSpeImages([]);
          fetchCarDetails();
          setInforDialogOpen(true);
        }
      } catch (error) {
        setMessage(error);
        setInforDialogOpen(true);
      }
    }
  };

  const handleOpenConfirmDeleteSpeImageDialog = () => {
    if (!car.specImage) {
      setMessage("No image to delete.");
      setInforDialogOpen(true);
      return;
    }
    setMessageAtUpdateSpeImageCarComponent(
      "Are you sure you want to delete the specification image?"
    );
    setOpenDialogAtUpdateSpeCarComponent(true);
  };

  const handleDeleteSpeImageOfCar = async () => {
    try {
      const typeOfImage = "specificationsImage";
      const response = await adminCarServices.deleteImageOfCar(
        car.id,
        typeOfImage
      );
      if (response.statusCode !== 200) {
        setOpenDialogAtUpdateSpeCarComponent(false);
        setMessage("The attempt to delete the image failed.");
        setInforDialogOpen(true);
      } else {
        fetchCarDetails();
        setMessage("The specification image was deleted successfully.");
        setOpenDialogAtUpdateSpeCarComponent(false);
        setInforDialogOpen(true);
      }
    } catch (error) {
      setMessage(error);
      setInforDialogOpen(true);
    }
  };

  const handleCloseConfirmDeleteSpeImageDialog = () => {
    setOpenDialogAtUpdateSpeCarComponent(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: "20px",
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
        Specification Image
      </Typography>
      {/* image specification area */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "40px",
          width: "100%",
          height: "100%",
        }}
      >
        {/* review Specificationimage area */}
        <Box sx={{ width: "1200px" }}>
          {car.specImage ? (
            <img
              src={`https://localhost:7005/api/Images/Spec/${car.specImage}`}
              alt={car.model}
            />
          ) : (
            <ImageUploadComponent
              title="Drag & drop an image here, or click to select specification image of car"
              allowedTypes={["image/jpeg", "image/png"]}
              maxSize={10 * 1024 * 1024} // 10MB
              onUpload={handleUploadSpe}
              multiple={false}
              previewWidthSize="1200px"
              previewHeightSize="100%"
            />
          )}
        </Box>
        {/* Detail information of car area */}
      </Box>
      {/* Action delete or upload image */}
      <Box sx={{ padding: "5px 20px", width: "600px" }}>
        {/* Action delete and update image */}
        <Box
          sx={{ display: "flex", justifyContent: "left", marginTop: "20px" }}
        >
          <Button variant="contained" onClick={handleSaveSpeImage}>
            {car.image
              ? "Update Specification Image"
              : "Add Specification Image"}
          </Button>
          <Button
            onClick={handleOpenConfirmDeleteSpeImageDialog}
            variant="outlined"
            color="error"
            sx={{ marginLeft: "10px" }}
          >
            Delete Specification Image
          </Button>
        </Box>
      </Box>
      {/* Show comfirm delete specification image dialog */}
      <Dialog
        open={openDialogAtUpdateSpeCarComponent}
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
          {messageAtUpdateSpeImageCarComponent}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button
            variant="outlined"
            onClick={handleCloseConfirmDeleteSpeImageDialog}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteSpeImageOfCar}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UpdateSpecificationImageCarComponent;
