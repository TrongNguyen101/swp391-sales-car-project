import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import * as adminCarServices from "../../../services/AdminCarServices";

function UpdateCarPage() {
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

  const { carId } = useParams();

  const fetchCarDetails = async (Id) => {
    try {
      const response = await adminCarServices.adminGetCarById(Id);
      if (response.statusCode !== 200) {
        alert("Failed to fetch car details: " + response.message);
      } else {
        console.log(response.data);
        setModel(response.data.model || "");
        setSeats(response.data.seat || 0);
        setPriceBatteryRental(response.data.priceBatteryRental || 0);
        setPriceBatteryOwn(response.data.priceBatteryOwn || 0);
        setPriceDeposite(response.data.priceDeposite || 0);
        setQuantity(response.data.quantity || 0);
        setIsShowed(response.data.isShowed);
      }
    } catch (error) {
      alert("Failed to fetch car details: " + error.message);
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
        alert("Car updated successfully!");
      } else {
        alert("Error updating car: " + response.message);
      }
    } catch (error) {
      alert("Error updating car: " + error.message);
    }
  };
  // Function to handle form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    if (!seat || seat <= 3 || seat > 9) {
      setErrorSeats("Seats must be greater than 3, less than 10");
      isValid = false;
    }

    if (!priceBatteryRental || priceBatteryRental <= 0) {
      setErrorPriceBatteryRental("Price Battery Rental must be greater than 0");
      isValid = false;
    }

    if (!priceBatteryOwn || priceBatteryOwn <= 0) {
      setErrorPriceBatteryOwn("Price Battery Own must be greater than 0");
      isValid = false;
    }

    if (!priceDeposite || priceDeposite <= 0) {
      setErrorPriceDeposite("Price Deposite must be greater than 0");
      isValid = false;
    }

    if (!quantity || quantity <= 0) {
      setErrorQuantity("Quantity must be greater than 0");
      isValid = false;
    }

    if (isValid) {
      fetchUpdateCar();
    }
  };

  return (
    <>
      {/* wrapper */}
      <Box sx={{ padding: "20px", backgroundColor: "#f7f7f7" }}>
        <Box>
          <Typography sx={{ fontWeight: "900", fontSize: "36px" }}>
            Update Car
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 0.625rem 1.25rem",
            backgroundColor: "#ffffff",
            margin: "20px auto",
            width: "90%",
          }}
        >
          <Typography sx={{ fontWeight: "900", fontSize: "36px" }}>
            {model}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "500px", margin: "10px 0", padding: "0 10px" }}>
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
          <Box sx={{ width: "500px", margin: "10px 0", padding: "0 10px" }}>
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
        <Box sx={{ width: "100%", margin: "auto", textAlign: "center" }}>
          <Button
            sx={{ width: "300px" }}
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            Update Car
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default UpdateCarPage;
