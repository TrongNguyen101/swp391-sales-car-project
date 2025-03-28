import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as adminAccessoryServices from "../../../services/AdminAccessoryServices";
import * as categoriesService from "../../../services/AccessoryService";

function UpdateAccessoryPage() {
  const navigate = useNavigate();
  const { accessoryId } = useParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  //state of the values of the form
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [addQuantity, setAddQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [material, setMaterial] = useState("");
  const [warranty, setWarranty] = useState("");
  const [isShowed, setIsShowed] = useState(false);

  // Error states
  const [errorName, setErrorName] = useState("");
  const [errorCategoryId, setErrorCategoryId] = useState("");
  const [errorOrigin, setErrorOrigin] = useState("");
  const [errorPrice, setErrorPrice] = useState("");
  const [errorWeight, setErrorWeight] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorQuantity, setErrorQuantity] = useState("");
  const [errorAddQuantity, setErrorAddQuantity] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [errorDimensions, setErrorDimensions] = useState("");
  const [errorMaterial, setErrorMaterial] = useState("");
  const [errorWarranty, setErrorWarranty] = useState("");

  //state of the message of the dialog
  const [message, setMessage] = useState("");

  //state of the successful dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  // fetch the categories
  const fetchCategories = async () => {
    try {
      const response = await categoriesService.getCategories();
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // fetch the accessory details by the accessoryId
  const fetchAccessoryDetails = async () => {
    try {
      const response = await adminAccessoryServices.getAccessoryById(accessoryId);
      if (response.statusCode !== 200) {
        setMessage("Failed to fetch accessory details");
        setOpenDialog(true);
        return;
      } else {
        setId(response.data.id);
        setName(response.data.name);
        setCategoryId(response.data.categoryId);
        setOrigin(response.data.origin);
        setPrice(response.data.price);
        setWeight(response.data.weight);
        setDescription(response.data.description);
        setQuantity(response.data.quantity);
        setAddQuantity(0);
        setColor(response.data.color);
        setDimensions(response.data.dimensions);
        setMaterial(response.data.material);
        setWarranty(response.data.warranty);
        setIsShowed(response.data.isShowed);
        console.log(response.data);
        console.log(response.data.categoryId);
      }
    } catch (error) {
      setMessage("Failed to fetch accessory details");
      setOpenDialog(true);
    }
    finally {
      setLoading(true);
    }
  };
  const loadData = async () => {
    await fetchCategories();
    await fetchAccessoryDetails();
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);



  const handleFormSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    if (!name) {
      setErrorName("Name is required");
      isValid = false;
    }

    if (!categoryId) {
      setErrorCategoryId("Category is required");
      isValid = false;
    }

    if (!price || price <= 0) {
      setErrorPrice("Price must be greater than 0");
      isValid = false;
    }

    if (!weight || weight <= 0) {
      setErrorWeight("Weight must be greater than 0");
      isValid = false;
    }

    if (!description) {
      setErrorDescription("Description is required");
      isValid = false;
    }

    if (addQuantity < 0) {
      setErrorAddQuantity("Quantity must be greater than or equal 0");
      isValid = false;
    }

    if (!color) {
      setErrorColor("Color is required");
      isValid = false;
    }

    if (!dimensions) {
      setErrorDimensions("Dimensions are required");
      isValid = false;
    }

    if (!material) {
      setErrorMaterial("Material is required");
      isValid = false;
    }

    if (!warranty) {
      setErrorWarranty("Warranty is required");
      isValid = false;
    }

    if (isValid) {
      fetchUpdateAccessory();
    }
  };

  const fetchUpdateAccessory = async () => {
    try {
      const accessoryData = {
        name,
        origin,
        categoryId,
        price,
        weight,
        description,
        addQuantity,
        color,
        dimensions,
        material,
        warranty,
        isShowed,
      };
      console.log(accessoryData);
      const response = await adminAccessoryServices.adminUpdateAccessory(
        id,
        accessoryData
      );
      if (response.statusCode === 200) {
        setMessage(response.message);
        setOpenDialog(true);
      } else {
        setMessage(response.data.value.message);
        setOpenErrorDialog(true);
      }
    } catch (error) {
      setMessage("Error creating accessory");
      setOpenErrorDialog(true);
      console.log(error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/dashboard/accessories");
  };
  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Update Accessory
        </Typography>
        {/* Form */}
        <Box
          sx={{
            padding: "0 40px",
            width: "1100px",
          }}
        >
          {/* Form top */}
          <Box sx={{ display: "flex", width: "100%" }}>
            {/* Block left */}
            <Box sx={{ paddingRight: "40px", width: "600px" }}>
              <TextField
                sx={{ width: "100%", marginBottom: "1em" }}
                type="text"
                label="Name"
                spellCheck="false"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorName("");
                }}
                error={!!errorName}
                helperText={errorName || ""}
              />
              <Box
                display={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  marginBottom: "1em",
                }}
              >
                {/* Field select category */}
                {loading && categories.length > 0 && (
                  <FormControl
                    variant="outlined"
                    sx={{ width: "100%", paddingRight: "20px" }}
                    error={!!errorCategoryId}
                  >
                    <InputLabel id="category-select-label">
                      Select Category
                    </InputLabel>
                    <Select
                      labelId="category-select-label"
                      sx={{ width: "100%" }}
                      value={categoryId}
                      onChange={(e) => {
                        setCategoryId(e.target.value);
                        setErrorCategoryId("");
                      }}
                      label="Select Category"
                    >
                      {categories.map((cate) => (
                        <MenuItem key={cate.id} value={cate.id}>
                          {cate.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errorCategoryId || ""}</FormHelperText>
                  </FormControl>
                )}

                <TextField
                  sx={{ width: "100%" }}
                  type="text"
                  label="Origin"
                  spellCheck="false"
                  value={origin}
                  onChange={(e) => {
                    setOrigin(e.target.value);
                    setErrorOrigin("");
                  }}
                  error={!!errorOrigin}
                  helperText={errorOrigin || ""}
                />
              </Box>
              {/* box current quantity */}
              <Box
                display={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  sx={{ width: "100%", paddingRight: "20px" }}
                  type="number"
                  label="Current Quantity"
                  spellCheck="false"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setErrorQuantity("");
                  }}
                  error={!!errorQuantity}
                  helperText={errorQuantity || ""}
                  disabled
                />

                <TextField
                  sx={{ width: "100%", marginBottom: "1em", paddingRight: "20px", }}
                  type="text"
                  label="Warranty"
                  spellCheck="false"
                  value={warranty}
                  onChange={(e) => {
                    setWarranty(e.target.value);
                    setErrorWarranty("");
                  }}
                  error={!!errorWarranty}
                  helperText={errorWarranty || ""}
                />

                <TextField
                  sx={{ width: "80%", marginBottom: "1em" }}
                  type="text"
                  label="Price"
                  spellCheck="false"
                  value={new Intl.NumberFormat().format(price)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, "");
                    if (!isNaN(rawValue)) {
                      // Check if it's a number
                      setPrice(rawValue);
                      setErrorPrice("");
                    }
                  }}
                  error={!!errorPrice}
                  helperText={errorPrice || ""}
                />
              </Box>
            </Box>
            {/* Block right */}
            <Box sx={{ width: "500px" }}>
              <Box display={{ display: "flex", width: "100%", justifyContent: "space-between", marginBottom: "1em", }}>
                <TextField
                  sx={{ width: "100%", paddingRight: "20px" }}
                  type="number"
                  label="Add More Quantity"
                  spellCheck="false"
                  value={addQuantity || 0}
                  onChange={(e) => {
                    setAddQuantity(e.target.value);
                    setErrorAddQuantity("");
                  }}
                  error={!!errorAddQuantity}
                  helperText={errorAddQuantity || ""}
                />
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="show-model">Publish</InputLabel>
                  <Select
                    labelId="show-model"
                    label="Show Model"
                    value={isShowed}
                    onChange={(e) => setIsShowed(e.target.value)}
                  >
                    <MenuItem value={true}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ width: "20%" }}>Published </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value={false}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ width: "20%" }}>Hide </Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* Block weight and color */}
              <Box
                display={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {/* Field weight */}
                <TextField
                  sx={{
                    width: "100%",
                    marginBottom: "1em",
                    paddingRight: "20px",
                  }}
                  type="text"
                  label="Weight"
                  spellCheck="false"
                  value={new Intl.NumberFormat().format(weight)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, "");
                    if (!isNaN(rawValue)) {
                      // Check if it's a number
                      setWeight(rawValue);
                      setErrorWeight("");
                    }
                  }}
                  error={!!errorWeight}
                  helperText={errorWeight || ""}
                />

                {/* field color */}
                <TextField
                  sx={{ width: "100%", marginBottom: "1em" }}
                  type="text"
                  label="Color"
                  spellCheck="false"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                    setErrorColor("");
                  }}
                  error={!!errorColor}
                  helperText={errorColor || ""}
                />
              </Box>
              {/* Dimensions and mAterial */}
              <Box
                display={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {/* Field weight */}
                <TextField
                  sx={{
                    width: "100%",
                    marginBottom: "1em",
                    paddingRight: "20px",
                  }}
                  type="text"
                  label="Dimensions"
                  spellCheck="false"
                  value={dimensions}
                  onChange={(e) => {
                    setDimensions(e.target.value);
                    setErrorDimensions("");
                  }}
                  error={!!errorDimensions}
                  helperText={errorDimensions || ""}
                />

                {/* field color */}
                <TextField
                  sx={{ width: "100%", marginBottom: "1em" }}
                  type="text"
                  label="Material"
                  spellCheck="false"
                  value={material}
                  onChange={(e) => {
                    setMaterial(e.target.value);
                    setErrorMaterial("");
                  }}
                  error={!!errorMaterial}
                  helperText={errorMaterial || ""}
                />
              </Box>
            </Box>
          </Box>
          {/* Form bottom: field description */}
          <Box sx={{ width: "100%", paddingRight: "20px" }}>
            <TextField
              sx={{ width: "100%", marginBottom: "1em" }}
              multiline
              rows={10}
              type="text"
              label="Description"
              spellCheck="false"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrorDescription("");
              }}
              error={!!errorDescription}
              helperText={errorDescription || ""}
            />
          </Box>
        </Box>

        <Button variant="contained" color="primary" onClick={handleFormSubmit}>
          Update Accessory
        </Button>
      </Box>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "440px", height: "140px" } }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: "500",
            lineHeight: "1.5",
          }}
        >
          {message}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openErrorDialog}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "440px", height: "140px" } }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          sx={{
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: "500",
            lineHeight: "1.5",
          }}
        >
          {message}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleCloseErrorDialog}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UpdateAccessoryPage;
