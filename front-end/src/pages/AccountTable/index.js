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
  DialogContentText,
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

function AccountTablePage() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setEditMode(false);
  };

  const handleSave = () => {
    // Implement save logic here
    handleClose();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = () => {
    setRows(rows.filter((row) => row.id !== rowToDelete.id));
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
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
        <TextField
          label="Search email"
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
                  sx={{ color: isSearchFocused ? "primary.main" : "inherit" }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
                    defaultValue={selectedRow.userId}
                  />
                  <TextField
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    defaultValue={selectedRow.userName}
                  />
                  <TextField
                    margin="dense"
                    label="Phone"
                    type="text"
                    fullWidth
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
                  <TextField
                    margin="dense"
                    label="Deleted"
                    type="text"
                    fullWidth
                    disabled
                    defaultValue={selectedRow.isDeleted}
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
                  <TextField
                    margin="dense"
                    label="Deleted"
                    type="text"
                    fullWidth
                    disabled
                    defaultValue={selectedRow.isDeleted}
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
              <Button onClick={handleSave} color="error" variant="contained">
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

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        sx={{ textAlign: "center" }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row?
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

export default AccountTablePage;
