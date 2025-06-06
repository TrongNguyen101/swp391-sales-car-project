import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Accessories.module.scss";
import Sidebar from "../../components/Sidebar";
import * as accessoryService from "../../services/AccessoryService";
import { useUserData } from "../../App";

const cx = classNames.bind(styles);

/**
 * AccessoriesPage component renders a page displaying a list of accessories.
 * It fetches accessories based on the selected category and allows navigation to accessory details.
 *
 * @component
 * @example
 * return (
 *   <AccessoriesPage />
 * )
 *
 * @returns {JSX.Element} The rendered AccessoriesPage component.
 *
 * @function
 * @name AccessoriesPage
 *
 * @description
 * - Initializes the navigate function from react-router-dom.
 * - Manages state for accessories and selected category ID.
 * - Handles card click to navigate to accessory details.
 * - Fetches accessories based on the selected category ID or fetches all accessories if no category is selected.
 * - Uses useEffect to fetch accessories when the selected category ID changes.
 *
 * @property {function} handleClickCard - Handles the click event on an accessory card to navigate to the accessory details page.
 * @property {function} fetchAccessories - Fetches accessories based on the selected category ID or fetches all accessories if no category is selected.
 * @property {function} useEffect - Fetches accessories when the selected category ID changes.
 *
 * @param {number} accessoryId - The ID of the accessory to navigate to.
 * @param {number} categoryId - The ID of the category to fetch accessories for.
 * @param {number} selectedCategoryId - The ID of the currently selected category.
 * @param {Array} accessories - The list of accessories to display.
 * @param {function} setAccessories - Sets the list of accessories.
 * @param {function} setSelectedCategoryId - Sets the selected category ID.
 */
function AccessoriesPage() {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const [accessories, setAccessories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0); // Add state for selected category ID
  const [searchRows, setSearchRows] = useState([]);
  const token = localStorage.getItem("Bearer");
  const isLoggedIn = Boolean(token);

  const handleClickCard = (accessoryId) => () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/accessories/${accessoryId}`);
  };

  const fetchAccessories = async (categoryId) => {
    if (selectedCategoryId !== 0) {
      try {
        const response = await accessoryService.getAccessoriesByCategoryId(
          categoryId
        );
        if (response.statusCode !== 200) {
          setAccessories([]);
        } else {
          setAccessories(response.data);
          setSearchRows(response.data);
        }
      } catch (error) {
        setAccessories([]);
      }
    } else {
      try {
        const response = await accessoryService.getAllAccessories();
        if (response.statusCode !== 200) {
          setAccessories([]);
        } else {
          setAccessories(response.data);
          setSearchRows(response.data);
        }
      } catch (error) {
        setAccessories([]);
      }
    }
  };

  useEffect(() => {
    fetchAccessories(selectedCategoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    // Perform filtering immediately as the user types
    if (value.trim()) {
      const filteredAccessory = accessories.filter((accessory) =>
        accessory.name?.toString().toLowerCase().includes(value.toLowerCase())
      );
      setSearchRows(filteredAccessory);
    } else {
      setSearchRows(accessories); // If input is empty, show all rows
    }
  };

  const cartButton = () => {
    if (!isLoggedIn || userData.roleId === 2) {
      return (
        <Button
          variant="outlined"
          sx={{
            width: "80px",
            height: "40px",
            "&:hover": {
              backgroundColor: "var(--primary-color)",
              color: "white",
            },
          }}
          onClick={() => navigate("/cart")}
        >
          <span className={cx("container__accessories--cart")}>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
        </Button>
      );
    } else {
      return null; // Return null if the condition is not met
    }
  };

  // format the price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper__line")}></div>
      <div className={cx("container")}>
        <div className={cx("container__banner")}>
          <img src="car-page-bannel.png" alt="banner" />
        </div>
        <div className={cx("page-title")}>
          <Typography
            sx={{
              fontSize: "1.8rem",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Product Vinfast's Accessories
          </Typography>
        </div>

        {/* container sidebar and list accessories */}
        <div className={cx("container__list-accessories")}>
          <div className={cx("container__sidebar")}>
            {/* Pass callback to Sidebar */}
            <Sidebar onSelectCategory={setSelectedCategoryId} />
          </div>
          <div className={cx("container__accessories")}>
            <div className={cx("container__accessories--top")}>
              <div className={cx("container__accessories--search")}>
                <input
                  type="text"
                  placeholder="Search name of accessory..."
                  className={cx("search")}
                  onChange={handleSearchChange}
                />
                <Button>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </div>
              {cartButton()}
            </div>
            <div className={cx("container__accessories--list")}>
              {searchRows.map((accessory, index) => (
                // card accessory
                <div
                  className={cx("container__accessory-card")}
                  key={index}
                  onClick={handleClickCard(accessory.id)}
                >
                  <div className={cx("container__accessory-content")}>
                    <div className={cx("card-image")}>
                      <img
                        src={`https://localhost:7005/api/Images/Accessory/${accessory.image}`}
                        alt={accessory.name}
                      />
                    </div>
                    <div className={cx("card-title")}>
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        {accessory.name}
                      </Typography>
                    </div>
                    <div className={cx("card-info")}>
                      <div className={cx("price")}>
                        <Typography>
                          Price: {formatPrice(accessory.price)} VND
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={cx("wrapper__line-bottom")}></div>
    </div>
  );
}

export default AccessoriesPage;
