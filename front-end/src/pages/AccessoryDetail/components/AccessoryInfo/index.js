import classNames from "classnames/bind";
import styles from "./AccessoryInfo.module.scss";

const cx = classNames.bind(styles);

function AccessoryInforComponent({ accessory }) {
  return (
    <div className={cx("information")}>
      <div className={cx("information__name")}>
        <h2>a</h2>
      </div>
      <div className={cx("information__price")}>
        <h3>Price: vnd</h3>
      </div>
      <div className={cx("information__description")}>
        <p>d</p>
      </div>
      <div className={cx("information__quantity")}>
        <label>Quantity: </label>
        <input type="number" min="1" max="10" />
      </div>
      <div className={cx("information__button")}>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default AccessoryInforComponent;
