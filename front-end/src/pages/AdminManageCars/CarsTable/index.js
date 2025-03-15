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
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as adminCarServices from "../../../services/AdminCarServices";

function CarsTable() {
  // variable to navigate to another page
  const navigate = useNavigate();

  // State for the table
  const [rows, setRows] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Delete car state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  // Add more car state
  const [selectedCar, setSelectedCar] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [openAddMoreCarDialog, setOpenAddMoreCarDialog] = useState(false);
  const [errorSelectedCarId, setErrorSelectedCarId] = useState(null);
  const [errorQuantity, setErrorQuantity] = useState(null);

  // Fetch data from server
  const fetchData = async () => {
    try {
      const response = await adminCarServices.adminGetAllCars();
      if (response.statusCode !== 200) {
        setRows([]);
      } else {
        console.log("all car:", response.data);
        setRows(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGoToDetailPage = (row) => {
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
      } else {
        console.error("Failed to add more car:", response.message);
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
    setSearchQuery(event.target.value);
  };

  // Delete car
  const handleDelete = async () => {
    try {
      const response = await adminCarServices.adminDeleteCar(rowToDelete.id);
      if (response.statusCode === 200) {
        fetchData();
      } else {
        console.error("Failed to delete car:", response.message);
      }
    } catch (error) {
      console.error("catch error of deleting car:", error);
    } finally {
      setDeleteDialogOpen(false);
      setRowToDelete(null);
    }
  };

  const handleDeleteDialogOpen = (row) => {
    setDeleteDialogOpen(true);
    setRowToDelete(row);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  // format the price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <>
      {/* Navigation ----------------------------------------------------------------------------------------------------------------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "91%",
          margin: "0 auto",
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
            label="Search car name"
            variant="outlined"
            sx={{ width: 300 }}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
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
      <TableContainer
        component={Paper}
        sx={{
          width: "91%",
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
            {rows.map((row) => (
              <TableRow
                key={row.Id}
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
                  {row.isShowed ? (
                    <FontAwesomeIcon icon={faEye} />
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            {rowToDelete ? " " + rowToDelete.model : null}?
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
    </>
  );
}
export default CarsTable;
