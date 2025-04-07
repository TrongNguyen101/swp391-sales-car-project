import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";

import * as testDriveRegisterService from "../../services/TestDriveRegistrationService";
import * as carServices from "../../services/CarService";

const AdminManageTestDrivenPage = () => {
  const [allRows, setAllRows] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchRows, setSearchRows] = useState([]);
  const [listCar, setListCar] = useState([]);

  // state for update status test drive register dialog
  const [openUpdateStatusDialog, setOpenUpdateStatusDialog] = useState(false);
  const [errorSelectedStatus, setErrorSelectedStatus] = useState("");
  const [rowUpdateStatus, setRowUpdateStatus] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [errorSelectedCar, setErrorSelectedCar] = useState("");

  // state for dialog information
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch data from server
  const fetchData = async () => {
    try {
      const response =
        await testDriveRegisterService.adminGetAllTestDriveRegistration();
      if (response.statusCode !== 200) {
        setAllRows([]);
        setSearchRows([]);
      } else {
        setAllRows(response.data);
        setSearchRows(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch invoice:", error);
    }
  };

  const fetchCarData = async () => {
    try {
      const response = await carServices.getCar();
      if (response.statusCode !== 200) {
        setListCar([]);
      } else {
        setListCar(JSON.parse(response.data));
        console.log("all car:", JSON.parse(response.data));
      }
    } catch (error) {
      setListCar([]);
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
      const filteredAccessory = allRows.filter(
        (invoice) =>
          invoice.id?.toString().toLowerCase().includes(value.toLowerCase()) ||
          invoice.email?.toLowerCase().includes(value.toLowerCase())
      );
      setSearchRows(filteredAccessory);
    } else {
      setSearchRows(allRows); // If input is empty, show all rows
    }
  };

  const handleShowUpdateStatusDialog = (row) => {
    fetchCarData();
    setOpenUpdateStatusDialog(true); // Open dialog
    setRowUpdateStatus(row); // Set the row to update status
    setSelectedStatus(row.status); // Set the status
    console.log("row:", row);
    setSelectedCar(row.carName);
    console.log("selectedCar:", row.carName);
  };

  const handleUpdateStatus = async () => {
    if (!selectedStatus) {
      // Check if the status is empty
      setErrorSelectedStatus("Please select a status"); // Set error message
      return; // Exit the function
    }
    if (!selectedCar) {
      setErrorSelectedCar("Please select a car");
      return;
    }
    const testRegisterData = {
      Status: selectedStatus,
      CarName: selectedCar,
    };
    const response =
      await testDriveRegisterService.adminUpdateStatusTestDriveRegistration(
        rowUpdateStatus.id,
        testRegisterData
      );
    if (response.statusCode !== 200) {
      console.error("Failed to update status:", response);
      return;
    } else {
      setOpenUpdateStatusDialog(false);
      fetchData();
      setOpenDialog(true);
      setMessage("Update status successfully");
    }
  };

  const handleCloseUpdateStatusDialog = () => {
    setOpenUpdateStatusDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ width: "100%", paddingBottom: "40px" }}>
      <Typography
        variant="h4"
        align="left"
        gutterBottom
        sx={{ fontWeight: "500", paddingBottom: "20px", paddingLeft: "45px" }}
      >
        Test Drive Registration
      </Typography>

      {/* Search transaction */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          width: "100%",
          padding: "0 40px 10px 40px",
        }}
      >
        <TextField
          type="text"
          label="Search email"
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
                    width: "8%",
                    paddingLeft: "10px",
                  }}
                  align="center"
                >
                  Test ID
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "15%",
                    padding: "10px",
                  }}
                  align="center"
                >
                  Full name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    padding: "10px",
                  }}
                  align="center"
                  width="10%"
                >
                  Car Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "15%",
                    padding: "10px",
                  }}
                  align="center"
                >
                  Email
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
                  Phone
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "2%",
                    padding: "10px",
                  }}
                  align="center"
                >
                  Status
                </TableCell>

                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    padding: "10px",
                  }}
                  align="center"
                  width="20%"
                >
                  Description
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                  align="center"
                >
                  Action
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
                  <TableCell align="left" sx={{ width: "5%", padding: "10px" }}>
                    {row.id}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ width: "10%", padding: "10px" }}
                  >
                    {row.fullName}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ width: "10%", padding: "10px" }}
                  >
                    {row.carName}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ width: "10%", padding: "10px" }}
                  >
                    {row.email}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ width: "2%", padding: "10px" }}
                  >
                    {row.phone}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ width: "10%", padding: "10px" }}
                  >
                    {row.status === "Pending" ? (
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "500",
                          backgroundColor: "warning.light",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {row.status}
                      </Typography>
                    ) : row.status === "Accepted" ? (
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "500",
                          backgroundColor: "success.light",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {row.status}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "500",
                          backgroundColor: "error.light",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {row.status}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ width: "10%", padding: "10px" }}
                  >
                    {row.description}
                  </TableCell>
                  <TableCell align="center">
                    {/* Edit Button */}
                    {row.isDeleted ? (
                      <Typography color="error">Deleted</Typography>
                    ) : (
                      <Box>
                        <IconButton
                          aria-label="edit"
                          color="success"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowUpdateStatusDialog(row);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </IconButton>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog for updata status test drive */}
      <Dialog open={openUpdateStatusDialog}>
        <DialogTitle>
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: "600",
              lineHeight: "1.5",
              color: "primary.main",
              textAlign: "center",
            }}
          >
            Update Test Drive Status
          </Typography>
        </DialogTitle>
        <DialogTitle>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: "300",
              lineHeight: "1.5",
              textAlign: "left",
            }}
          >
            Customer name: {rowUpdateStatus.fullName}
          </Typography>
        </DialogTitle>
        {/* Form add information */}
        <DialogContent
          sx={{
            width: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl
            variant="outlined"
            sx={{ width: 400, marginTop: "10px" }}
          >
            {/* Car Selection */}
            <InputLabel id="car-select-label">Select Car</InputLabel>
            <Select
              labelId="car-select-label"
              label="Select Car"
              value={selectedCar}
              onChange={(e) => {
                setSelectedCar(e.target.value);
                setErrorSelectedCar("");
              }}
            >
              {listCar.map((car) => (
                <MenuItem key={car.Id} value={car.Name}>
                  {car.Name}
                </MenuItem>
              ))}
            </Select>
            {errorSelectedCar && (
              <Typography sx={{ color: "red" }}>{errorSelectedCar}</Typography>
            )}
          </FormControl>

          <FormControl
            variant="outlined"
            sx={{ width: 400, marginTop: "10px" }}
          >
            {/* Select status */}
            <InputLabel id="status-select-label">Select Status</InputLabel>
            <Select
              labelId="status-select-label"
              label="Select Status"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setErrorSelectedStatus("");
              }}
            >
              <MenuItem key={1} value="Pending">
                Pending
              </MenuItem>
              <MenuItem key={1} value="Accepted">
                Accepted
              </MenuItem>
              <MenuItem key={1} value="Rejected">
                Rejected
              </MenuItem>
            </Select>
            {errorSelectedStatus && (
              <Typography sx={{ color: "red" }}>
                {errorSelectedStatus}
              </Typography>
            )}
          </FormControl>
        </DialogContent>

        {/* Button submit and cancel */}
        <DialogActions>
          <Box display="flex" justifyContent="center" width="100%" gap={2}>
            <Button
              onClick={handleUpdateStatus}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
            <Button
              onClick={handleCloseUpdateStatusDialog}
              color="error"
              variant="contained"
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Show update test drive update successful dialog */}
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "440px", height: "140px" } }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: "500",
            lineHeight: "1.5",
          }}
        >
          {message}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminManageTestDrivenPage;
