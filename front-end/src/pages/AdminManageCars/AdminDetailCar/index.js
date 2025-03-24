import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";

import * as adminCarServices from "../../../services/AdminCarServices";
import UpdateImagesColorCar from "./UpdateImagesColorCar";
import UpdateCardCarComponent from "./UpdateCardImageCar";
import UpdateSpecificationImageCarComponent from "./UpdateSpecificationImageCar";
import UpdateBannerImageCarComponent from "./UpdateBannerImageCar";

function AdminDetailCarPage() {
  //state manage car for detail page
  const [car, setCar] = useState({});

  // state of the message to show the user
  const [message, setMessage] = useState("");
  const [inforDialogOpen, setInforDialogOpen] = useState(false);

  // get the carId from the url
  const { carId } = useParams();

  // fetch the car details by the carId
  const fetchCarDetails = async () => {
    try {
      const response = await adminCarServices.getCarById(carId);
      if (response.statusCode !== 200) {
        setMessage("Failed to fetch car details");
        setInforDialogOpen(true);
        return;
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
    fetchCarDetails();
    // eslint-disable-next-line
  }, []);

  const handleCloseDialog = () => {
    setInforDialogOpen(false);
    setMessage("");
  };

  return (
    <Box sx={{ padding: "20px", width: "100%" }}>
      {/* Title: Detail Page */}
      <Typography
        sx={{
          width: "100%",
          fontWeight: 900,
          fontSize: "36px",
        }}
      >
        Detail page{" "}
      </Typography>

      {/* Update banner image of Car */}
      <Box sx={{ padding: "20px", width: "100%" }}>
        <UpdateBannerImageCarComponent
          car={car}
          setMessage={setMessage}
          setInforDialogOpen={setInforDialogOpen}
          fetchCarDetails={fetchCarDetails}
        />
      </Box>

      {/* Update card image of Car */}
      <Box sx={{ padding: "20px", width: "100%" }}>
        <UpdateCardCarComponent
          car={car}
          setMessage={setMessage}
          setInforDialogOpen={setInforDialogOpen}
          fetchCarDetails={fetchCarDetails}
        />
      </Box>

      {/* Update image color of Car */}
      <Box sx={{ padding: "20px", width: "100%" }}>
        <UpdateImagesColorCar
          carId={carId}
          setMessage={setMessage}
          setInforDialogOpen={setInforDialogOpen}
        />
      </Box>

      <Box sx={{ padding: "20px", width: "100%" }}>
        <UpdateSpecificationImageCarComponent
          car={car}
          setMessage={setMessage}
          setInforDialogOpen={setInforDialogOpen}
          fetchCarDetails={fetchCarDetails}
        />
      </Box>

      {/* Dialog */}
      <Dialog
        open={inforDialogOpen}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "640px" } }}
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
        <DialogActions sx={{ justifyContent: "center", padding: "20px" }}>
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
