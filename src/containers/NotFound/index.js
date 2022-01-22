import React, { useContext } from "react";
import HttpContext from "../../server/httpContext";
import { isBrowser } from "../../utils/index";

const NotFound = (props) => {
  let context = useContext(HttpContext);

  // 这段代码只在ssr上执行
  if (!isBrowser()) {
    // 拿到在 server/utils内定义的context （src/server/utils.js）
    // 主要是做 404 页面
    context.staticContext.NotFound = true;
  }

  return <div>404, sorry,NotFound</div>;
};

export default NotFound;
