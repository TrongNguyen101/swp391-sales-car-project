import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames/bind";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";

import * as adminCarServices from "../../../services/AdminCarServices";
import styles from "./AdminDetailCar.module.scss";
import ImageUploadComponent from "../../../components/AddImage";
import ListColorImageCarComponent from "./ListColorImageCar";
import UpdateImagesColorCar from "./UpdateImagesColorCar";
import UpdateCardCarComponent from "./UpdateCardImageCar";

const cx = classNames.bind(styles);

function AdminDetailCarPage() {
  //state of the values of the form
  const [car, setCar] = useState({});

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



  // handle the save of the image
  // const handleSaveBannerImage = async () => {
  //   if (!cardImage.length || !cardImage[0].file) {
  //     setMessage("Please select an image to upload");
  //     setInforDialogOpen(true);
  //   } else {
  //     try {
  //       const formData = new FormData();
  //       formData.append("cardImage", cardImage[0].file);

  //       const response = await adminCarServices.uploadCardImageOfCar(
  //         carId,
  //         formData
  //       );

  //       if (response.statusCode !== 200) {
  //         setMessage("Failed to upload image");
  //         setInforDialogOpen(true);
  //       } else {
  //         setMessage("Image uploaded successfully");
  //         fetchCarDetails(carId);
  //         setInforDialogOpen(true);
  //       }
  //     } catch (error) {
  //       setMessage(error);
  //       setInforDialogOpen(true);
  //     }
  //   }
  // };

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

  

  const handleCloseDialog = () => {
    setInforDialogOpen(false);
  };

  // format the price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <Box sx={{ padding: "20px", width: "100%", backgroundColor: "#f7f7f7" }}>
      {/* Title: Detail Page */}
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

      {/* Title: Car Information */}
      <UpdateCardCarComponent car={car} setMessage={setMessage} setInforDialogOpen={setInforDialogOpen} fetchCarDetails={fetchCarDetails} />

      <Box>
        <UpdateImagesColorCar carId={carId} />
      </Box>

      {/* Dialog */}
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
    </Box>
  );
}

export default AdminDetailCarPage;
