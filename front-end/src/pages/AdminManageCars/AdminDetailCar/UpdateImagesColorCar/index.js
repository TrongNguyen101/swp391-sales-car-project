import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ImageUploadComponent from "../../../../components/AddImage";
import ListColorImageCarComponent from "../ListColorImageCar";
import * as adminCarServices from "../../../../services/AdminCarServices";

function UpdateImagessColorCar({
  carId,
  setMessage = () => {},
  setInforDialogOpen = () => {},
  fetchCarDetails = () => {},
}) {
  const [color, setColor] = useState("");
  const [colorBigImage, setColorBigImages] = useState([]);
  const [colorSmallImage, setColorSmallImages] = useState([]);
  const [selectedIdImageColor, setSelectedIdImageColor] = useState([]);
  const [errorColor, setErrorColor] = useState("");
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [requestFecthColorCar, setRequestFecthColorCar] = useState(false);

  const handleUploadBigImage = (files) => setColorBigImages(files);
  const handleUploadSmallImage = (files) => setColorSmallImages(files);
  const handleSelectImageToDelete = (idImageColor) =>
    setSelectedIdImageColor(idImageColor);

  // handle the save of the image
  const handleSaveColorImage = async () => {
    if (
      !colorBigImage.length ||
      !colorBigImage[0].file ||
      !colorSmallImage.length ||
      !colorSmallImage[0].file
    ) {
      setMessage("Please select an image to upload");
      setInforDialogOpen(true);
      return;
    }
    if (color.length > 50 || !color) {
      setErrorColor(
        "Color name is required and must be less than 50 characters"
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("colorBigImage", colorBigImage[0].file);
      formData.append("colorSmallImage", colorSmallImage[0].file);
      formData.append("color", color);
      formData.append("carId", carId);

      const response = await adminCarServices.uploadColorImageOfCar(formData);

      if (response.statusCode !== 200) {
        setMessage(response.message);
        setInforDialogOpen(true);
      } else {
        setMessage("Image uploaded successfully");
        setInforDialogOpen(true);
        //fetch color of car
        setRequestFecthColorCar(!requestFecthColorCar);
        setColorBigImages([]);
        setColorSmallImages([]);
        setColor("");
      }
    } catch (error) {
      setMessage("Failed to upload image");
      setInforDialogOpen(true);
    }
  };

  const handleDeleteColorImage = async () => {
    try {
      const response = await adminCarServices.deleteColorImageOfCar(
        selectedIdImageColor
      );
      if (response.statusCode !== 200) {
        setMessage("Failed to delete image");
        setInforDialogOpen(true);
      } else {
        fetchCarDetails();
        //hide confirm delete dialog
        setOpenConfirmDeleteDialog(false);
        //show deleting result dialog
        setInforDialogOpen(true);
        //fetch color of car
        setRequestFecthColorCar(!requestFecthColorCar);

        setMessage("Image deleted successfully");
      }
    } catch (error) {
      setMessage("Failed to delete image");
      setInforDialogOpen(true);
    }
  };

  // Show comfirm delete image dialog
  const handleOpenConfirmDeleteDialog = () => {
    if (!selectedIdImageColor) {
      setMessage("No image selected to delete");
      setInforDialogOpen(true);
      return;
    } else {
      setOpenConfirmDeleteDialog(true);
    }
  };
  // Close comfirm delete image dialog
  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}></Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          width: "100%",
          backgroundColor: "#f9f9f9",
          padding: "20px 0",
          borderBottom: "10px solid #ffffff",
        }}
      >
        <Typography sx={{ fontWeight: "500", fontSize: "24px" }}>
          List Color image of Car
        </Typography>
        <ListColorImageCarComponent
          carId={carId}
          selectedIdImageColor={handleSelectImageToDelete}
          requestFecthColorOfCar={requestFecthColorCar}
        />
        <Box sx={{ width: "800px", marginTop: "20px" }}>
          <Button
            sx={{ width: "100%" }}
            variant="outlined"
            color="error"
            onClick={handleOpenConfirmDeleteDialog}
          >
            Delete Image
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: "20px 0",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography sx={{ fontWeight: "500", fontSize: "24px" }}>
          Add new color Image of Car
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "20px",
            paddingRight: "40px",
            width: "100%",
          }}
        >
          <Box sx={{ width: "700px", paddingLeft: "60px" }}>
            <ImageUploadComponent
              title="Drag & drop an image here, or click to select main image of car"
              allowedTypes={["image/jpeg", "image/png"]}
              maxSize={10 * 1024 * 1024} // 10MB
              onUpload={handleUploadBigImage}
              multiple={false}
              previewWidthSize="700px"
              previewHeightSize="400px"
              requestFecthColorOfCar={requestFecthColorCar}
            />
          </Box>
          <Box sx={{ width: "200px", paddingRight: "60px" }}>
            <Box sx={{ width: "200px", height: "200px" }}>
              <ImageUploadComponent
                title="Drag & drop an image here, or click to select item image of car"
                allowedTypes={["image/jpeg", "image/png"]}
                maxSize={10 * 1024 * 1024} // 10MB
                onUpload={handleUploadSmallImage}
                multiple={false}
                previewWidthSize="200px"
                previewHeightSize="115px"
                propFontSize="14px"
                requestFecthColorOfCar={requestFecthColorCar}
              />
            </Box>
            <Box sx={{ width: "200px" }}>
              <TextField
                sx={{ width: "100%", marginBottom: "1em" }}
                type="text"
                label="Car Color"
                spellCheck="false"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  setErrorColor("");
                }}
                error={!!errorColor}
                helperText={errorColor || ""}
              />
            </Box>
            <Box sx={{ width: "200px" }}>
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                onClick={handleSaveColorImage}
              >
                Add New Image
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Show comfirm delete image dialog */}
      <Dialog
        open={openConfirmDeleteDialog}
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
          Are you sure you want to delete this image?
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button
            variant="outlined"
            onClick={handleCloseConfirmDeleteDialog}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteColorImage}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UpdateImagessColorCar;
