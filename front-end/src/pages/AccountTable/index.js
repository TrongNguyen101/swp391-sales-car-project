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
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as AdminServices from "../../services/AdminServices";
import * as SearchValidate from "../../validation/SearchValidation";
import * as UpdateDataValidate from "../../validation/UserUpdateValidation";
import * as DecodedPayload from "../../lib/DecodePayload";
import { useNavigate } from "react-router-dom";

function AccountTablePage() {
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
  const token = localStorage.getItem("Bearer");
  const decodedPayload = DecodedPayload.decodePayload(token);
  const navigate = useNavigate(); 

  if(decodedPayload === null) {
    navigate("/login");
  }else if(decodedPayload.role !== 1) {
    navigate("/");
  }

  const fetchData = async () => {
    try {
      const response = await AdminServices.getAllUsers();
      if (response.statusCode !== 200) {
        setRows([]);
      } else {
        setRows(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
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
      const response = await AdminServices.UpdateUser(
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

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "91%",
          margin: "0 auto",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
          <TextField
            label="Search email"
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
      </div>
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
                  width: "25%",
                }}
              >
                Fullname
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  width: "22%",
                }}
                align="left"
              >
                Email
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "primary.main", color: "white" }}
                align="left"
              >
                Phone
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "primary.main", color: "white" }}
                align="left"
                width="20%"
              >
                Address
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "primary.main", color: "white" }}
                align="left"
              >
                Created At
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
                <TableCell align="left" sx={{ width: "20%" }}>
                  {row.email}
                </TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.createdAt}</TableCell>
                <TableCell align="center">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            {editMode ? "Edit Row" : "Row Details"}
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
    </>
  );
}

export default AccountTablePage;
