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
import * as adminAccessoryServices from "../../../services/AdminAccessoryServices";
import { useUserData } from "../../../App";

function AccessoriesTable() {
  const { userData } = useUserData();

  // variable to navigate to another page
  const navigate = useNavigate();

  // State for the table
  const [rows, setRows] = useState([]);

  // Search state
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Delete accessory state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowSelectedTo, setRowSelectedTo] = useState(null);

  // Information dialog state
  const [openInformationDialog, setOpenInformationDialog] = useState(false);
  const [informationContent, setInformationContent] = useState(null);

  // Confirm restore dialog state
  const [openConfirmRestoreDialog, setOpenConfirmRestoreDialog] =
    useState(false);

  const [searchRows, setSearchRows] = useState([]);

  // Fetch data from server
  const fetchData = async () => {
    try {
      let response;
      if (userData.roleId === 1) {
        response = await adminAccessoryServices.adminGetAllAccessories();
      } else {
        response = await adminAccessoryServices.staffGetAllAccessories();
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoToAccessoryDetailPage = (row) => {
    navigate(`/dashboard/accessory-detail/${row.id}`);
  };

  const handleGoToEditAccessoryPage = (row) => {
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
        rowSelectedTo.id
      );
      if (response.statusCode === 200) {
        fetchData();
        setOpenInformationDialog(true);
        setInformationContent({
          type: "success",
          message: "Delete accessory successfully",
        });
      } else if (response.statusCode === 409) {
        fetchData();
        setOpenInformationDialog(true);
        setInformationContent({
          type: "error",
          message: "Item is deleted by another user",
        });
      } else {
        console.error("Failed to delete accessory:", response.message);
        setOpenInformationDialog(true);
        setInformationContent({
          type: "error",
          message: "Delete accessory failed",
        });
      }
    } catch (error) {
      console.error("catch error of deleting accessory:", error);
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

  const handleSearchChange = (event) => {
    const value = event.target.value;
    // Perform filtering immediately as the user types
    if (value.trim()) {
      const filteredAccessory = rows.filter((accessory) =>
        accessory.name?.toString().toLowerCase().includes(value.toLowerCase())
      );
      setSearchRows(filteredAccessory);
    } else {
      setSearchRows(rows); // If input is empty, show all rows
    }
  };

  // Close information dialog
  const handleCloseInformationDialog = () => {
    setOpenInformationDialog(false);
    setInformationContent(null);
  };

  const handleOpenConfirmRestoreDialog = (row) => {
    setOpenConfirmRestoreDialog(true);
    setRowSelectedTo(row);
  };

  const handleRestoreAccessory = async () => {
    try {
      const response = await adminAccessoryServices.adminRestoreAccessory(
        rowSelectedTo.id
      );
      if (response.statusCode === 200) {
        fetchData();
        setInformationContent({
          type: "success",
          message: "Restore accessory successfully",
        });
        setOpenInformationDialog(true);
      } else {
        console.error("Failed to restore staff:", response.message);
        setInformationContent({
          type: "error",
          message: "Restore accessory failed",
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
        Accessories Management
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
                            handleGoToEditAccessoryPage(row);
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
          <Button
            onClick={handleDeleteAccessory}
            variant="contained"
            color="primary"
          >
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
            {rowSelectedTo ? " " + rowSelectedTo.name : null}?
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
            onClick={handleRestoreAccessory}
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
export default AccessoriesTable;
