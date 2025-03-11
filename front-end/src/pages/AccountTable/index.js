import React, { useState } from "react";
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
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const initialRows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function AccountTablePage() {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
    setRows(rows.filter((row) => row.name !== rowToDelete.name));
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  const handleDeleteClickOpen = (row) => {
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.calories.toString().includes(searchQuery) ||
    row.fat.toString().includes(searchQuery) ||
    row.carbs.toString().includes(searchQuery) ||
    row.protein.toString().includes(searchQuery)
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", width: "91%", margin: "0 auto" }}>
        <TextField
          label="Search"
          variant="outlined"
          sx={{ width: 250 }}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search" sx={{ color: isSearchFocused ? 'primary.main' : 'inherit' }}>
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
          <TableHead sx={{ backgroundColor: 'primary.main', color: 'white'}}> 
            <TableRow>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'white' }}>Dessert (100g serving)</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'white' }} align="right">Calories</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'white' }} align="right">Fat&nbsp;(g)</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'white' }} align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'white' }} align="right">Protein&nbsp;(g)</TableCell>
              <TableCell sx={{ backgroundColor: 'primary.main', color: 'white' }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td": { border: 0 },
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => handleClickOpen(row)}
              >
                <TableCell align="left">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
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
                    aria-label="delete"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClickOpen(row);
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Row" : "Row Details"}</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              {editMode ? (
                <>
                  <TextField
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    defaultValue={selectedRow.name}
                  />
                  <TextField
                    margin="dense"
                    label="Calories"
                    type="number"
                    fullWidth
                    defaultValue={selectedRow.calories}
                  />
                  <TextField
                    margin="dense"
                    label="Fat"
                    type="number"
                    fullWidth
                    defaultValue={selectedRow.fat}
                  />
                  <TextField
                    margin="dense"
                    label="Carbs"
                    type="number"
                    fullWidth
                    defaultValue={selectedRow.carbs}
                  />
                  <TextField
                    margin="dense"
                    label="Protein"
                    type="number"
                    fullWidth
                    defaultValue={selectedRow.protein}
                  />
                </>
              ) : (
                <>
                  <DialogContentText>Name: {selectedRow.name}</DialogContentText>
                  <DialogContentText>
                    Calories: {selectedRow.calories}
                  </DialogContentText>
                  <DialogContentText>Fat: {selectedRow.fat}</DialogContentText>
                  <DialogContentText>
                    Carbs: {selectedRow.carbs}
                  </DialogContentText>
                  <DialogContentText>
                    Protein: {selectedRow.protein}
                  </DialogContentText>
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          ) : (
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        sx={{ textAlign: "center"}}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleDeleteDialogClose} variant="contained" color="error">
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