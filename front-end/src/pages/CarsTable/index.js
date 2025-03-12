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
import { faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as adminCarServices from "../../services/AdminCarServices";

function CarsTable() {
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
      const response = await adminCarServices.adminGetAllCars();
      if (response.statusCode !== 200) {
        setRows([]);
      } else {
        console.log(response.data);
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

  const handleCreateNewClickOpen = () => {
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
        <Box display="flex" justifyContent="space-between" width="100%" gap={2}>
          <Button
            onClick={handleCreateNewClickOpen}
            color="warning"
            variant="contained"
          >
            Create new car
          </Button>
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
                    sx={{ color: isSearchFocused ? "primary.main" : "inherit" }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
                  width: "15%",
                }}
              >
                Model
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  width: "22%",
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
                onClick={() => handleClickOpen(row)}
              >
                <TableCell align="left" sx={{ width: "15%" }}>
                  {row.model}
                </TableCell>
                <TableCell align="right" sx={{ width: "20%" }}>
                  {row.priceBatteryRental}
                </TableCell>
                <TableCell align="right">{row.priceBatteryOwn}</TableCell>
                <TableCell align="right">{row.priceDeposite}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
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
      {/* Edit and detail dialog -----------------------------------------------------------------------------------------  */}
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
        {/* Form edit and show information */}
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
        {/* Button submit and cancel */}
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

      {/* Create new dialog ----------------------------------------------------------------------------------------- */}
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
        {/* Form edit and show information */}
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
        {/* Button submit and cancel */}
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
