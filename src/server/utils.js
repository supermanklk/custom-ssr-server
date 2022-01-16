import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Routes from "../Routes";

const render = (req) => {
  //  location={req.path} 这个是必须的，原因是服务器端无法感觉浏览器的地址，所以需要获取地址

  const reducer = (state = { name: "faith" }, action) => {
    return state;
  };

  const store = createStore(reducer, applyMiddleware(thunk));
  const content = renderToString(
    <Provider store={store}>
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
