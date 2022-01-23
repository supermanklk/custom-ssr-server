import React, { useContext } from "react";
import styles from "./index.css";
import HttpContext from "../../../../server/httpContext";
import { isBrowser } from "../../../../utils";

// 这个组件主要验证ssr渲染时候css相互污染的问题
// 关联代码  src/server/utils.js
// 服务器渲染css，实现的原理类似与数据的注水与脱水
// const cssStr = context.css.length ? context.css.join("\n") : "";

const ImgList = ({}) => {
  let context = useContext(HttpContext);
  // 这段代码只在ssr上执行
  if (!isBrowser()) {
    // 拿到在 server/utils内定义的context （src/server/utils.js）
    // 主要是做 404 页面
    console.log("faith=============", styles);
    context.staticContext.css.push(styles._getCss());
  }

  return <div className={styles.colorBlue}>ImgList</div>;
};

export default ImgList;
