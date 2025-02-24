import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as DepositService from "../../services/DepositService";
import * as DecodePayload from "../../lib/DecodePayload";
import classNames from "classnames/bind";
import styles from "./DepositPaymentResponse.module.scss";

const cx = classNames.bind(styles);

function DepositPaymentResponsePage() {
  const location = useLocation();
  const [deposit, setDeposit] = useState({});
  const [user, setUser] = useState({});

  const data = {
    productId: localStorage.getItem("productId"),
    userId: user.sub,
    name: user.name,
    email: user.email,
    phone: user.phone,
    amount: deposit.Amount,
    orderInfo: deposit.OrderInfo,
    transactionStatus: deposit.TransactionStatus,
    productVersion: localStorage.getItem("productVersion"),
    priceBatteryRent: localStorage.getItem("priceBatteryRent"),
    priceBatteryOwn: localStorage.getItem("priceBatteryOwn"),
    remainingAmountRent: localStorage.getItem("remainingAmountRent"),
    remainingAmountOwn: localStorage.getItem("remainingAmountOwn"),
  };

  const fetchDepositPaymentResponse = async (queryParams) => {
    try {
      const response = await DepositService.getDeposit(queryParams);
      if (response.statusCode !== 200) {
        alert(response.data.message);
      } else {
        alert("Payment successful");
        console.log(response.data);
        setDeposit(JSON.parse(response.data));
      }
    } catch (error) {
      alert("Error getting payment response");
    }
  };
  console.log(deposit);
  console.log(data);
  console.log(user);
  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    const decodedToken = DecodePayload.decodePayload(token);
    const queryParams = new URLSearchParams(location.search);
    setUser(decodedToken);
    fetchDepositPaymentResponse(queryParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <Typography variant="h4">Invoice</Typography>
        <div className={cx("invoice-section")}>
          <Typography variant="h6">Transaction Information</Typography>
          <Typography>{data.name}</Typography>
          <Typography>{data.email}</Typography>
          <Typography>{data.phone}</Typography>
        </div>
        <div className={cx("invoice-section")}>
          <Typography variant="h6">Payment Detail</Typography>
          <Typography>Deposit price: {data.amount}</Typography>
          <Typography>Description: {data.orderInfo}</Typography>
          <Typography>
            Transaction Status:{" "}
            {data.transactionStatus === "00" ? "Success" : "Cancel"}
          </Typography>
        </div>
        <div className={cx("invoice-section")}>
          <Typography variant="h6">Product Detail</Typography>
          <Typography>Car Version: {data.productVersion}</Typography>
          <Typography>
            Car Price:{" "}
            {data.productVersion === "Battery Rental"
              ? data.priceBatteryRent
              : data.priceBatteryOwn}
          </Typography>
          <Typography>
            Remaining Amount:{" "}
            {data.productVersion === "Battery Rental"
              ? data.remainingAmountRent
              : data.remainingAmountOwn}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default DepositPaymentResponsePage;
