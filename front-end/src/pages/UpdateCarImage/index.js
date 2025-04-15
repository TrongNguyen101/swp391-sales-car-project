import { Box, Button, Typography } from "@mui/material";
import ImageUpload from "../../components/AddImage";

const UpdateCarImagePage = () => {
  const handleCarImageUpload = (file) => {
    console.log("Uploading car image:", file);
    // Thực hiện upload logic cho hình ảnh xe
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7",
        alignItems: "center",
      }}
    >
      {/* Banner image */}
      <Box
        sx={{
          paddingLeft: "60px",
          paddingRight: "50px",
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
          title="Drag & drop an image here, or click to select baner image for car"
          allowedTypes={["image/jpeg", "image/png"]}
          maxSize={10 * 1024 * 1024} // 10MB
          previewSize={500}
          onUpload={handleCarImageUpload}
        />
        <Box
          sx={{
            paddingLeft: "60px",
            paddingRight: "50px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              padding: "20px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Button variant="contained">Submit</Button>
          </Box>
        </Box>
      </Box>

      {/* Specification image */}
      <Box
        sx={{
          paddingLeft: "60px",
          paddingRight: "50px",
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
          Upload Card Image for Car
        </Typography>
        <ImageUpload
          title="Drag & drop an image here, or click to select specification image for car"
          allowedTypes={["image/jpeg", "image/png"]}
          maxSize={10 * 1024 * 1024} // 10MB
          previewSize={150}
          onUpload={handleCarImageUpload}
        />
        <Box
          sx={{
            padding: "20px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Button variant="contained">Submit</Button>
        </Box>
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
              onUpload={handleCarImageUpload}
            />
          </Box>
          <Box
            sx={{
              padding: "20px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Button variant="contained">Submit</Button>
          </Box>
        </Box>
        {/* Color image */}
        <Box
          sx={{
            width: "500px",
            height: "100%",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 0.625rem 1.25rem",
            backgroundColor: "#ffffff",
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
              onUpload={handleCarImageUpload}
            />
          </Box>
          <Box
            sx={{
              padding: "20px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Button variant="contained">Submit</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateCarImagePage;
