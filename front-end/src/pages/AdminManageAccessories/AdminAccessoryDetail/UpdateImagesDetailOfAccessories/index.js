import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ImageUploadComponent from "../../../../components/AddImage";
import * as adminAccessoryServices from "../../../../services/AdminAccessoryServices";
import AccessoryGalleryComponent from "../AccessoryGallery";

function UpdateImagesDetailOfAccessoriesComponent({
  accessoryId,
  setMessage = () => {},
  setInforDialogOpen = () => {},
  fetchCarDetails = () => {},
}) {
  const [detailImageOfAccessory, setDetailImageOfAccessory] = useState([]);
  const [selectedIdImageDetail, setSelectedIdImageDetail] = useState();
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [requestFecthDetailImageList, setRequestFecthDetailImageList] =
    useState(false);

  const handleUploadDetailImage = (files) => setDetailImageOfAccessory(files);
  const handleDeleteDetailImage = (idImageDetailAccessory) =>
    setSelectedIdImageDetail(idImageDetailAccessory);

  // handle the save of the image
  const handleSaveColorImage = async () => {
    if (!detailImageOfAccessory.length || !detailImageOfAccessory[0].file) {
      setMessage("Please select an image to upload");
      setInforDialogOpen(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("detailImage", detailImageOfAccessory[0].file);
      formData.append("color", "color");
      formData.append("accessoryId", accessoryId);

      const response =
        await adminAccessoryServices.uploadImageDetailOfAccessory(formData);

      if (response.statusCode !== 200) {
        setMessage("Failed to upload image");
        setInforDialogOpen(true);
      } else {
        setMessage("Image uploaded successfully");
        setInforDialogOpen(true);
        //fetch color of car
        setRequestFecthDetailImageList(!requestFecthDetailImageList);
        setDetailImageOfAccessory([]);
      }
    } catch (error) {
      setMessage("Failed to upload image");
      setInforDialogOpen(true);
    }
  };

  const handleDeleteColorImage = async () => {
    try {
      if (!selectedIdImageDetail) {
        setMessage("No image selected to delete");
        setInforDialogOpen(true);
        return;
      }
      const response =
        await adminAccessoryServices.deleteImageDetailOfAccessory(
          selectedIdImageDetail
        );
      if (response.statusCode !== 200) {
        setOpenConfirmDeleteDialog(false);
        setMessage("Failed to delete image");
        setInforDialogOpen(true);
      } else {
        fetchCarDetails();
        //hide confirm delete dialog
        setOpenConfirmDeleteDialog(false);
        //show deleting result dialog
        setInforDialogOpen(true);
        //fetch color of car
        setRequestFecthDetailImageList(!requestFecthDetailImageList);

        setMessage("Image deleted successfully");
      }
    } catch (error) {
      setMessage("Failed to delete image");
      setInforDialogOpen(true);
    }
  };

  // Show comfirm delete image dialog
  const handleOpenConfirmDeleteDialog = () => {
    if (!selectedIdImageDetail) {
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
          List detail image of accessory
        </Typography>
        <AccessoryGalleryComponent
          handleDeleteDetailImage={handleDeleteDetailImage}
          requestFecthDetailImageList={requestFecthDetailImageList}
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
          Add new detail image of accessory
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
            width: "100%",
          }}
        >
          <Box sx={{ width: "700px" }}>
            <ImageUploadComponent
              title="Drag & drop an image here, or click to select detail image of accessory"
              allowedTypes={["image/jpeg", "image/png"]}
              maxSize={10 * 1024 * 1024} // 10MB
              onUpload={handleUploadDetailImage}
              multiple={false}
              previewWidthSize="700px"
              previewHeightSize="400px"
              requestFecthColorOfCar={requestFecthDetailImageList}
            />
          </Box>

          <Box sx={{ width: "200px", paddingTop: "20px" }}>
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

export default UpdateImagesDetailOfAccessoriesComponent;
