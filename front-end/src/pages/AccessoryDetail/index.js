import { useParams } from "react-router-dom";

import classNames from "classnames/bind";

import styles from "./AccessoryDetail.module.scss";
import AccessoryGalleryComponent from "./components/AccessoryGallery";
import AccessoryInforComponent from "./components/AccessoryInfo";

const cx = classNames.bind(styles);

function AccessryDetailPage() {
  const { accessoryId } = useParams();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <section className={cx("container__accessory-overview")}>
          <div className={cx("container__accessory-image")}>
            <AccessoryGalleryComponent accessoryId={accessoryId} />
          </div>
          <div className={cx("container__accessory-info")}>
            <AccessoryInforComponent />
          </div>
        </section>
        <section className={cx("container__description")}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
          odio vitae sapien faucibus tincidunt. Nulla facilisi. Nullam auctor,
          turpis nec tincidunt fermentum, nunc odio bibendum libero, vitae
          lacinia justo nulla vel mi. Nullam auctor, turpis nec tincidunt
          fermentum, nunc odio bibendum libero, vitae lacinia justo nulla vel
          mi.
        </section>
        <section className={cx("container__specification")}>
          <h2>Specification</h2>
          <table>
            <tr>
              <td>Brand</td>
              <td>Vinfast</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Black</td>
            </tr>
            <tr>
              <td>Material</td>
              <td>Plastic</td>
            </tr>
          </table>
        </section>
      </div>
    </div>
  );
}

export default AccessryDetailPage;
