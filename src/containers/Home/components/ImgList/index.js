import React, { useContext } from "react";
import styles from "./index.css";
import useWithStyle from "../../../../HocComponent/useWithStyle";

// 这个组件主要验证ssr渲染时候css相互污染的问题
// 关联代码  src/server/utils.js
// 服务器渲染css，实现的原理类似与数据的注水与脱水
// const cssStr = context.css.length ? context.css.join("\n") : "";

const ImgList = ({}) => {
  // 这句话代表该组件支持ssr的css渲染
  styles && useWithStyle({ styles });

  return <div className={styles.colorBlue}>ImgList</div>;
};

export default ImgList;
