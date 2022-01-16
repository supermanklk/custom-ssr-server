import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import Routes from "../Routes";
import getStore from "../store";

const render = (req) => {
  const content = renderToString(
    <Provider store={getStore()}>
      {/*location={req.path} 这个是必须的，原因是服务器端无法感觉浏览器的地址，所以需要获取地址*/}
      <StaticRouter location={req.path} context={{}}>
        {Routes}
      </StaticRouter>
    </Provider>
  );

  return `
    <html>
      <head></head>
      <body>
        <h1>ssr</h1>
        <!--不要出现空格-->
        <div id='root'>${content}</div> 
        <script src='./index.js'></script>
      </body>
    </html>
  `;
};

export { render };
