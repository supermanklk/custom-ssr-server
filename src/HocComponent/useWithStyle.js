import React, { useContext } from "react";
import { isBrowser } from "../utils";
import HttpContext from "../server/httpContext";

const useWithStyle = ({ styles }) => {
  let context = useContext(HttpContext);
  // 这段代码只在ssr上执行
  if (!isBrowser()) {
    // 拿到在 server/utils内定义的context （src/server/utils.js）
    // 主要是做 404 页面
    console.log("faith=============", styles);
    context.staticContext.css.push(styles._getCss());
  }

  return null;
};

export default useWithStyle;
