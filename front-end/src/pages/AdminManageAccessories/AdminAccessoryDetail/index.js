import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./AdminAccessoryDetail.module.scss";
import * as adminAccessoryServices from "../../../services/AdminAccessoryServices";
import ImageUploadComponent from "../../../components/AddImage";

const cx = classNames.bind(styles);

function AdminAccessoryDetailPage() {
  const [accessory, setAccessory] = useState({});
  const [message, setMessage] = useState();
  const [inforDialogOpen, setInforDialogOpen] = useState(false);

  const { accessoryId } = useParams();

  const [cardImage, setCardImages] = useState([]);

  // fetch the accessory details by the accessoryId
  const fetchAccessoryDetails = async (Id) => {
    try {
      const response = await adminAccessoryServices.getAccessoryById(Id);
      if (response.statusCode !== 200) {
        setMessage("Failed to fetch accessory details");
        setInforDialogOpen(true);
      } else {
        setAccessory(response.data);
        console.log(response.data);
      }
    } catch (error) {
      setMessage("Failed to fetch accessory details");
      setInforDialogOpen(true);
      console.log(error.data);
    }
  };

  useEffect(() => {
    fetchAccessoryDetails(accessoryId);
  }, [accessoryId]);

  const handleUploadCard = (files) => setCardImages(files);

  // format the price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography>Accessory Detail</Typography>
      <Typography>Accessory ID: {accessoryId}</Typography>

      {/* Container card accessory */}
      <Box sx={{ display: "flex", padding: "20px", width: "100%" }}>
        {/* left area show review card accessory */}
        <Box>
          {/* card accessory  */}
          <Box>
            <div className={cx("car-card")}>
              <div className={cx("card-image")}>
                {accessory.image ? (
                  <img
                    src={`https://localhost:7005/api/Images/Car/${accessory.image}`}
                    alt={accessory.name}
                  />
                ) : (
                  <ImageUploadComponent
                    title="Drag & drop an image here, or click to select card image of car"
                    allowedTypes={["image/jpeg", "image/png"]}
                    maxSize={10 * 1024 * 1024} // 10MB
                    onUpload={handleUploadCard}
                    multiple={false}
                    previewWidthSize="253.5px"
                    previewHeightSize="240px"
                  />
                )}
              </div>
              <div className={cx("card-title")}>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  {accessory.model}
                </Typography>
              </div>
              <div className={cx("card-info")}>
                <div className={cx("price")}>
                  <Typography>{accessory.name}</Typography>
                </div>
                <div className={cx("seat")}>
                  <Typography>
                    Price: {formatPrice(accessory.price)} vnd
                  </Typography>
                </div>
              </div>
            </div>
          </Box>
        </Box>
        {/* right area show information of accessory */}
        <Box sx={{ width: "300px", backgroundColor: "green" }}></Box>
      </Box>
    </Box>
  );
}

export default AdminAccessoryDetailPage;
