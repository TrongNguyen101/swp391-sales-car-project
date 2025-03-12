import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import SidebarDashboard from "../../components/SidebarDashboard";
import Overview from "../../components/Overview";

const cx = classNames.bind(styles);

function DashboardLayout({ children }) {
  return (
    <div className={cx("container")}>
      <SidebarDashboard />
      <div className={cx("content")}>
        <Overview />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
