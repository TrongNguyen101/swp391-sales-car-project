import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as DepositService from "../../services/DepositService";
import * as carService from "../../services/CarService";
import { Typography } from "@mui/material";

const DepositPaymentPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState({});
  const orderInfo = "Deposit payment for car " + car.Name;

  const fetchCarDetails = async (Id) => {
    try {
      const response = await carService.getCarById(Id);
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
    fetchCarDetails(carId);
  }, [carId]);

  const handlePayment = async () => {
    try {
      const response = await DepositService.postDeposit(
        car.PriceDeposite,
        orderInfo
      );
      if (response.statusCode === 200) {
        window.location.href = response.data;
      } else {
        alert("Failed to create payment URL");
      }
    } catch (error) {
      alert("Error creating payment URL");
    }
  };

  return (
    <div>
      <Typography>Deposit payment page</Typography>
      <Typography>Car name: {car.Name}</Typography>
      <Typography>Deposit price: {car.PriceDeposite}</Typography>
      <Typography>Description:{orderInfo}</Typography>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default DepositPaymentPage;
