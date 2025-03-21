import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import SidebarDashboard from "../../components/SidebarDashboard";
import Overview from "../../components/Overview";

const cx = classNames.bind(styles);

function DashboardLayout({ children }) {
  return (
    <div className={cx("warpper_dashboard")}>
      <div className={cx("container_dashboard")}>
        <div className={cx("container_dashboard--Sidebar")}>
          <SidebarDashboard />
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
