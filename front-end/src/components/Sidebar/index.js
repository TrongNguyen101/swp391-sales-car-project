import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as categoriesService from "../../services/AccessoryService";

const Sidebar = () => {
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

  const renderCategories = (parentId = 0) => {
    return categories
      .filter((cat) => cat.parentsId === parentId)
      .map((category) => (
        <div key={category.id}>
          <ListItem button onClick={() => handleExpand(category.id)}>
            <ListItemText primary={category.name} />
            {categories.some((cat) => cat.parentsId === category.id) ? (
              expanded[category.id] ? (
                <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
              ) : (
                <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
              )
            ) : null}
          </ListItem>

          <Collapse in={expanded[category.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderCategories(category.id)}
            </List>
          </Collapse>
        </div>
      ));
  };

  return (
    <List anchor="left" open={true}>
      <List>{renderCategories()}</List>
    </List>
  );
};

export default Sidebar;
