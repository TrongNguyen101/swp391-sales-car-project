import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";

import FooterComponent from "../../components/Footer";
import HeaderComponent from "../../components/Header";
import SidebarUser from "../../components/SidebarUser";
import styles from "./ProfileUserLayout.module.scss";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function ProfileUserLayout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("Bearer"); // Use a more descriptive key

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    // Optionally, add token validation logic here (e.g., check expiration)
  }, [token, navigate]); // Re-run if token or navigate changes

  // Render only if token exists
  if (!token) return null; // Prevent rendering before redirect
  return (
    <>
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
    </>
  );
}

export default ProfileUserLayout;
