import classnames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import HeaderComponent from "../../components/Header";
import FooterComponent from "../../components/Footer";

const cx = classnames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <HeaderComponent />
      </div>
      <div className={cx("content")}>{children}</div>
      <div className={cx("footer")}>
        <FooterComponent />
      </div>
    </div>
  );
}

export default DefaultLayout;
