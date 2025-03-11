import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function SidebarDashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => () => {
    navigate(path);
  };
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 300,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 300, boxSizing: "border-box" },
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <ListItem
          button={true}
          onClick={handleNavigation("/dashboard/account")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faHouse} />
          </ListItemIcon>
          <ListItemText primary="Account management" />
        </ListItem>
        <ListItem
          button={true}
          onClick={handleNavigation("/car-management")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faHouse} />
          </ListItemIcon>
          <ListItemText primary="Car management" />
        </ListItem>
        <ListItem
          button={true}
          onClick={handleNavigation("/accessories-management")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faHouse} />
          </ListItemIcon>
          <ListItemText primary="Accessories management" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SidebarDashboard;
