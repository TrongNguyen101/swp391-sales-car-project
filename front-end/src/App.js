import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { publicRoutes } from "./routes";
import { DefaultLayout } from "./layouts";
import * as adminService from "./services/AdminServices";
import { Dialog, DialogTitle, Typography } from "@mui/material";

const UserDataContext = createContext();

// This context will be used to provide user data to the children components
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within app");
  }
  return context;
};

function App() {
  let routes = publicRoutes;
  const [userData, setUserData] = useState({});
  const [openInformationDialog, setOpenInformationDialog] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  const fetchUserData = async () => {
    try {
      setOpenInformationDialog(false);
      setUpdateStatus(null);

      const response = await adminService.getCurrentUser();
      if (response.statusCode === 200) {
        setUserData(response.data);
      } else {
        setUserData({});
      }
    } catch (error) {
      setUpdateStatus({
        type: "error",
        message: "Internal server error. Please contact support",
      });
      setOpenInformationDialog(true);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = { userData, refetch: fetchUserData };

  return (
    <Router>
      <UserDataContext.Provider value={contextValue}>
        <div className="App">
          <Routes>
            {routes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              const Page = route.page;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
        {/* Show information dialog */}
        <Dialog
          open={openInformationDialog}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          sx={{ "& .MuiDialog-paper": { width: "540px", height: "160px" } }}
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            sx={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {updateStatus && (
              <Typography
                color={updateStatus.type === "error" ? "error" : "success"}
                sx={{ fontWeight: 500, fontSize: "30px" }}
              >
                {updateStatus.message}
              </Typography>
            )}
          </DialogTitle>
        </Dialog>
      </UserDataContext.Provider>
    </Router>
  );
}

export default App;
