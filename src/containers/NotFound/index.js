import React, { useContext } from "react";
import HttpContext from "../../server/httpContext";

const NotFound = (props) => {
  let context = useContext(HttpContext);
  // 拿到在 server/utils内定义的context （src/server/utils.js）
  // 主要是做 404 页面
  console.log("faith=============", context);
  return <div>404, sorry,NotFound</div>;
};

export default NotFound;
