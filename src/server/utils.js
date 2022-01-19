import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";

const render = (store, routes, req) => {
  // store 有2个方法， dispatch与getState
  const routerRender = (routes) => {
    return routes.map((item, index) => {
      return (
        <Route key={index} path={item.path} element={item.element}>
          {item.children ? routerRender(item.children) : null}
        </Route>
      );
    });
  };

  const content = renderToString(
    <Provider store={store}>
      {/*location={req.path} 这个是必须的，原因是服务器端无法感觉浏览器的地址，所以需要获取地址*/}
      <StaticRouter location={req.path} context={{}}>
        <Routes>{routerRender(routes)}</Routes>
      </StaticRouter>
    </Provider>
  );

  return `
    <html>
      <head></head>
      <body>
        <h1>ssr</h1>
        <div id='root'>${content}</div> 
        <script src='./index.js'></script>
      </body>
    </html>
  `;
};

export { render };
