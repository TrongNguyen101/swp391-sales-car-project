import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import styles from "./AdminManageAccessoryTransactions.module.scss";
import * as invoiceService from "../../services/InvoiceServices";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const AdminManageAccessoryTransactionsDetailPage = () => {
  const [itemRows, setitemRows] = useState([]);
  const [invoice, setInvoice] = useState({});
  const { invoiceId } = useParams();


  // Fetch data from server
  const fetchData = async () => {
    try {
      const response = await invoiceService.getInvoiceById(invoiceId);
      if (response.statusCode !== 200) {
        setInvoice({});
      } else {
        setInvoice(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch invoice:", error);
    }
  };

  const fectchInvoiceItemList = async () => {
    try {
      const response = await invoiceService.getInvoiceItemList(invoiceId);
      if (response.statusCode !== 200) {
        setitemRows([]);
      } else {
        setitemRows(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch invoice:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fectchInvoiceItemList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className={cx("conatiner")}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "500", paddingBottom: "20px" }}
      >
        Accessory Transaction Detail
      </Typography>

      {/* Detail information of invoice area */}
      <Box sx={{ padding: "5px", width: "450px", backgroundColor: "#f9f9f9", paddingBottom: "40px" }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "16px", fontWeight: 900 }}>
            Invoice ID:
          </Typography>

          <Typography
            sx={{ fontSize: "16px", fontWeight: 900 }}
          >
            {invoice.id}
          </Typography>

        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Customer Name:
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            {invoice.customerName}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Customer Email:
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            {invoice.email}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Customer Phone:
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            {invoice.phone}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Paying date:
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            {invoice.payDate}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Amount:
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            {invoice.totalAmount} VND
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Status:
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: 500, color: "green" }}>
            {invoice.status} 
          </Typography>
        </Box>
        
      </Box>

      <div className={cx("conatiner_table")}>
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            maxHeight: 400,
            overflow: "auto",
          }}
        >
          <Table aria-label="simple table" stickyHeader>
            <TableHead sx={{ backgroundColor: "primary.main", color: "white" }}>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "20%",
                    padding: "10px",
                  }}
                  align="left"
                >
                  Invoice ID
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "15%",
                    padding: "10px",
                  }}
                  align="left"
                >
                  Product name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "5%",
                    padding: "10px",
                  }}
                  align="center"
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "20%",
                    padding: "10px",
                  }}
                  align="center"
                >
                  Unit price
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "10%",
                    padding: "10px",
                  }}
                  align="center"
                >
                  Subtotal
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {itemRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td": { border: 0 },
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell
                    align="left"
                    sx={{ width: "20%", padding: "10px" }}
                  >
                    {row.invoiceId}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ width: "10%", padding: "10px" }}
                  >
                    {row.productName}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ width: "5%", padding: "10px" }}
                  >
                    {row.quantity}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ width: "20%", padding: "10px" }}
                  >
                    {row.unitPrice} VND
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ width: "10%", padding: "10px" }}
                  >
                    {row.subTotal} VND
                  </TableCell>


                  {/* Action for each row data ------------ */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminManageAccessoryTransactionsDetailPage;
