import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./CreateURLPaymentOfDeposit.module.scss";
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
import * as adminServices from "../../services/AdminServices";

const cx = classNames.bind(styles);

const CreateURLPaymentOfDepositPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const [colors, setColors] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("Battery Rental");
  const [dialogMessage, setDialogMessage] = useState("");
  const [inputFullname, setInputFullname] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [address, setAddress] = useState("");
  const [colorToImageUrl, setColorToImageUrl] = useState("");
  const [remainingAmount, setRemainingAmount] = useState(0);

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

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      const response = await CarService.userGetCarById(Id);
      if (response.statusCode !== 200) {
        navigate("/cars");
        return;
      } else {
        setCar(JSON.parse(response.data));
      }
    } catch (error) {
      navigate("/cars");
      return;
    }
  };

  const fetchRemainingAmount = async (Id) => {
    try {
      const response = await DepositService.getRemainingAmount(Id);
      if (response.statusCode !== 200) {
        setDialogMessage(response.data.message);
        setDialogOpen(true);
      } else {
        console.log(JSON.parse(response.data));
        setRemainingAmount(JSON.parse(response.data));
      }
    } catch (error) {
      setDialogMessage(error.response.data.message);
      setDialogOpen(true);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("Bearer");
      const decoded = DecodePayload.decodePayload(token);
      const response = await adminServices.getUserById(decoded.sub);
      setInputFullname(decoded.name);
      setInputPhone(decoded.phone);
      setInputEmail(decoded.email);
      setAddress(response.data.address);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    toTop();
    const token = localStorage.getItem("Bearer");
    if (!token) {
      navigate("/login");
    } else {
      fetchCarDetails(carId);
      fetchCarColors(carId);
      setColorToImageUrl(defualtColor.ColorImage);
      fetchRemainingAmount(carId);
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  // Handle submit payment
  const handlePayment = async () => {
    // Check if user has selected color
    if (!selectedColor) {
      setDialogMessage("Please select color for your car");
      setDialogOpen(true);
      return;
    }
    try {
      // Prepare invoice data
      const paymentInformation = {
        OrderInfo: orderInfo,
        Amount: car.PriceDeposite,
      };
      // Call API to create invoice for deposit payment
      const response = await DepositService.createPaymentURL(
        paymentInformation
      );
      // If response status code is 200, save the remaining amount and redirect to payment page
      if (response.statusCode === 200) {
        localStorage.setItem("customerName", inputFullname);
        localStorage.setItem("email", inputEmail);
        localStorage.setItem("phone", inputPhone);
        localStorage.setItem("address", address);
        localStorage.setItem("typeofProduct", carId);
        localStorage.setItem("productVersion", selectedVersion);
        localStorage.setItem("amount", car.PriceDeposite);
        if (selectedVersion === "Battery Rental") {
          localStorage.setItem(
            "productRemainingAnount",
            remainingAmount.remainingAmountBatteryRent
          );
        } else {
          localStorage.setItem(
            "productRemainingAnount",
            remainingAmount.remainingAmountBatteryOwn
          );
        }
        console.log(response.data);
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

  // Handle choosing color before payment
  const handleColorChange = (event) => {
    const selectColor = event.target.value;
    setSelectedColor(selectColor);
    colors.forEach((color) => {
      if (color.ColorName === selectColor) {
        setColorToImageUrl(color.ColorImage);
      }
    });
  };
  // Handle choosing version battery before payment
  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

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
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={2}
                disabled
                value={orderInfo}
              />
            </FormControl>
            <div className={cx("tutorial")}>
              <Typography>
                You can place a deposit via VnPAY. Our team will contact you
                shortly to guide you through the necessary procedures. The
                vehicle will be handed over at our showroom.
              </Typography>
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
            <div className={cx("car-price-info")}>
              <div className={cx("car-price-title")}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: "#3C3C3C",
                    fontSize: "1.5rem",
                  }}
                >
                  Car price:
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: "#3C3C3C",
                    fontSize: "1.5rem",
                  }}
                >
                  Deposit price:
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: "#3C3C3C",
                    fontSize: "1.5rem",
                  }}
                >
                  Remaining amount:
                </Typography>
              </div>
              <div className={cx("car-price")}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: "#3C3C3C",
                    fontSize: "1.5rem",
                  }}
                >
                  {selectedVersion === "Battery Rental"
                    ? car.PriceBatteryRental
                    : car.PriceBatteryOwn}{" "}
                  VND
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: "#3C3C3C",
                    fontSize: "1.5rem",
                  }}
                >
                  {car.PriceDeposite} VND
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: "#3C3C3C",
                    fontSize: "1.5rem",
                  }}
                >
                  {selectedVersion === "Battery Rental"
                    ? remainingAmount.remainingAmountBatteryRent
                    : remainingAmount.remainingAmountBatteryOwn}{" "}
                  VND
                </Typography>
              </div>
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
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateURLPaymentOfDepositPage;
