import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./DepositPayment.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import * as DepositService from "../../services/DepositService";
import * as CarService from "../../services/CarService";
import * as DecodePayload from "../../lib/DecodePayload";

const cx = classNames.bind(styles);

const DepositPaymentPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [colors, setColors] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");
  const [user, setUser] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const navigate = useNavigate();
  const orderInfo =
    "Deposit payment for car " +
    car.Name +
    " with color " +
    selectedColor +
    " and version " +
    selectedVersion;

  const fetchCarColors = async (Id) => {
    try {
      const response = await CarService.getCarColorById(Id);
      if (response.statusCode !== 200) {
        setColors([]);
      } else {
        setColors(JSON.parse(response.data));
      }
    } catch (error) {
      setColors([]);
    }
  };

  const fetchCarDetails = async (Id) => {
    try {
      const response = await CarService.getCarById(Id);
      if (response.statusCode !== 200) {
        setCar({});
      } else {
        setCar(JSON.parse(response.data));
      }
    } catch (error) {
      setCar({});
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    if (!token) {
      navigate("/login");
    } else {
      const decoded = DecodePayload.decodePayload(token);
      setUser(decoded);
      fetchCarDetails(carId);
      fetchCarColors(carId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  const handlePayment = async () => {
    if (!selectedColor || !selectedVersion) {
      setDialogMessage("Please select color and version of car");
      setDialogOpen(true);
      return
    }
    try {
      const response = await DepositService.postDeposit(
        car.PriceDeposite,
        orderInfo
      );
      if (response.statusCode === 200) {
        window.location.href = response.data;
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error creating payment URL");
    }
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  console.log(orderInfo);
  console.log(user);
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("account-infor")}>
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Account Information
          </Typography>
          <div className={cx("user-info")}>
            <Typography>UserId: {user.sub}</Typography>
            <Typography>Fullname: {user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone: {user.phone}</Typography>
          </div>
        </div>
        <div className={cx("payment-info")}>
          <Typography>Deposit payment page</Typography>
          <Typography>Car name: {car.Name}</Typography>
          <Typography>Deposit price: {car.PriceDeposite}</Typography>
          <Typography>Description:{orderInfo}</Typography>
        </div>
        <div className={cx("form-control")}>
          <FormControl sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="color-select-label" sx={{ zIndex: -1 }}>
              Select Color
            </InputLabel>
            <Select
              labelId="color-select-label"
              value={selectedColor}
              onChange={handleColorChange}
              label="Select Color"
            >
              {colors &&
                colors.map((color, index) => (
                  <MenuItem key={index} value={color.ColorName}>
                    {color.ColorName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="version"
              name="version"
              value={selectedVersion}
              onChange={handleVersionChange}
            >
              <FormControlLabel
                value="Battery Rental"
                control={<Radio />}
                label="Battery Rental"
              />
              <FormControlLabel
                value="Battery Own"
                control={<Radio />}
                label="Battery Own"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={cx("button-payment")}>
          <Button variant="contained" onClick={handlePayment}>
            Pay Now
          </Button>
        </div>
      </div>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{textAlign: "center"}}>{"Notification"}</DialogTitle>
        <DialogContent id="alert-dialog-description" sx={{ textAlign: "center", width: "400px", height: "60px" }}>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleCloseDialog} variant="contained" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DepositPaymentPage;
