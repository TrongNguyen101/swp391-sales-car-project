import classNames from "classnames/bind";
import Overview from "../../components/Overview";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./Dashboard.module.scss";
import SidebarDashboard from "../../components/SidebarDashboard";
import * as adminService from "../../services/AdminServices";
import { Dialog, DialogTitle, Typography } from "@mui/material";

const cx = classNames.bind(styles);

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const [updateStatus, setUpdateStatus] = useState(null);
  const [openInformationDialog, setOpenInformationDialog] = useState(false);
  const [managerRoldeId, setManagerRoleId] = useState(null);

  const fetchUserData = async () => {
    try {
      setOpenInformationDialog(false);
      setUpdateStatus(null);
      const token = localStorage.getItem("Bearer");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await adminService.getCurrentManagerProfile();
      if (response.statusCode === 200) {
        setManagerRoleId(response.data.roleId);
        console.log("manager data: ",response.data);
        if (response.data.roleId !== 1 && response.data.roleId !== 3) {
          navigate("/login");
          return;
        }
      } else {
        navigate("/login");
        return;
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

  return (
    <div className={cx("warpper_dashboard")}>
      <div className={cx("container_dashboard")}>
        <div className={cx("container_dashboard--Sidebar")}>
          <SidebarDashboard managerRoleId = {managerRoldeId} />
        </div>
        <div className={cx("container_dashboard--Content")}>
          <Overview />
          {children}
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
    </div>
  );
}

export default DashboardLayout;
