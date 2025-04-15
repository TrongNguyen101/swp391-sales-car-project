import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import * as adminCarServices from "../../../services/AdminCarServices";

function UpdateCarPage() {
  const navigate = useNavigate();

  //state of the values of the form
  const [model, setModel] = useState("");
  const [seat, setSeats] = useState(0);
  const [priceBatteryRental, setPriceBatteryRental] = useState(0);
  const [priceBatteryOwn, setPriceBatteryOwn] = useState(0);
  const [priceDeposite, setPriceDeposite] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isShowed, setIsShowed] = useState(false);

  // Error states
  const [errorSeats, setErrorSeats] = useState("");
  const [errorPriceBatteryRental, setErrorPriceBatteryRental] = useState("");
  const [errorPriceBatteryOwn, setErrorPriceBatteryOwn] = useState("");
  const [errorPriceDeposite, setErrorPriceDeposite] = useState("");
  const [errorQuantity, setErrorQuantity] = useState("");

  //state of the message of the dialog
  const [message, setMessage] = useState("");

  //state of the successful dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const { carId } = useParams();

  const fetchCarDetails = async (Id) => {
    try {
      const response = await adminCarServices.adminGetCarById(Id);
      if (response.statusCode !== 200) {
        setMessage("Error update car");
        setOpenErrorDialog(true);
      } else {
        // Set the state with the fetched data
        setModel(response.data.model || "");
        setSeats(response.data.seat || 0);
        setPriceBatteryRental(response.data.priceBatteryRental || 0);
        setPriceBatteryOwn(response.data.priceBatteryOwn || 0);
        setPriceDeposite(response.data.priceDeposite || 0);
        setQuantity(response.data.quantity || 0);
        setIsShowed(response.data.isShowed);
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
      setMessage("Error update car");
      setOpenErrorDialog(true);
    }
  };

  useEffect(() => {
    fetchCarDetails(carId);
  }, [carId]);

  // Function to update car
  const fetchUpdateCar = async () => {
    const carData = {
      carId,
      model,
      seat,
      priceBatteryRental,
      priceBatteryOwn,
      priceDeposite,
      quantity,
      isShowed,
    };

    try {
      const response = await adminCarServices.adminUpdateCar(carData);
      if (response.statusCode === 200) {
        setMessage("Car updated successfully");
        setOpenDialog(true);
      } else {
        setMessage(response.message || "Error update car");
        setOpenErrorDialog(true);
      }
    } catch (error) {
      setMessage("Error update car");
      setOpenErrorDialog(true);
    }
  };
  // Function to handle form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    const rentalNum = Number(priceBatteryRental);
    const ownNum = Number(priceBatteryOwn);
    const depositNum = Number(priceDeposite);
    const seatsNum = Number(seat);
    const quantityNum = Number(quantity);

    if (!seat || seatsNum <= 3 || seatsNum > 9 || !Number.isInteger(seatsNum)) {
      setErrorSeats("Seats must be integer number greater than 3, less than 10");
      isValid = false;
    }

    if (!priceBatteryRental || rentalNum <= 0) {
      setErrorPriceBatteryRental("Price Battery Rental must be greater than 0");
      isValid = false;
    }

    if (!priceBatteryOwn || ownNum <= 0) {
      setErrorPriceBatteryOwn("Price Battery Own must be greater than 0");
      isValid = false;
    }

    if (!priceDeposite || depositNum <= 0) {
      setErrorPriceDeposite("Price Deposite must be greater than 0");
      isValid = false;
    }

    if (rentalNum >= ownNum) {
      setErrorPriceBatteryOwn(
        "Price battery own must be greater than price battery rental"
      );
      setErrorPriceBatteryRental(
        "Price battery rental must be less than price battery own"
      );
      isValid = false;
    }

    if (depositNum >= rentalNum) {
      setErrorPriceDeposite(
        "Price Deposite must be less than price battery rental"
      );
      isValid = false;
    }

    if (!quantity || quantityNum <= 0 || !Number.isInteger(quantityNum)) {
      setErrorQuantity("Quantity must be integer number  greater than 0");
      isValid = false;
    }

    if (isValid) {
      fetchUpdateCar();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/dashboard/cars");
  };
  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  return (
    <>
      {/* wrapper */}
      <Box sx={{ padding: "0 40px" }}>
        <Box>
          <Typography sx={{ fontWeight: "900", fontSize: "36px", paddingBottom: "20px" }}>
            Update Car {model}
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "50%", margin: "10px 0", padding: "0 10px" }}>
            <FormControl fullWidth sx={{ marginBottom: "1em" }}>
              <InputLabel id="show-model">Publish</InputLabel>
              <Select
                labelId="show-model"
                label="Show Model"
                value={isShowed}
                onChange={(e) => setIsShowed(e.target.value)}
              >
                <MenuItem value={true}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ width: "20%" }}>Published </Typography>
                  </Box>
                </MenuItem>
                <MenuItem value={false}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ width: "20%" }}>Hide </Typography>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ width: "100%", marginBottom: "1em" }}
              type="number"
              label="Seats"
              spellCheck="false"
              value={seat}
              onChange={(e) => {
                setSeats(e.target.value);
                setErrorSeats("");
              }}
              error={!!errorSeats}
              helperText={errorSeats || ""}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              sx={{ width: "100%" }}
              type="number"
              label="Quantity"
              spellCheck="false"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setErrorQuantity("");
              }}
              error={!!errorQuantity}
              helperText={errorQuantity || ""}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Box>
          <Box sx={{ width: "50%", margin: "10px 0", padding: "0 10px" }}>
            <TextField
              sx={{ width: "100%", marginBottom: "1em" }}
              type="text"
              label="Price Battery Rental"
              spellCheck="false"
              value={new Intl.NumberFormat().format(priceBatteryRental)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                if (!isNaN(rawValue)) {
                  // Check if it's a number
                  setPriceBatteryRental(rawValue);
                  setErrorPriceBatteryRental("");
                }
              }}
              error={!!errorPriceBatteryRental}
              helperText={errorPriceBatteryRental || ""}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              sx={{ width: "100%", marginBottom: "1em" }}
              type="text"
              label="Price Battery Own"
              spellCheck="false"
              value={new Intl.NumberFormat().format(priceBatteryOwn)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                if (!isNaN(rawValue)) {
                  // Check if it's a number
                  setPriceBatteryOwn(rawValue);
                  setErrorPriceBatteryOwn("");
                }
              }}
              error={!!errorPriceBatteryOwn}
              helperText={errorPriceBatteryOwn || ""}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              sx={{ width: "100%", marginBottom: "1em" }}
              type="text"
              label="Price Deposite"
              spellCheck="false"
              value={new Intl.NumberFormat().format(priceDeposite)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                if (!isNaN(rawValue)) {
                  setPriceDeposite(rawValue);
                  setErrorPriceDeposite("");
                }
              }}
              error={!!errorPriceDeposite}
              helperText={errorPriceDeposite || ""}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>
        <Box sx={{ width: "100%", margin: "auto", textAlign: "left" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            Update Car
          </Button>
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseDialog}
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
      <Dialog
        open={openErrorDialog}
        keepMounted
        onClose={handleCloseDialog}
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
            onClick={handleCloseErrorDialog}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateCarPage;
