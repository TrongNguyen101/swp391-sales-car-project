import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Box, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

import styles from './ViewHistoryPayment.module.scss';
import * as invoiceService from "../../services/InvoiceServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const cx = classNames.bind(styles);

const ViewHistoryPaymentPage = () => {
    const [allRows, setAllRows] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchRows, setSearchRows] = useState([]);

    // Fetch data from server
    const fetchData = async () => {
        try {
            const response = await invoiceService.userGetAllTransactions();
            if (response.statusCode !== 200) {
                setSearchRows([]);
            } else {
                setAllRows(response.data);
                setSearchRows(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch invoice:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;

        // Perform filtering immediately as the user types
        if (value.trim()) {
            const filteredAccessory = allRows.filter(
                (invoice) =>
                    invoice.id?.toString().toLowerCase().includes(value.toLowerCase()) ||
                    invoice.payDate?.toLowerCase().includes(value.toLowerCase())
            );
            setSearchRows(filteredAccessory);
        } else {
            setSearchRows(allRows); // If input is empty, show all rows
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("conatiner")}>
                <Box>
                    {/* Search transaction */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        paddingBottom="10px"
                        paddingLeft="30px"
                    >
                        <TextField
                            type="text"
                            label="Search date or invoice ID"
                            variant="outlined"
                            sx={{ width: 300 }}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            onChange={handleSearchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="search"
                                            sx={{
                                                color: isSearchFocused ? "primary.main" : "inherit",
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <div className={cx("conatiner_table")}>
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
                                            align="left"
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
                                            Amount
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
                                            align="left"
                                            width="20%"
                                        >
                                            Invoice information
                                        </TableCell>


                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchRows.map((row) => (
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
                                            <TableCell align="center" sx={{ width: "10%" }}>
                                                {row.totalAmount} VND
                                            </TableCell>
                                            <TableCell align="center" sx={{ width: "10%" }}>
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
                </Box>
            </div>
        </div >
    );
};

export default ViewHistoryPaymentPage;