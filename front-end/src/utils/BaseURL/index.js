import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:5016/",
});

export default request;
