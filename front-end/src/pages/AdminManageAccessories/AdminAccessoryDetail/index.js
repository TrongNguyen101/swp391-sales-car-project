import { useParams } from "react-router-dom";

import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import * as adminAccessoryServices from "../../../services/AdminAccessoryServices";
import UpdateCardImageOfAccessoryComponent from "./UpdateCardImageOfAccessory";
import UpdateImagesDetailOfAccessoriesComponent from "./UpdateImagesDetailOfAccessories";


function AdminAccessoryDetailPage() {
  //state manage accessory for detail page
  const [accessory, setAccessory] = useState({});

  // state of the message to show the user
  const [message, setMessage] = useState();
  const [inforDialogOpen, setInforDialogOpen] = useState(false);

  // get the accessoryId from the url
  const { accessoryId } = useParams();

  // fetch the accessory details by the accessoryId
  const fetchAccessoryDetails = async () => {
    try {
      const response = await adminAccessoryServices.getAccessoryById(accessoryId);
      if (response.statusCode !== 200) {
        setMessage("Failed to fetch accessory details");
        setInforDialogOpen(true);
        return;
      } else {
        setAccessory(response.data);
      }
    } catch (error) {
      setMessage("Failed to fetch accessory details");
      setInforDialogOpen(true);
    }
  };

  useEffect(() => {
    fetchAccessoryDetails();
    // eslint-disable-next-line
  }, []);

  // handle the close of the dialog
  const handleCloseDialog = () => {
    setInforDialogOpen(false);
    setMessage("");
  };

  return (
    <Box sx={{ padding: "20px", width: "100%" }}>
      {/* Title: Detail Page */}
      <Typography
        sx={{
          width: "100%",
          fontWeight: 900,
          fontSize: "36px",
        }}
      >
        Accessory Detail{" "}
      </Typography>

      {/* Update card image of Accessory */}
      <Box sx={{ padding: "20px", width: "100%" }}>
        <UpdateCardImageOfAccessoryComponent
          accessory={accessory}
          setMessage={setMessage}
          setInforDialogOpen={setInforDialogOpen}
          fetchAccessoryDetails={fetchAccessoryDetails}
        />
      </Box>

      {/* Update image detail of Accessories */}
      <Box sx={{ padding: "20px", width: "100%" }}>
        <UpdateImagesDetailOfAccessoriesComponent
          accessoryId={accessory.id}
          setMessage={setMessage}
          setInforDialogOpen={setInforDialogOpen}
        />
      </Box>

      {/* Dialog show information */}
      <Dialog
        open={inforDialogOpen}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { width: "640px" } }}
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
        <DialogActions sx={{ justifyContent: "center", padding: "20px" }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminAccessoryDetailPage;
