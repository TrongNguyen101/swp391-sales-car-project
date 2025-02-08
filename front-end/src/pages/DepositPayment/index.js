import classNames from "classnames/bind";
import styles from "./DepositPayment.module.scss";
import { Typography } from "@mui/material";

const cx = classNames.bind(styles);

function DepositPaymentPage() {
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <Typography>Deposit Payment Page</Typography>
      </div>
    </div>
  );
}

export default DepositPaymentPage;
