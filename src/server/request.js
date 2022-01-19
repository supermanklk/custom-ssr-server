import axios from "axios";

const instance = axios.create({
  baseURL: "https://kj.supermanklk.cn",
});

export default instance;
