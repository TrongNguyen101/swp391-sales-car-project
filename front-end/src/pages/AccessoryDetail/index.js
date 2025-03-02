import { useParams } from "react-router-dom";

import classNames from "classnames/bind";

import styles from "./AccessoryDetail.module.scss";
import AccessoryGalleryComponent from "./components/AccessoryGallery";
import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AccessryDetailPage() {
  const { accessoryId } = useParams();

  const accessory = {
    id: 1,
    name: "Shell Recharge Advanced Home laadpunt & installatie",
    price: "4,000,000 VND",
    brand: "Brand A",
    color: "Red",
    material: "Metal",
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper__line")}></div>
      <div className={cx("container")}>
        <section className={cx("container__accessory-overview")}>
          <div className={cx("container__accessory-image")}>
            <AccessoryGalleryComponent accessoryId={accessoryId} />
          </div>
          <div className={cx("container__accessory-info")}>
            <Typography className={cx("information__name")}>
              {accessory.name}
            </Typography>
            <Typography className={cx("information__price")}>
              {accessory.price}
            </Typography>
            <div className={cx("information__description")}>
              <Typography className={cx("information__description-title")}>
                Description
              </Typography>
              <Typography>
                Cốp nóc ô tô dành cho VinFast VF 8 là lựa chọn lý tưởng để mở
                rộng không gian lưu trữ trong các chuyến hành trình. Thiết kế
                hiện đại, tiện dụng cùng chất lượng vượt trội, sản phẩm mang đến
                sự tiện lợi và phong cách cho mọi chuyến đi. *Ghi chú: cần mua
                cùng thanh ngang giá nóc, thanh dọc giá nóc để có thể lắp lên
                xe.
              </Typography>
            </div>
            <div className={cx("information__button")}>
              <div className={cx("button__add-to-cart")}>
                <Button variant="contained" sx={{ with: "500px" }}>
                  Add to Cart
                  <span className={cx("icon")}>
                    <FontAwesomeIcon icon={faCartShopping} />
                  </span>
                </Button>
              </div>
              <Button
                variant="outlined"
                sx={{
                  width: "160px",
                  "&:hover": {
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                  },
                }}
              >
                <span className={cx("button_buy-now")}>Buy now</span>
              </Button>
            </div>
          </div>
        </section>
        <section className={cx("container__specification")}>
          <Typography className={cx("information__specification-title")}>
            Specification
          </Typography>
          <p>
            + Kích thước: 205x78x35cm. + Sức tải: 75kg. + Cân nặng: 22kg + Màu
            sắc: Đen + Chất liệu: ABS + PMMA, vật liệu kết hợp giữa khả năng
            chịu lực, chống va đập của ABS và bề mặt bóng mịn, chống trầy xước
            của PMMA, đảm bảo độ bền vượt trội, khả năng chống chịu thời tiết và
            tính thẩm mỹ cao. Cốp nóc ô tô VinFast VF 8 không chỉ là phụ kiện
            thiết yếu, mà còn là biểu tượng của sự tiện nghi và đẳng cấp. Phù
            hợp với mọi hành trình, từ chuyến đi ngắn ngày đến những chuyến
            phiêu lưu dài hơi.
          </p>
        </section>
      </div>
      <div className={cx("wrapper__line-bottom")}></div>
    </div>
  );
}

export default AccessryDetailPage;
