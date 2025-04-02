import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";

import FooterComponent from "../../components/Footer";
import HeaderComponent from "../../components/Header";
import SidebarUser from "../../components/SidebarUser";
import styles from "./ProfileUserLayout.module.scss";
import * as adminService from '../../services/AdminServices';
import { Dialog, DialogTitle, Typography } from "@mui/material";


const cx = classNames.bind(styles);

const UserDataContext = createContext();

// This context will be used to provide user data to the children components
export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error("useUserData must be used within a ProfileUserLayout");
    }
    return context;
};

function ProfileUserLayout({ children }) {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [openInformationDialog, setOpenInformationDialog] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(null);

    const fetchUserData = async () => {
        try {
            setOpenInformationDialog(false);
            setUpdateStatus(null);
            const token = localStorage.getItem("Bearer");
            if (!token) {
                navigate("/login");
                return;
            }
            const response = await adminService.getCurrentUser();
            if (response.statusCode === 200) {
                console.log(response.data);
                setUserData(response.data);
            }
        } catch (error) {
            setUpdateStatus({ type: 'error', message: "Internal server error. Please contact support" });
            setOpenInformationDialog(true);
        }
    };

    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const contextValue = { userData, refetch: fetchUserData };

    return (
        <UserDataContext.Provider value={contextValue}>
            <div className={cx("container")}>
                <div className={cx("container__header")}>
                    <HeaderComponent />
                </div>
                <div className={cx("container__content")}>
                    <div className={cx("sidebar")}>
                        <SidebarUser />
                    </div>
                    <div className={cx("content")}>{children}</div>
                </div>
                <div className={cx("container__footer")}>
                    <FooterComponent />
                </div>
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
                        marginTop: "20px"
                    }}
                >
                    {updateStatus && (
                        <Typography
                            color={updateStatus.type === 'error' ? 'error' : 'success'}
                            sx={{ fontWeight: 500, fontSize: "30px" }}
                        >
                            {updateStatus.message}
                        </Typography>
                    )}
                </DialogTitle>
            </Dialog>
        </UserDataContext.Provider>);
}

export default ProfileUserLayout;