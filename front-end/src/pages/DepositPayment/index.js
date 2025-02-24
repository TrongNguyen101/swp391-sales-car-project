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
  TextField,
  Typography,
} from "@mui/material";
import * as DepositService from "../../services/DepositService";
import * as CarService from "../../services/CarService";
import * as DecodePayload from "../../lib/DecodePayload";

const cx = classNames.bind(styles);

const DepositPaymentPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const [user, setUser] = useState({});
  const [colors, setColors] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("Battery Rental");
  const [dialogMessage, setDialogMessage] = useState("");
  const [inputFullname, setInputFullname] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [colorToImageUrl, setColorToImageUrl] = useState("");

  const orderInfo =
    "Deposit payment for car " +
    car.Name +
    " with color " +
    selectedColor +
    " and version " +
    selectedVersion;

  const defualtColor = {
    Id: colors[0]?.Id,
    ColorName: colors[0]?.ColorName,
    ColorImage: colors[0]?.ColorImage,
  };

  const fetchCarColors = async (Id) => {
    try {
      const response = await CarService.getCarColorById(Id);
      if (response.statusCode !== 200) {
        setDialogMessage(response.data.message);
        setDialogOpen(true);
        setColors([]);
      } else {
        setColors(JSON.parse(response.data));
      }
    } catch (error) {
      setColors([]);
      setDialogMessage("Error fetching car colors");
      setDialogOpen(true);
    }
  };

  const fetchCarDetails = async (Id) => {
    try {
      const response = await CarService.getCarById(Id);
      if (response.statusCode !== 200) {
        setCar({});
        setDialogMessage(response.data.message);
        setDialogOpen(true);
      } else {
        setCar(JSON.parse(response.data));
      }
    } catch (error) {
      setCar({});
      setDialogMessage(error.response.data.message);
      setDialogOpen(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    if (!token) {
      navigate("/login");
    } else {
      const decoded = DecodePayload.decodePayload(token);
      setUser(decoded);
      setInputFullname(decoded.name);
      setInputPhone(decoded.phone);
      setInputEmail(decoded.email);
      fetchCarDetails(carId);
      fetchCarColors(carId);
      setColorToImageUrl(defualtColor.ColorImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  const handlePayment = async () => {
    if (!selectedColor || !selectedVersion) {
      setDialogMessage("Please select color and version of car");
      setDialogOpen(true);
      return;
    }
    try {
      const response = await DepositService.postDeposit(
        car.PriceDeposite,
        orderInfo
      );
      if (response.statusCode === 200) {
        window.location.href = response.data;
      } else {
        setDialogMessage(response.data.message);
        setDialogOpen(true);
      }
    } catch (error) {
      setDialogMessage(error.response.data.message);
      setDialogOpen(true);
    }
  };

  const handleColorChange = (event) => {
    const selectColor = event.target.value;
    setSelectedColor(selectColor);
    colors.forEach((color) => {
      if (color.ColorName === selectColor) {
        setColorToImageUrl(color.ColorImage);
      }
    });
  };

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  console.log(inputFullname);
  console.log(orderInfo);
  console.log(user);
  console.log(colors[0]);
  console.log(selectedColor);
  console.log(colorToImageUrl);
  console.log(defualtColor);
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <Typography
          variant="h2"
          sx={{
            fontSize: "1.8rem",
            fontWeight: "600",
            color: "#3C3C3C",
          }}
        >
          Deposit Payment Information
        </Typography>
        <div className={cx("display-info")}>
          <div className={cx("user-info")}>
            <FormControl sx={{ gap: 3 }}>
              <TextField
                label="Fullname"
                variant="outlined"
                disabled
                value={inputFullname}
                onChange={(e) => setInputFullname(e.target.value)}
              />
              <TextField
                label="Phone"
                variant="outlined"
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </FormControl>
            <div className={cx("payment-info")}>
              <Typography>Deposit payment page</Typography>
              <Typography>Car name: {car.Name}</Typography>
              <Typography>Deposit price: {car.PriceDeposite}</Typography>
              <Typography>Description:{orderInfo}</Typography>
            </div>
            <div className={cx("form-control")}>
              <FormControl sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="color-select-label">Select Color</InputLabel>
                <Select
                  labelId="color-select-label"
                  value={selectedColor}
                  onChange={handleColorChange}
                  label="Select Color"
                >
                  {colors.map((color, index) => (
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
          </div>
          <div className={cx("car-image-price")}>
            <div className={cx("color-image")}>
              <img
                src={
                  !selectedColor
                    ? `https://localhost:7005/api/Images/ColorDetail/${defualtColor.ColorImage}`
                    : `https://localhost:7005/api/Images/ColorDetail/${colorToImageUrl}`
                }
                alt={selectedColor}
              />
            </div>
            <div className={cx("car-price")}>
              <Typography variant="h5" sx={{ fontWeight: "600" }}>
                Car price:{" "}
                {selectedVersion === "Battery Rental"
                  ? car.PriceBatteryRental
                  : car.PriceBatteryOwn}
              </Typography>
              <Typography variant="h5" sx={{fontWeight: "600"}}>Deposit price: {car.PriceDeposite}</Typography>
              <Typography>{selectedColor === "Battery Rental" ? car.PriceBatteryRental - car.PriceDeposite : car.PriceBatteryOwn - car.PriceDeposite}</Typography>
            </div>
          </div>
        </div>
        <div className={cx("button-payment")}>
          <Button variant="contained" onClick={handlePayment}>
            Pay Now with VNPay
          </Button>
        </div>
      </div>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {"Notification"}
        </DialogTitle>
        <DialogContent
          id="alert-dialog-description"
          sx={{ textAlign: "center", width: "400px", height: "60px" }}
        >
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
