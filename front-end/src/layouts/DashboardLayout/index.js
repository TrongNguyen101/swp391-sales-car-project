import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import classNames from "classnames/bind";

import styles from "./DashboardLayout.module.scss";
import Overview from "../../components/Overview";
import SidebarDashboard from "../../components/SidebarDashboard";
import { useUserData } from "../../App";

const cx = classNames.bind(styles);

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const { userData } = useUserData();

  const managerRoldeId = userData.roleId; // this is the role ID for the manager

  const token = localStorage.getItem("Bearer"); // Use a more descriptive key

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      if (userData.roleId !== 1 && userData.roleId !== 3) {
        navigate("/login");
      }
    }
    // Optionally, add token validation logic here (e.g., check expiration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]); // Re-run if token or navigate changes

  // Render only if token exists
  if (!token) return null; // Prevent rendering before redirect

  return (
    <div className={cx("warpper_dashboard")}>
      <div className={cx("container_dashboard")}>
        <div className={cx("container_dashboard--Sidebar")}>
          <SidebarDashboard managerRoleId={managerRoldeId} />
        </div>
        <div className={cx("container_dashboard--Content")}>
          <Overview />
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
