import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ImageUploadComponent from "../../../../components/AddImage";
import ListColorImageCarComponent from "../ListColorImageCar";

function UpdateImagessColorCar({ carId }) {
  const [color, setColor] = useState("");
  const [newColerImages, setNewColerImages] = useState([]);
  const [errorColor, setErrorColor] = useState("");

  const handleUploadColor = (files) => {
    const formattedFiles = files.map((file) => ({
      file,
      url: URL.createObjectURL(file.file), // Tạo URL để hiển thị ảnh
    }));
    setNewColerImages(formattedFiles);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontWeight: "500", fontSize: "24px" }}>
          List Color Image of Car
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <ListColorImageCarComponent carId={carId} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "40px",
          paddingRight: "40px",
        }}
      >
        <Box sx={{ width: "700px", paddingLeft: "60px" }}>
          <ImageUploadComponent
            title="Drag & drop an image here, or click to select main image of car"
            allowedTypes={["image/jpeg", "image/png"]}
            maxSize={10 * 1024 * 1024} // 10MB
            onUpload={handleUploadColor}
            multiple={false}
            previewWidthSize="700px"
            previewHeightSize="400px"
          />
        </Box>
        <Box sx={{ width: "200px", paddingRight: "60px" }}>
          <Box sx={{ width: "200px", height: "200px" }}>
            <ImageUploadComponent
              title="Drag & drop an image here, or click to select item image of car"
              allowedTypes={["image/jpeg", "image/png"]}
              maxSize={10 * 1024 * 1024} // 10MB
              onUpload={handleUploadColor}
              multiple={false}
              previewWidthSize="200px"
              previewHeightSize="115px"
              propFontSize="14px"
            />
          </Box>
          <Box sx={{ width: "200px" }}>
            <TextField
              sx={{ width: "100%", marginBottom: "1em" }}
              type="text"
              label="Car Color"
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
          <Box sx={{ width: "200px" }}>
            <Button sx={{ width: "100%" }} variant="contained">
              Save Image
            </Button>
          </Box>
          <Box sx={{ width: "200px", marginTop: "20px" }}>
            <Button sx={{ width: "100%" }} variant="outlined" color="error">
              Delete Image
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default UpdateImagessColorCar;
