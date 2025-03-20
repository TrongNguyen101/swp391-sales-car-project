import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";


import ImageUploadComponent from "../../../../components/AddImage";
import * as adminCarServices from "../../../../services/AdminCarServices";

import { useState } from "react";


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


        </Box>
    );
}

export default UpdateCardCarComponent;