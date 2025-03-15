import { useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import ImageUpload from "../../../components/AddImage";

const CarImageUpload = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [specImages, setSpecImages] = useState([]);
  const [cardImages, setCardImages] = useState([]);
  const [colorImages, setColorImages] = useState([]);

  const handleUploadBanner = (files) => setBannerImages(files);
  const handleUploadSpec = (files) => setSpecImages(files);
  const handleUploadCard = (files) => setCardImages(files);
  const handleUploadColor = (files) => setColorImages(files);

  const handleSubmit = async () => {
    if (
      ![bannerImages, specImages, cardImages, colorImages].some(
        (arr) => arr.length > 0
      )
    ) {
      alert("No images selected!");
      return;
    }

    const formData = new FormData();
    bannerImages.forEach((file, index) =>
      formData.append(`bannerImages[${index}]`, file)
    );
    specImages.forEach((file, index) =>
      formData.append(`specImages[${index}]`, file)
    );
    cardImages.forEach((file, index) =>
      formData.append(`cardImages[${index}]`, file)
    );
    // colorImages.forEach((file, index) =>
    //   formData.append(`colorImages[${index}]`, file)
    // );

    try {
      const response = await axios.post(
        "https://your-server.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Images uploaded successfully!");
    } catch (error) {
      alert("Error uploading images: " + error.message);
    }

    try {
      const response = await fetch("https://your-server.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      alert("Images uploaded successfully!");
    } catch (error) {
      alert("Error uploading images: " + error.message);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          textAlign: "center",
          boxShadow: "rgba(0, 0, 0, 0.08) 0px 0.625rem 1.25rem",
          backgroundColor: "#ffffff",
          margin: "20px auto",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "30px",
            padding: "20px",
            textAlign: "left",
          }}
        >
          Add Image For Car
        </Typography>
      </Box>
      {/* Banner image */}
      <Box
        sx={{
          paddingLeft: "60px",
          paddingRight: "50px",
          paddingBottom: "20px",
          width: "90%",
          textAlign: "center",
          boxShadow: "rgba(0, 0, 0, 0.08) 0px 0.625rem 1.25rem",
          backgroundColor: "#ffffff",
          margin: "20px auto",
        }}
      >
        <Typography
          sx={{ fontWeight: "700", fontSize: "30px", padding: "20px" }}
        >
          Upload Banner Image for Car
        </Typography>
        <ImageUpload
          title="Drag & drop an image here, or click to select banner image for car"
          allowedTypes={["image/jpeg", "image/png"]}
          maxSize={10 * 1024 * 1024} // 10MB
          previewSize={500}
          onUpload={handleUploadBanner}
          multiple={false}
        />
      </Box>

      {/* Specification image */}
      <Box
        sx={{
          paddingLeft: "60px",
          paddingRight: "50px",
          paddingBottom: "20px",
          width: "90%",
          textAlign: "center",
          boxShadow: "rgba(0, 0, 0, 0.08) 0px 0.625rem 1.25rem",
          backgroundColor: "#ffffff",
          margin: "20px auto",
        }}
      >
        <Typography
          sx={{ fontWeight: "700", fontSize: "30px", padding: "20px" }}
        >
          Upload Specification Image for Car
        </Typography>
        <ImageUpload
          title="Drag & drop an image here, or click to select specification image for car"
          allowedTypes={["image/jpeg", "image/png"]}
          maxSize={10 * 1024 * 1024} // 10MB
          previewSize={150}
          onUpload={handleUploadSpec}
          multiple={false}
        />
      </Box>

      {/* two image */}
      <Box
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          paddingLeft: "60px",
          paddingRight: "60px",
          width: "100%",
          textAlign: "center",
          margin: "20px auto",
        }}
      >
        {/* Card image */}
        <Box
          sx={{
            width: "500px",
            height: "100%",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 0.625rem 1.25rem",
            backgroundColor: "#ffffff",
            paddingBottom: "20px",
          }}
        >
          <Typography
            sx={{ fontWeight: "700", fontSize: "30px", padding: "20px" }}
          >
            Upload Card Image for Car
          </Typography>
          <Box sx={{ width: "450px", margin: "auto" }}>
            <ImageUpload
              title="Drag & drop an image here, or click to select card image of car"
              allowedTypes={["image/jpeg", "image/png"]}
              maxSize={10 * 1024 * 1024} // 10MB
              previewWidthSize={376}
              previewHeightSize={240}
              onUpload={handleUploadCard}
              multiple={false}
            />
          </Box>
        </Box>
        {/* Color image */}
        <Box
          sx={{
            width: "500px",
            height: "100%",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 0.625rem 1.25rem",
            backgroundColor: "#ffffff",
            paddingBottom: "20px",
          }}
        >
          <Typography
            sx={{ fontWeight: "700", fontSize: "30px", padding: "20px" }}
          >
            Uploading image color of Car
          </Typography>
          <Box sx={{ width: "450px", margin: "auto" }}>
            <ImageUpload
              title="Drag & drop an image here, or click to select card image of car"
              allowedTypes={["image/jpeg", "image/png"]}
              maxSize={10 * 1024 * 1024} // 10MB
              previewWidthSize={376}
              previewHeightSize={240}
              onUpload={handleUploadColor}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "20px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: "80%" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CarImageUpload;
