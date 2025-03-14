// Built-in modules
import { useState } from "react";

// Third-party modules
import { useDropzone } from "react-dropzone";
import { Box, Typography, Alert, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ImageUploadComponent = ({
  title = "Upload images",
  allowedTypes = ["image/jpeg", "image/png", "image/jpg"],
  maxSize = 5 * 1024 * 1024, // Default 5MB
  previewWidthSize = 100,
  previewHeightSize = 100,
  onUpload = () => {},
  multiple = true, // Adjust the number of images that can be uploaded
}) => {
  // State
  const [previews, setPreviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Validate file
  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type. JPEG, PNG, JPG only.";
    }
    if (file.size > maxSize) {
      return "File size exceeds limit.";
    }
    return null;
  };

  // Handle file drop
  const handleDrop = (acceptedFiles) => {
    let newPreviews = [];
    let errors = [];

    acceptedFiles.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        newPreviews.push({
          file,
          url: URL.createObjectURL(file),
        });
      }
    });

    if (errors.length > 0) {
      setErrorMessage(errors.join(" | "));
    } else {
      setErrorMessage("");
    }

    // If multiple = false, only save one image
    setPreviews(multiple ? [...previews, ...newPreviews] : newPreviews);

    onUpload(multiple ? [...previews, ...newPreviews] : newPreviews);
  };

  // Handle remove image
  const handleRemoveImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onUpload(newPreviews);
  };

  // Dropzone hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: multiple, // Allow selecting multiple or single image
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        border: "2px dashed",
        borderRadius: "8px",
        cursor: "pointer",
        textAlign: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="h6">{title}</Typography>

      {/* Image previews */}
      {previews.length > 0 && (
        <Box mt={2} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {previews.map(({ url }, index) => (
            <Box key={index} position="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                style={{
                  objectFit: "cover",
                  width: previewWidthSize,
                  height: previewHeightSize,
                  borderRadius: "8px",
                }}
              />
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(index);
                }}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": { background: "rgba(0,0,0,0.8)" },
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Error message */}
      {errorMessage && (
        <Box mt={2}>
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploadComponent;
