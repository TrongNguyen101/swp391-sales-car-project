import { Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as DepositService from "../../services/DepositService";
import classNames from "classnames/bind";
import styles from "./PaymentResponse.module.scss";

const cx = classNames.bind(styles);

function DepositPaymentResponsePage() {
  const location = useLocation();
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState();

  const ToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToHome = () => {
    navigate("/");
  };
  const handleToOrderInfor = () => {
    navigate("/deposit-transaction-history");
  };


  //fetch payment response and call to create invoice
  const fetchDepositPaymentResponse = async (queryParams) => {
    try {
      const invoiceData = {
        queryParams,
        customerName: localStorage.getItem("customerName"),
        phone: localStorage.getItem("phone"),
        email: localStorage.getItem("email"),
        address: localStorage.getItem("address"),
        typeofProduct: localStorage.getItem("typeofProduct"),
      }
      //call API to get status of payment response
      const response = await DepositService.createInvoice(invoiceData);
      if (response.statusCode !== 200) {
        setMessage("Seems there was an issue or incomplete payment. Don’t worry! We’ll contact you soon. For support, call 1900 23 23 89.");
      } else {
        setInvoiceStatus(response.data.isPaid);
        setMessage("Congratulations! Your payment is successful. We’ll contact you soon to complete the process. For support, call 1900 23 23 89.");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    ToTop();
    const queryParams = new URLSearchParams(location.search);
    if (!hasFetched.current) {
      fetchDepositPaymentResponse(queryParams);
      hasFetched.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("image-check")}>
          {invoiceStatus ? (
            <img src="green-check-in.png" alt="Success" />
          ) : (
            <img src="error-icon.png" alt="Fail" />
          )}
        </div>
        <div className={cx("description")}>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            {message}
          </Typography>
        </div>
        <div className={cx("action-btn")}>
          <Button variant="contained" onClick={handleToHome}>Home</Button>
          <Button variant="outlined" sx={{ margin: "20px" }} onClick={handleToOrderInfor}>Order Information</Button>

        </div>
      </div>
    </div>
  );
}

export default DepositPaymentResponsePage;
