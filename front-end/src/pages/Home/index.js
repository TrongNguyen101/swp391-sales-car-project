import { Button, Typography } from "@mui/material";
import { useState } from "react";
import * as TestService from "../../services/TestService";

function HomePage() {
  const [weather, setWeather] = useState([]);

  const fetchWeather = async () => {
    const response = await TestService.getWeather();
    setWeather(response.data);
  };

  const handleRequest = () => {
    fetchWeather();
  };

  return (
    <div>
      <Typography>Home page</Typography>
      <Button variant="contained" onClick={handleRequest}>
        request
      </Button>
      <div>
        <ul>
          {weather.map((item, key) => (
            <li key={key}>
              <p>Date: {item.date}</p>
              <p>Temperature C: {item.temperatureC}</p>
              <p>Temperature F: {item.temperatureF}</p>
              <p>Summary: {item.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
