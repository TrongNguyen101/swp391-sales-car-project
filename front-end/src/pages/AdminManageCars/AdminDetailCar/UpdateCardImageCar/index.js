import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";

import classNames from "classnames/bind";

import styles from "./UpdateCardCar.module.scss";
import ImageUploadComponent from "../../../../components/AddImage";
import * as adminCarServices from "../../../../services/AdminCarServices";

import { useState } from "react";

const cx = classNames.bind(styles);

function UpdateCardCarComponent({ car, setMessage = () => { }, setInforDialogOpen = () => { }, fetchCarDetails = () => { } }) {
    const [cardImage, setCardImages] = useState([]);

    const handleUploadCard = (files) => setCardImages(files);

    // handle the save of the image
    const handleSaveCardImage = async () => {
        if (!cardImage.length || !cardImage[0].file) {
            setMessage("Please select an image to upload");
            setInforDialogOpen(true);
        } else {
            try {
                const formData = new FormData();
                formData.append("cardImage", cardImage[0].file);

                const response = await adminCarServices.uploadCardImageOfCar(
                    car.id,
                    formData
                );

                if (response.statusCode !== 200) {
                    setMessage("Failed to upload image");
                    setInforDialogOpen(true);
                } else {
                    setMessage("Image uploaded successfully");
                    fetchCarDetails(car.id);
                    setInforDialogOpen(true);
                }
            } catch (error) {
                setMessage(error);
                setInforDialogOpen(true);
            }
        }
    };

    // format the price
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "40px",
                }}
            >
                <Box>
                    <div className={cx("car-card")}>
                        <div className={cx("card-image")}>
                            {car.image ? (
                                <img
                                    src={`https://localhost:7005/api/Images/Car/${car.image}`}
                                    alt={car.model}
                                />
                            ) : (
                                <ImageUploadComponent
                                    title="Drag & drop an image here, or click to select card image of car"
                                    allowedTypes={["image/jpeg", "image/png"]}
                                    maxSize={10 * 1024 * 1024} // 10MB
                                    onUpload={handleUploadCard}
                                    multiple={false}
                                    previewWidthSize="354.5px"
                                    previewHeightSize="220px"
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
                                {car.model}
                            </Typography>
                        </div>
                        <div className={cx("card-info")}>
                            <div className={cx("price")}>
                                <Typography>
                                    Price: {formatPrice(car.priceBatteryRental)} vnd
                                </Typography>
                            </div>
                            <div className={cx("seat")}>
                                <Typography>Seats: {car.seat}</Typography>
                            </div>
                        </div>
                    </div>
                </Box>
                <Box sx={{ padding: "5px 20px", width: "600px" }}>
                    <Typography sx={{ fontSize: "36px", fontWeight: 900 }}>
                        Model: {car.model}
                    </Typography>
                    <Typography>Seat: {car.seat}</Typography>
                    <Typography>
                        Price Battery Rental: {formatPrice(car.priceBatteryRental)}
                    </Typography>
                    <Typography>
                        Price Battery Own: {formatPrice(car.priceBatteryOwn)}
                    </Typography>
                    <Typography>{car.priceDeposite}</Typography>
                    <Typography>{car.quantity}</Typography>
                    <Typography>{car.isShowed}</Typography>
                    <Button variant="contained" onClick={handleSaveCardImage}>
                        Save Image
                    </Button>
                    <Button variant="outlined" color="error" sx={{ marginLeft: "10px" }}>
                        Delete Image
                    </Button>
                </Box>
            </Box>


        </Box>
    );
}

export default UpdateCardCarComponent;