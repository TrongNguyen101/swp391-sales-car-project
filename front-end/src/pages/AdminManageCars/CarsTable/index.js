import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faEyeSlash,
  faRotateLeft,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as adminCarServices from "../../../services/AdminCarServices";
import { useUserData } from "../../../App";

function CarsTable() {
  const { userData } = useUserData();

  // variable to navigate to another page
  const navigate = useNavigate();

  // State for the table
  const [rows, setRows] = useState([]);
  const [searchRows, setSearchRows] = useState([]);

  // Search state
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Delete car state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowSelectedTo, setRowSelectedTo] = useState(null);

  // Add more car state
  const [selectedCar, setSelectedCar] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [openAddMoreCarDialog, setOpenAddMoreCarDialog] = useState(false);
  const [errorSelectedCarId, setErrorSelectedCarId] = useState(null);
  const [errorQuantity, setErrorQuantity] = useState(null);

  // State for information dialog
  const [openInformationDialog, setOpenInformationDialog] = useState(false);
  const [informationContent, setInformationContent] = useState(null);

  // State for restore dialog
  const [openConfirmRestoreDialog, setOpenConfirmRestoreDialog] =
    useState(false);

  // Fetch data from server
  const fetchData = async () => {
    try {
      let response;
      if (userData.roleId === 1) {
        response = await adminCarServices.adminGetAllCars();
      } else {
        response = await adminCarServices.staffGetAllCars();
      }
      if (response.statusCode === 200) {
        setRows(response.data);
        setSearchRows(response.data);
      } else {
        setRows([]);
        setSearchRows([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoToDetailPage = (row) => {
    console.log("row: ", row.id);
    navigate(`/dashboard/detail-car/${row.id}`);
  };

  const handleGoToEditCarPage = (row) => {
    navigate(`/dashboard/edit-car/${row.id}`);
  };

  // Link to create new car page
  const handleGoToCreateNewCarPage = () => {
    navigate("/dashboard/create-new-car");
  };

  // Add more car button
  const handleAddMoreCarClickOpen = () => {
    setOpenAddMoreCarDialog(true);
  };
  const handleAddCarDialogClose = () => {
    setOpenAddMoreCarDialog(false);
  };

  // Add more car function
  const fetchAddMoreCar = async (car, quantity) => {
    try {
      const carId = car.id;
      const response = await adminCarServices.adminAddMoreCar({
        carId,
        quantity,
      });
      if (response.statusCode === 200) {
        fetchData();
        setOpenAddMoreCarDialog(false);
        setSelectedCar("");
        setQuantity(0);
        console.log("Add more car successfully:", response);
      } else {
        console.error("Failed to add more car:", response);
      }
    } catch (error) {
      console.error("Failed to add more car:", error);
    }
  };
  // Add more car button
  const handleAddMoreCar = async () => {
    const car = rows.find((car) => car.model === selectedCar);
    if (!car) {
      setErrorSelectedCarId("Please select a car");
    }
    if (quantity <= 0) {
      setErrorQuantity("Quantity must be greater than 0");
    }
    if (car && quantity > 0) {
      fetchAddMoreCar(car, quantity);
    }
  };

  //------------------------------------------------------------------------------------------------------------

  const handleSearchChange = (event) => {
    const value = event.target.value;

    // Perform filtering immediately as the user types
    if (value.trim()) {
      const filteredAccessory = rows.filter((car) =>
        car.model?.toString().toLowerCase().includes(value.toLowerCase())
      );
      setSearchRows(filteredAccessory);
    } else {
      setSearchRows(rows); // If input is empty, show all rows
    }
  };

  // Delete car
  const handleDelete = async () => {
    try {
      const response = await adminCarServices.adminDeleteCar(rowSelectedTo.id);
      if (response.statusCode === 200) {
        fetchData();
        setOpenInformationDialog(true);
        setInformationContent({
          type: "success",
          message: "Delete car successfully",
        });
      } else if (response.statusCode === 409) {
        fetchData();
        setOpenInformationDialog(true);
        setInformationContent({
          type: "error",
          message: "Car is deleted by another user",
        });
      } else {
        console.error("Failed to delete car:", response.message);
        setOpenInformationDialog(true);
        setInformationContent({
          type: "error",
          message: "Delete car failed",
        });
      }
    } catch (error) {
      console.error("catch error of deleting car:", error);
      setOpenInformationDialog(true);
      setInformationContent({
        type: "error",
        message: "Internal server error. Please try again later.",
      });
    } finally {
      setDeleteDialogOpen(false);
      setRowSelectedTo(null);
    }
  };

  const handleDeleteDialogOpen = (row) => {
    setDeleteDialogOpen(true);
    setRowSelectedTo(row);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setRowSelectedTo(null);
  };

  const handleCloseInformationDialog = () => {
    setOpenInformationDialog(false);
    setInformationContent(null);
  };

  const handleOpenConfirmRestoreDialog = (row) => {
    setOpenConfirmRestoreDialog(true);
    setRowSelectedTo(row);
  };

  const handleRestoreCar = async () => {
    try {
      const response = await adminCarServices.adminRestoreCar(rowSelectedTo.id);
      if (response.statusCode === 200) {
        fetchData();
        setInformationContent({
          type: "success",
          message: "Restore car successfully",
        });
        setOpenInformationDialog(true);
      } else {
        console.error("Failed to restore staff:", response.message);
        setInformationContent({
          type: "error",
          message: "Restore car failed",
        });
        setOpenInformationDialog(true);
      }
    } catch (error) {
      console.error("catch error of restoring staff:", error);
      setOpenInformationDialog(true);
      setInformationContent({
        type: "error",
        message: "Internal server error. Please try again later.",
      });
    } finally {
      setOpenConfirmRestoreDialog(false);
      setRowSelectedTo(null);
    }
  };

  const handleCloseConfirmRestoreDialog = () => {
    setOpenConfirmRestoreDialog(false);
    setRowSelectedTo(null);
  };

  // format the price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <Box sx={{ width: "100%", paddingBottom: "40px" }}>
      <Typography
        variant="h4"
        align="left"
        gutterBottom
        sx={{ fontWeight: "500", paddingBottom: "20px", paddingLeft: "45px" }}
      >
        Cars Management
      </Typography>
      {/* Navigation ----------------------------------------------------------------------------------------------------------------- */}
      <Box
        style={{
          width: "100%",
          padding: "0 40px 10px 40px",
        }}
      >
        <Box display="flex" justifyContent="space-between" width="100%" gap={2}>
          <Box display="flex" gap={2}>
            <Button
              onClick={handleGoToCreateNewCarPage}
              color="primary"
              variant="contained"
            >
              Create new car
            </Button>
            <Button
              onClick={handleAddMoreCarClickOpen}
              color="warning"
              variant="contained"
            >
              Add Car
            </Button>
          </Box>
          <TextField
            type="text"
            label="Search Car name"
            variant="outlined"
            sx={{ width: 300 }}
            // value={searchValue}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={handleSearchChange}
            // onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search"
                    sx={{
                      color: isSearchFocused ? "primary.main" : "inherit",
                    }}
                    //onClick={handleSearch}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Table show list product---------------------------------------------------------------------------------------------------- */}
      <Box sx={{ width: "100%", padding: "0 40px" }}>
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
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
                >
                  Model
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "2%",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "15%",
                  }}
                  align="right"
                >
                  Price battery rental
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                  align="right"
                >
                  Price battery own
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                  align="right"
                  width="20%"
                >
                  Price deposite
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                  align="right"
                >
                  Quantity
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
                  onClick={() => handleGoToDetailPage(row)}
                >
                  <TableCell align="left" sx={{ width: "15%" }}>
                    {row.model}
                  </TableCell>
                  <TableCell align="center" sx={{ width: "2%" }}>
                    {row.isDeleted ? (
                      <Typography color="error">Deleted</Typography>
                    ) : row.isShowed ? (
                      <FontAwesomeIcon color="green" icon={faEye} />
                    ) : (
                      <FontAwesomeIcon color="red" icon={faEyeSlash} />
                    )}
                  </TableCell>
                  <TableCell align="right" sx={{ width: "15%" }}>
                    {formatPrice(row.priceBatteryRental)}
                  </TableCell>
                  <TableCell align="right">
                    {formatPrice(row.priceBatteryOwn)}
                  </TableCell>
                  <TableCell align="right">
                    {formatPrice(row.priceDeposite)}
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>

                  {/* Action for each row data ------------ */}

                  <TableCell align="center">
                    {/* Edit Button */}
                    {row.isDeleted ? (
                      userData.roleId === 1 ? (
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenConfirmRestoreDialog(row);
                          }}
                        >
                          <FontAwesomeIcon icon={faRotateLeft} />
                        </IconButton>
                      ) : (
                        <Typography color="error">Deleted</Typography>
                      )
                    ) : (
                      <Box>
                        <IconButton
                          aria-label="edit"
                          color="success"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGoToEditCarPage(row);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDialogOpen(row);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
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

      {/* Add more Car dialog ----------------------------------------------------------------------------------------- */}
      <Dialog open={openAddMoreCarDialog}>
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
            Add more car
          </Typography>
        </DialogTitle>
        {/* Form add information */}
        <DialogContent>
          <FormControl variant="outlined" sx={{ width: 300, marginTop: "5px" }}>
            {/* Car Selection */}
            <InputLabel id="car-select-label">Select Car</InputLabel>
            <Select
              labelId="car-select-label"
              value={selectedCar}
              onChange={(e) => {
                setSelectedCar(e.target.value);
                setErrorSelectedCarId("");
              }}
              label="Select Car"
            >
              {rows.map((car) => (
                <MenuItem key={car.id} value={car.model}>
                  {car.model}
                </MenuItem>
              ))}
            </Select>
            {errorSelectedCarId && (
              <Typography sx={{ color: "red" }}>
                {errorSelectedCarId}
              </Typography>
            )}
            {/* Quantity Input */}
            <TextField
              margin="dense"
              label="Quantity"
              type="number"
              fullWidth
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setErrorQuantity("");
              }}
              sx={{ marginTop: "20px" }}
            />
            {errorQuantity && (
              <Typography sx={{ color: "red" }}>{errorQuantity}</Typography>
            )}
          </FormControl>
        </DialogContent>

        {/* Button submit and cancel */}
        <DialogActions>
          <Box display="flex" justifyContent="center" width="100%" gap={2}>
            <Button
              onClick={handleAddMoreCar}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
            <Button
              onClick={handleAddCarDialogClose}
              color="error"
              variant="contained"
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* Delete dialog ----------------------------------------------------------------------------------------- */}
      <Dialog open={deleteDialogOpen} sx={{ textAlign: "center" }}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete
            {rowSelectedTo ? " " + rowSelectedTo.model : null}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleDeleteDialogClose}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Show information dialog */}
      <Dialog
        open={openInformationDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "540px", height: "180px" } }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {informationContent && (
            <Typography
              color={informationContent.type === "error" ? "error" : "success"}
              sx={{ fontWeight: 500, fontSize: "30px" }}
            >
              {informationContent.message}
            </Typography>
          )}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", marginBottom: "15px" }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleCloseInformationDialog}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Restore dialog ----------------------------------------------------------------------------------------- */}
      <Dialog open={openConfirmRestoreDialog} sx={{ textAlign: "center" }}>
        <DialogTitle color="primary">Confirm Restore Car</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to restore
            {rowSelectedTo ? " " + rowSelectedTo.model : null}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button
            onClick={handleCloseConfirmRestoreDialog}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRestoreCar}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default CarsTable;
