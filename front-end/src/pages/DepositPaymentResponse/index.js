import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as DepositService from "../../services/DepositService";
import * as DecodePayload from "../../lib/DecodePayload";
import classNames from "classnames/bind";
import styles from "./DepositPaymentResponse.module.scss";

const cx = classNames.bind(styles);

function DepositPaymentResponsePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [deposit, setDeposit] = useState({});
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");

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

  const ToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToHome = () => {
    navigate("/");
  };

  const fetchDepositPaymentResponse = async (queryParams) => {
    try {
      const response = await DepositService.getDeposit(queryParams);
      if (response.statusCode !== 200) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
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
    ToTop();
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
        <div className={cx("image-check")}>
          {data.transactionStatus === "00" ? (
            <img src="green-check-in.png" alt="Success" />
          ) : (
            <img src="error-icon.png" alt="Fail" />
          )}
        </div>
        <div className={cx("message")}>
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            {message}
          </Typography>
        </div>
        <div className={cx("description")}>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            {data.transactionStatus === "00"
              ? "Congratulations! Your deposit is successful. We’ll contact you soon to complete the process. For support, call 1900 23 23 89."
              : "Seems there was an issue or incomplete deposit payment. Don’t worry! We’ll contact you soon. For support, call 1900 23 23 89."}
          </Typography>
        </div>
        <div className={cx("action-btn")}>
          <Button variant="contained" onClick={handleToHome}>confirm</Button>
        </div>
      </div>
    </div>
  );
}

export default DepositPaymentResponsePage;
