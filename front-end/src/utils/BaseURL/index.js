import axios from "axios";

const request = axios.create({
  baseURL: "https://localhost:7005/",
});

export default request;
