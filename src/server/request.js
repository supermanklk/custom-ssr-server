import axios from "axios";
import config from "../config";

const { year } = config;
// const instance = axios.create({
//   baseURL: "https://kj.supermanklk.cn",
// });

// createInstance 较 instance 区别是，能够解决服务器请求数据不携带cookie的问题
const createInstance = (req) =>
  axios.create({
    baseURL: "https://kj.supermanklk.cn",
    headers: {
      cookie: req.get("cookie") || "",
    },
    params: {
      secret: "faith",
      year,
    },
  });

export default createInstance;
