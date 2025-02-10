import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as DepositService from "../../services/DepositService";

function DepositPaymentResponsePage() {
  const location = useLocation();

  const fetchDepositPaymentResponse = async (queryParams) => {
    try {
      const response = await DepositService.getDeposit(queryParams);
      if (response.statusCode !== 200) {
        alert("Failed to get payment response");
      } else {
        alert("Payment successful");
      }
    } catch (error) {
      alert("Error getting payment response");
    }
  };

  console.log(location);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    fetchDepositPaymentResponse(queryParams);
  }, [location]);

  return <div><Typography>Deposit payment response</Typography></div>;
}

export default DepositPaymentResponsePage;
