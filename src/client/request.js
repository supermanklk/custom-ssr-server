import axios from "axios";

const instance = axios.create({
  baseURL: "/",
  params: {
    secret: "faith",
  },
});

export default instance;
