import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleToHomePage = () => {
    navigate("/");
  };

  return (
    <div>
      <Typography>Login page</Typography>
      <Button variant="outlined" onClick={handleToHomePage}>
        back to home
      </Button>
    </div>
  );
}

export default LoginPage;
