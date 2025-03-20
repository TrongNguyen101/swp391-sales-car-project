import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import styles from './ViewHistoryPayment.module.scss';
import * as invoiceService from "../../services/InvoiceServices";
import Sidebar from '../../components/SidebarUser';


const cx = classNames.bind(styles);

const ViewHistoryPaymentPage = () => {
    const [rows, setRows] = useState([]);

    // Fetch data from server
    const fetchData = async () => {
        try {
            const response = await invoiceService.adminGetAllInvoices();
            if (response.statusCode !== 200) {
                setRows([]);
            } else {
                setRows(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch invoice:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx('conatiner')}>
                <Sidebar />
                <div className={cx('conatiner_table')}>
                    <TableContainer
                        component={Paper}
                        sx={{
                            width: "100%",
                            margin: "0 auto",
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
                                            width: "15%",
                                        }}
                                        align="center"
                                    >
                                        Invoice ID
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "primary.main",
                                            color: "white",
                                            width: "2%",
                                        }}
                                        align="center"
                                    >
                                        Status
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "primary.main",
                                            color: "white",
                                            width: "10%",
                                        }}
                                        align="center"
                                    >
                                        Deposited amount
                                    </TableCell>
                                    <TableCell
                                        sx={{ backgroundColor: "primary.main", color: "white" }}
                                        align="center"
                                        width="10%"
                                    >
                                        Pay date
                                    </TableCell>
                                    <TableCell
                                        sx={{ backgroundColor: "primary.main", color: "white" }}
                                        align="center"
                                        width="40%"
                                    >
                                        Invoice information
                                    </TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            "&:last-child td": { border: 0 },
                                            cursor: "pointer",
                                            "&:hover": { backgroundColor: "#f5f5f5" },
                                        }}
                                    >
                                        <TableCell align="left" sx={{ width: "15%" }}>
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center" sx={{ width: "2%" }}>
                                            {row.status}
                                        </TableCell>
                                        <TableCell align="right" sx={{ width: "10%" }}>
                                            {row.totalAmount} VND
                                        </TableCell>
                                        <TableCell align="left" sx={{ width: "10%" }}>
                                            {row.payDate}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.invoiceInformation}
                                        </TableCell>

                                        {/* Action for each row data ------------ */}


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div >
    );
};

export default ViewHistoryPaymentPage;