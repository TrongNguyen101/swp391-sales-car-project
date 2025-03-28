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
  Box
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faEyeSlash,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as adminAccessoryServices from "../../../services/AdminAccessoryServices";

function AccessoriesTable() {
  // variable to navigate to another page
  const navigate = useNavigate();

  // State for the table
  const [rows, setRows] = useState([]);

  // Search state
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Delete accessory state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const [searchRows, setSearchRows] = useState([]);

  // Fetch data from server
  const fetchData = async () => {
    try {
      const response = await adminAccessoryServices.adminGetAllAccessories();
      if (response.statusCode !== 200) {
        setRows([]);
      } else {
        console.log("all accessories:", response.data);
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

  const handleGoToAccessoryDetailPage = (row) => {
    navigate(`/dashboard/accessory-detail/${row.id}`);
  };

  const handleGoToEditaccessoryPage = (row) => {
    navigate(`/dashboard/edit-accessory/${row.id}`);
  };

  // Link to create new accessory page
  const handleGoToCreateNewaccessoryPage = () => {
    navigate("/dashboard/create-new-accessory");
  };


  // Delete accessory
  const handleDeleteAccessory = async () => {
    try {
      const response = await adminAccessoryServices.adminDeleteAccessory(
        rowToDelete.id
      );
      if (response.statusCode === 200) {
        fetchData();
        setDeleteDialogOpen(true);
      } else {
        console.error("Failed to delete accessory:", response.message);
      }
    } catch (error) {
      console.error("catch error of deleting accessory:", error);
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

  const handleSearchChange = (event) => {
    const value = event.target.value;
    // Perform filtering immediately as the user types
    if (value.trim()) {
      const filteredAccessory = rows.filter(
        (accessory) =>
          accessory.name?.toString().toLowerCase().includes(value.toLowerCase())
      );
      setSearchRows(filteredAccessory);
    } else {
      setSearchRows(rows); // If input is empty, show all rows
    }
  };

  // format the price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <>
      <Typography
        variant="h4"
        align="left"
        gutterBottom
        sx={{ fontWeight: "500", paddingBottom: "20px", paddingLeft: "45px" }}
      >
        Accessories Management
      </Typography>
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
              onClick={handleGoToCreateNewaccessoryPage}
              color="primary"
              variant="contained"
            >
              Create new accessory
            </Button>
          </Box>
          <TextField
            type="text"
            label="Search accessory name"
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
          marginTop: "10px",
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
                Name
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
                align="center"
              >
                Price
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "primary.main", color: "white" }}
                align="center"
              >
                Material
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "primary.main", color: "white" }}
                align="center"
                width="20%"
              >
                Origin
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
                key={row.Id}
                sx={{
                  "&:last-child td": { border: 0 },
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => handleGoToAccessoryDetailPage(row)}
              >
                <TableCell align="left" sx={{ width: "20%" }}>
                  {row.name}
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
                  {formatPrice(row.price)}
                </TableCell>
                <TableCell align="center">{row.material}</TableCell>
                <TableCell align="center">{row.origin}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>

                {/* Action for each row data ------------ */}

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
                          handleGoToEditaccessoryPage(row);
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
          <Button
            onClick={handleDeleteAccessory}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default AccessoriesTable;
