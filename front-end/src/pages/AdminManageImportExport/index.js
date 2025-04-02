import { useEffect, useState } from "react";

import * as adminImportExportServices from "../../services/AdminImportExportServices";
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function AdminManageImportExportPage() {
  const [rows, setRows] = useState([]);
  const [searchRows, setSearchRows] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Fetch data from server
  const fetchData = async () => {
    try {
      const response =
        await adminImportExportServices.adminGetAllImportExportHistories();
      if (response.statusCode !== 200) {
        setRows([]);
      } else {
        console.log("all history:", response.data);
        setRows(response.data);
        setSearchRows(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;

    // Perform filtering immediately as the user types
    if (value.trim()) {
      const filteredAccessory = rows.filter(
        (history) =>
          history.productName
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          history.transactionDate?.toLowerCase().includes(value.toLowerCase())
      );
      setSearchRows(filteredAccessory);
    } else {
      setSearchRows(rows); // If input is empty, show all rows
    }
  };

  return (
    <Box sx={{ width: "100%", paddingBottom: "40px" }}>
      <Typography
        variant="h4"
        align="left"
        gutterBottom
        sx={{ fontWeight: "500", paddingBottom: "20px", paddingLeft: "45px" }}
      >
        Import export history
      </Typography>
      {/* Navigation ----------------------------------------------------------------------------------------------------------------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          padding: "0 40px 10px 40px",
        }}
      >
        <Box display="flex" justifyContent="space-between" width="100%" gap={2}>
          <TextField
            type="text"
            label="Search product name or transaction date"
            variant="outlined"
            sx={{ width: 390 }}
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
      </div>

      {/* Table show list product---------------------------------------------------------------------------------------------------- */}
      <Box sx={{ width: "100%", padding: "0 40px" }}>
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
                  }}
                >
                  Product Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "2%",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "15%",
                  }}
                  align="right"
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                  align="center"
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                  align="left"
                  width="20%"
                >
                  Note
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchRows.map((row) => (
                <TableRow
                  key={row.Id}
                  sx={{
                    "&:last-child td": { border: 0 },
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell align="left" sx={{ width: "20%" }}>
                    {row.productName}
                  </TableCell>
                  <TableCell align="center" sx={{ width: "2%" }}>
                    {row.type}
                  </TableCell>
                  {/* <TableCell align="right" sx={{ width: "15%" }}>
                                    {row.price}
                                </TableCell> */}
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="center">{row.transactionDate}</TableCell>
                  <TableCell align="left">{row.note}</TableCell>

                  {/* Action for each row data ------------ */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AdminManageImportExportPage;
