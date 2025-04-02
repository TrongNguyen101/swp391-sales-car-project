import React, { useEffect, useState } from "react";
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
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Typography,
  Box,
  DialogContentText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faRotateLeft,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as AdminServices from "../../services/AdminServices";
import * as SearchValidate from "../../validation/SearchValidation";
import * as UpdateDataValidate from "../../validation/UserUpdateValidation";
import { useNavigate } from "react-router-dom";

function AdminManageStaffPage() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [userId, setUserId] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  const [errorFullname, setErrorFullname] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [rowSelectedTo, setRowSelectedTo] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);

  const fetchData = async () => {
    try {
      const response = await AdminServices.getAllStaffs();
      if (response.statusCode !== 200) {
        setRows([]);
      } else {
        setRows(response.data);
        console.log("Data fetched successfully:", response.data);
      }
    } catch (error) {
      console.log("Failed to fetch users:", error);
    }
  };

  const fetchSearchData = async () => {
    try {
      const response = await AdminServices.findUserByEmail(searchQuery);
      if (response.statusCode !== 200) {
        setErrorSearch(response.message);
        setRows([]);
      } else {
        setRows([response.data]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchUpdateData = async () => {
    try {
      const response = await AdminServices.adminUpdateStaffInformation(
        userId,
        fullname,
        address,
        phone
      );
      if (response.statusCode !== 200) {
        console.error("Failed to update user:", response.message);
      } else {
        console.log("User updated successfully");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
    setEditMode(false);
  };

  const handleEditClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
    setEditMode(true);
    setUserId(row.userId);
    setFullname(row.userName);
    setPhone(row.phone);
    setAddress(row.address);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setEditMode(false);
    setErrorFullname("");
    setErrorPhone("");
  };

  const handleSave = async () => {
    const fullnameError = UpdateDataValidate.validateFullname(fullname);
    const phoneError = UpdateDataValidate.validatePhone(phone);
    if (fullnameError) {
      setErrorFullname(fullnameError);
      return;
    }
    if (phoneError) {
      setErrorPhone(phoneError);
      return;
    }
    if (!errorFullname && !errorPhone) {
      await fetchUpdateData();
      fetchData();
      setOpen(false);
      setSelectedRow(null);
      setEditMode(false);
      setErrorFullname("");
      setErrorPhone("");
      return;
    }
  };

  const handleSearch = () => {
    const searchValue = SearchValidate.SearchByEmailValidate(searchQuery);
    if (searchValue) {
      setErrorSearch(searchValue);
      return;
    } else {
      fetchSearchData();
    }
  };

  const handleOpenConfirmDeleteDialog = (row) => {
    setOpenDeleteDialog(true);
    setRowSelectedTo(row);
  };

  // Delete staff
  const handleDeleteStaff = async () => {
    try {
      const response = await AdminServices.adminDeleteStaff(
        rowSelectedTo.userId
      );
      if (response.statusCode === 200) {
        fetchData();
      } else {
        console.error("Failed to delete car:", response.message);
      }
    } catch (error) {
      console.error("catch error of deleting car:", error);
    } finally {
      setOpenDeleteDialog(false);
      setRowSelectedTo(null);
    }
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setRowSelectedTo(null);
  };

  const handleOpenConfirmRestoreDialog = (row) => {
    setOpenRestoreDialog(true);
    setRowSelectedTo(row);
  };

  const handleRestoreStaff = async () => {
    try {
      const response = await AdminServices.adminRestoreStaff(
        rowSelectedTo.userId
      );
      if (response.statusCode === 200) {
        fetchData();
      } else {
        console.error("Failed to restore staff:", response.message);
      }
    } catch (error) {
      console.error("catch error of restoring staff:", error);
    } finally {
      setOpenRestoreDialog(false);
      setRowSelectedTo(null);
    }
  };

  const handleCloseConfirmRestoreDialog = () => {
    setOpenRestoreDialog(false);
    setRowSelectedTo(null);
  };

  // Link to create new accessory page
  const handleGoToCreateNewaccessoryPage = () => {
    navigate("/dashboard/create-account-staff");
  };

  return (
    <Box sx={{ width: "100%", paddingBottom: "40px" }}>
      <Typography
        variant="h4"
        align="left"
        gutterBottom
        sx={{ fontWeight: "500", paddingBottom: "20px", paddingLeft: "45px" }}
      >
        Account Staff Management
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          margin: "0 auto",
          padding: "0 40px 10px 40px",
        }}
      >
        <Box display="flex" gap={2}>
          <Button
            onClick={handleGoToCreateNewaccessoryPage}
            color="primary"
            variant="contained"
          >
            Create new account for staff
          </Button>
        </Box>
        <TextField
          label="Search email or full name"
          variant="outlined"
          sx={{ width: 300 }}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            fetchData();
            setErrorSearch("");
          }}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                  onClick={handleSearch}
                  sx={{ color: isSearchFocused ? "primary.main" : "inherit" }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errorSearch && (
          <Typography sx={{ color: "red" }}>{errorSearch}</Typography>
        )}
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
                    width: "25%",
                  }}
                >
                  Full Name
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                  align="left"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "15%",
                  }}
                  align="left"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                  align="left"
                  width="5%"
                >
                  Role
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                  align="left"
                >
                  Created At
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.main", color: "white" }}
                  align="left"
                >
                  Last Updated At
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
                  key={row.id}
                  sx={{
                    "&:last-child td": { border: 0 },
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => handleClickOpen(row)}
                >
                  <TableCell align="left" sx={{ width: "20%" }}>
                    {row.userName}
                  </TableCell>
                  <TableCell align="left">
                    {row.isDeleted === "False" ? (
                      <Typography color="green" fontWeight={500}>
                        Active
                      </Typography>
                    ) : (
                      <Typography color="red" fontWeight={500}>
                        Inactive
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    {row.roleId === 3 && "Staff"}
                  </TableCell>
                  <TableCell align="left">{row.createdAt}</TableCell>
                  <TableCell align="left">{row.lastChange}</TableCell>
                  <TableCell align="center">
                    {/* Edit Button */}
                    {row.isDeleted === "False" ? (
                      <Box>
                        <IconButton
                          aria-label="edit"
                          color="success"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClickOpen(row);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenConfirmDeleteDialog(row);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                      </Box>
                    ) : (
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
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          textAlign: "center",
        }}
      >
        <DialogTitle>
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: "600",
              lineHeight: "1.5",
              color: "primary.main",
            }}
          >
            {editMode ? "Edit Staff Information" : "Details of Staff"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              {editMode ? (
                <>
                  <TextField
                    margin="dense"
                    label="User ID"
                    type="text"
                    fullWidth
                    disabled
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    disabled
                    defaultValue={selectedRow.email}
                  />
                  <TextField
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    value={fullname}
                    onChange={(e) => {
                      setErrorFullname("");
                      setFullname(e.target.value);
                    }}
                  />
                  {errorFullname && (
                    <Typography sx={{ color: "red", textAlign: "start" }}>
                      {errorFullname}
                    </Typography>
                  )}
                  <TextField
                    margin="dense"
                    label="Phone"
                    type="text"
                    fullWidth
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrorPhone("");
                    }}
                  />
                  {errorPhone && (
                    <Typography sx={{ color: "red", textAlign: "start" }}>
                      {errorPhone}
                    </Typography>
                  )}

                  <TextField
                    margin="dense"
                    label="Address"
                    type="text"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    label="Created At"
                    type="text"
                    fullWidth
                    disabled
                    defaultValue={selectedRow.createdAt}
                  />
                </>
              ) : (
                <>
                  <TextField
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    disabled
                    defaultValue={selectedRow.userName}
                  />
                  <TextField
                    margin="dense"
                    label="Phone"
                    type="text"
                    fullWidth
                    disabled
                    defaultValue={selectedRow.phone}
                  />
                  <TextField
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    disabled
                    defaultValue={selectedRow.email}
                  />
                  <TextField
                    margin="dense"
                    label="Address"
                    type="text"
                    fullWidth
                    disabled
                    defaultValue={selectedRow.address}
                  />
                  <TextField
                    margin="dense"
                    label="Created At"
                    type="text"
                    fullWidth
                    disabled
                    defaultValue={selectedRow.createdAt}
                  />
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <Box display="flex" justifyContent="center" width="100%" gap={2}>
              <Button onClick={handleSave} color="primary" variant="contained">
                Save
              </Button>
              <Button onClick={handleClose} color="error" variant="contained">
                Cancel
              </Button>
            </Box>
          ) : (
            <Button onClick={handleClose} color="primary" variant="contained">
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Confirm Delete dialog ----------------------------------------------------------------------------------------- */}
      <Dialog open={openDeleteDialog} sx={{ textAlign: "center" }}>
        <DialogTitle color="error">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete
            {rowSelectedTo ? " " + rowSelectedTo.userName : null}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button
            onClick={handleCloseConfirmDeleteDialog}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteStaff}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Restore dialog ----------------------------------------------------------------------------------------- */}
      <Dialog open={openRestoreDialog} sx={{ textAlign: "center" }}>
        <DialogTitle color="error">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to restore
            {rowSelectedTo ? " " + rowSelectedTo.userName : null}?
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
            onClick={handleRestoreStaff}
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

export default AdminManageStaffPage;
