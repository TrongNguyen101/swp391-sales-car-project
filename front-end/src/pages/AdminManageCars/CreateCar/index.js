import { useState } from "react";

import classNames from "classnames/bind";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import * as adminCarServices from "../../../services/AdminCarServices";
import styles from "./CreateCar.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function CreateCarPage() {
  const navigate = useNavigate();

  //state of the values of the form
  const [model, setModel] = useState("");
  const [seat, setSeats] = useState();
  const [priceBatteryRental, setPriceBatteryRental] = useState(0);
  const [priceBatteryOwn, setPriceBatteryOwn] = useState(0);
  const [priceDeposite, setPriceDeposite] = useState(0);
  const [quantity, setQuantity] = useState();

  // Error states
  const [errorModel, setErrorModel] = useState("");
  const [errorSeats, setErrorSeats] = useState("");
  const [errorPriceBatteryRental, setErrorPriceBatteryRental] = useState("");
  const [errorPriceBatteryOwn, setErrorPriceBatteryOwn] = useState("");
  const [errorPriceDeposite, setErrorPriceDeposite] = useState("");
  const [errorQuantity, setErrorQuantity] = useState("");

  //state of the message of the dialog
  const [message, setMessage] = useState("");
  const [statusResponse, setStatusResponse] = useState(false);

  //state of the successful dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    if (!model) {
      setErrorModel("Model is required");
      isValid = false;
    }

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

    if (priceDeposite > priceBatteryRental || priceDeposite > priceBatteryOwn) {
      setErrorPriceDeposite("Price Deposite must be less than Price Battery Rental and Price Battery Own");
      isValid = false;
    }

    if (!quantity || quantity <= 0) {
      setErrorQuantity("Quantity must be greater than 0");
      isValid = false;
    }

    if (isValid) {
      fetchCreateCar();
    }
  };

  const fetchCreateCar = async () => {
    try {
      const carData = {
        model,
        seat,
        priceBatteryRental,
        priceBatteryOwn,
        priceDeposite,
        quantity,
      };
      const response = await adminCarServices.adminCreateCar(carData);
      if (response.statusCode === 200) {
        setMessage(response.message);
        setStatusResponse(true);
        setOpenDialog(true);
      } else {
        if (response.status === 400) {
          setMessage("Failed to create car");
          setOpenDialog(true);
          setStatusResponse(false);
          return;
        }
        setStatusResponse(response.success);
        setMessage(response.message);
        setOpenDialog(true);
      }
    } catch (error) {
      if (error) {
        console.log("loi tao car", error);
      }
      setMessage("Failed to create car");
      setOpenDialog(true);
      setStatusResponse(false);
      return
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (statusResponse) {
      navigate("/dashboard/cars");
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Typography variant="h4" gutterBottom>
          Create Car
        </Typography>
        <form className={cx("container__form")}>
          <div className={cx("form-group")}>
            <TextField
              sx={{ width: "100%", marginBottom: "1em" }}
              type="text"
              label="Model"
              spellCheck="false"
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                setErrorModel("");
              }}
              error={!!errorModel}
              helperText={errorModel || ""}
            />
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
            />
          </div>
          <div className={cx("form-group")}>
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
            />
          </div>
        </form>
        <Button variant="contained" color="primary" onClick={handleFormSubmit}>
          Create Car
        </Button>
      </div>
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
    </div>
  );
}

export default CreateCarPage;
