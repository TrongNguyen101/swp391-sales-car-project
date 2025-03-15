// Built-in modules
import { useState } from "react";

// Third-party modules
import { useDropzone } from "react-dropzone";
import { Box, Typography, Alert, IconButton, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ImageUploadComponent = ({
  propFontSize = "16px",
  title = "Upload images",
  allowedTypes = ["image/jpeg", "image/png", "image/jpg"],
  maxSize = 5 * 1024 * 1024, // Default 5MB
  previewWidthSize = "10px",
  previewHeightSize = "10px",
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
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      {previews.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {previews.map(({ url }, index) => (
            <Box key={index} position="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                style={{
                  border: "2px dashed",
                  objectFit: "cover",
                  width: previewWidthSize,
                  height: previewHeightSize,
                  borderRadius: "8px",
                }}
              />
              <IconButton
                color="error"
                size="large"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(index);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography
          {...getRootProps()}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: propFontSize,
            cursor: "pointer",
            border: "2px dashed",
            width: previewWidthSize,
            height: previewHeightSize,
            borderRadius: "8px",
          }}
          variant="h6"
        >
          {title}
        </Typography>
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
