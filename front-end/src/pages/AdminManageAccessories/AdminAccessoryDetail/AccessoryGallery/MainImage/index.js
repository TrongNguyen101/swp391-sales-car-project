import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./MainImage.module.scss";

const cx = classNames.bind(styles);

const MainImage = ({ src }) => {
  const [isZoomed, setIsZoomed] = useState(false);

return (
    <div 
        className={cx("main-image", { "main-image__zoom": isZoomed })} 
        onMouseEnter={() => setIsZoomed(true)} 
        onMouseLeave={() => setIsZoomed(false)}
    >
        <img src={src} alt="Product" />
    </div>
);
};

export default MainImage;
