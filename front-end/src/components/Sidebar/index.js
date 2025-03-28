import { useEffect, useState } from "react";
import { ListItem, ListItemText, Collapse, Typography } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import * as categoriesService from "../../services/AccessoryService";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

const Sidebar = ({ onSelectCategory }) => {
  const [expanded, setExpanded] = useState({});
  const [categories, setCategories] = useState([]);

  const handleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (id) => {
    if (id === 0) {
      onSelectCategory(id);
    }
    onSelectCategory(id); // Call the callback function with the selected category ID
  };



  const renderCategories = (parentsId = 0) => {
    return categories
      .filter((cat) => cat.parentsId === parentsId)
      .map((category) => {
        const hasSubcategories = categories.some(
          (cat) => cat.parentsId === category.id
        );
        return (
          <div key={category.id}>
            <ListItem
              button="true"
              onClick={() => {
                handleExpand(category.id);
                if (!hasSubcategories) {
                  handleCategoryClick(category.id);
                }
              }}
            >
              <ListItemText
                primary={category.name}
                className={cx("sidebar__text")}
              />
              {hasSubcategories ? (
                expanded[category.id] ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )
              ) : null}
            </ListItem>

            {hasSubcategories && (
              <Collapse
                className={cx("sidebar__sub-item")}
                in={expanded[category.id]}
                timeout="auto"
                unmountOnExit
              >
                {renderCategories(category.id)}
              </Collapse>
            )}
          </div>
        );
      });
  };

  return (
    <div className={cx("sidebar")}>
      <Typography className={cx("sidebar__title")}>
        Categories
      </Typography>
      <div className={cx("sidebar__content")}>
        {renderCategories()}
      </div>
    </div>
  );
};

export default Sidebar;
