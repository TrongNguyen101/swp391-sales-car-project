import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as DepositService from "../../services/DepositService";

function DepositPaymentResponsePage() {
  const location = useLocation();
  const [deposit, setDeposit] = useState({});
  const data = {
    productId: localStorage.getItem("productId"),
    userId: 1,
    amount: deposit.Amount,
    orderInfo: deposit.OrderInfo,
    transactionStatus: deposit.TransactionStatus,
  }

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
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    fetchDepositPaymentResponse(queryParams);
  }, [location]);

  return <div><Typography>Deposit payment response</Typography></div>;
}

export default DepositPaymentResponsePage;
