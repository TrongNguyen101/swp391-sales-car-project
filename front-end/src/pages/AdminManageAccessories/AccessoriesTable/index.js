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
import * as adminAccessoryServices from "../../../services/AdminAccessoryServices";

function AccessoriesTable() {
  // variable to navigate to another page
  const navigate = useNavigate();

  // State for the table
  const [rows, setRows] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Delete accessory state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  // Add more accessory state
  const [selectedaccessory, setSelectedaccessory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [openAddMoreaccessoryDialog, setOpenAddMoreaccessoryDialog] =
    useState(false);
  const [errorSelectedaccessoryId, setErrorSelectedaccessoryId] =
    useState(null);
  const [errorQuantity, setErrorQuantity] = useState(null);

  // Fetch data from server
  const fetchData = async () => {
    try {
      const response = await adminAccessoryServices.adminGetAllAccessories();
      if (response.statusCode !== 200) {
        setRows([]);
      } else {
        console.log("all accessories:", response.data);
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
    navigate(`/dashboard/detail-accessory/${row.id}`);
  };

  const handleGoToEditaccessoryPage = (row) => {
    navigate(`/dashboard/edit-accessory/${row.id}`);
  };

  // Link to create new accessory page
  const handleGoToCreateNewaccessoryPage = () => {
    navigate("/dashboard/create-new-accessory");
  };

  // Add more accessory button
  const handleAddMoreaccessoryClickOpen = () => {
    setOpenAddMoreaccessoryDialog(true);
  };
  const handleAddaccessoryDialogClose = () => {
    setOpenAddMoreaccessoryDialog(false);
  };

  // Add more accessory function
  const fetchAddMoreaccessory = async (accessory, quantity) => {
    try {
      //   const accessoryId = accessory.id;
      //   const response = await adminAccessoryServices.adminAddMoreAccessory({
      //     accessoryId,
      //     quantity,
      //   });
      //   if (response.statusCode === 200) {
      //     fetchData();
      //     setOpenAddMoreaccessoryDialog(false);
      //   } else {
      //     console.error("Failed to add more accessory:", response.message);
      //   }
    } catch (error) {
      console.error("Failed to add more accessory:", error);
    }
  };
  // Add more accessory button
  const handleAddMoreaccessory = async () => {
    const accessory = rows.find(
      (accessory) => accessory.model === selectedaccessory
    );
    if (!accessory) {
      setErrorSelectedaccessoryId("Please select a accessory");
    }
    if (quantity <= 0) {
      setErrorQuantity("Quantity must be greater than 0");
    }
    if (accessory && quantity > 0) {
      fetchAddMoreaccessory(accessory, quantity);
    }
  };

  //------------------------------------------------------------------------------------------------------------

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Delete accessory
  const handleDelete = async () => {
    try {
      //   const response = await adminAccessoryServices.adminDeleteAccessory(
      //     rowToDelete.id
      //   );
      //   if (response.statusCode === 200) {
      //     fetchData();
      //   } else {
      //     console.error("Failed to delete accessory:", response.message);
      //   }
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
              onClick={handleGoToCreateNewaccessoryPage}
              color="primary"
              variant="contained"
            >
              Create new accessory
            </Button>
            <Button
              onClick={handleAddMoreaccessoryClickOpen}
              color="warning"
              variant="contained"
            >
              Add accessory
            </Button>
          </Box>
          <TextField
            label="Search accessory name"
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
                <TableCell align="left" sx={{ width: "20%" }}>
                  {row.name}
                </TableCell>
                <TableCell align="center" sx={{ width: "2%" }}>
                  {row.isShowed ? (
                    <FontAwesomeIcon color="Green" icon={faEye} />
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add more accessory dialog ----------------------------------------------------------------------------------------- */}
      <Dialog open={openAddMoreaccessoryDialog}>
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
            Add more accessory
          </Typography>
        </DialogTitle>
        {/* Form add information */}
        <DialogContent>
          <FormControl variant="outlined" sx={{ width: 300, marginTop: "5px" }}>
            {/* accessory Selection */}
            <InputLabel id="accessory-select-label">
              Select accessory
            </InputLabel>
            <Select
              labelId="accessory-select-label"
              value={selectedaccessory}
              onChange={(e) => {
                setSelectedaccessory(e.target.value);
                setErrorSelectedaccessoryId("");
              }}
              label="Select accessory"
            >
              {rows.map((accessory) => (
                <MenuItem key={accessory.id} value={accessory.model}>
                  {accessory.model}
                </MenuItem>
              ))}
            </Select>
            {errorSelectedaccessoryId && (
              <Typography sx={{ color: "red" }}>
                {errorSelectedaccessoryId}
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
              onClick={handleAddMoreaccessory}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
            <Button
              onClick={handleAddaccessoryDialogClose}
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
export default AccessoriesTable;
