import classNames from "classnames/bind";

import styles from "./ImageThumbnail.module.scss";

const cx = classNames.bind(styles);

const ImageThumbnail = ({ src, onClick, isActive }) => {
  return (
    <img
      src={src}
      className={cx("thumbnail__picture", {"thumbnail__picture--active": isActive})}
      onClick={onClick}
      alt="Thumbnail"
    />
  );
};

export default ImageThumbnail;
