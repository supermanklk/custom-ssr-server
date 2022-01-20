import axios from "axios";
import config from "../config";
const { year } = config;
const instance = axios.create({
  baseURL: "/",
  params: {
    secret: "faith",
    year,
  },
});

export default instance;
