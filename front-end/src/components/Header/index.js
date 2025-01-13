import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeaderComponent() {
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  const handleToLoginPage = () => {
    navigate("/login");
  };

  const handleToHomePage = () => {
    setDisable(true);
    navigate("/");
  };

  const handleToProfilePage = () => {
    setDisable(false);
    navigate("/profile");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <div>
        <Button variant="contained" onClick={handleToLoginPage}>
          to login page
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={handleToProfilePage}>
          to profile
        </Button>
      </div>
      <div>
        <Button
          variant="outlined"
          onClick={handleToHomePage}
          disabled={disable}
        >
          back to home
        </Button>
      </div>
    </div>
  );
}

export default HeaderComponent;
