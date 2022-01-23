import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import HttpContext from "./httpContext";

const render = (store, routes, req, context) => {
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

  const staticContext = { staticContext: context };

  const content = renderToString(
    <Provider store={store}>
      {/*location={req.path} 这个是必须的，原因是服务器端无法感觉浏览器的地址，所以需要获取地址*/}
      <HttpContext.Provider value={staticContext}>
        <StaticRouter location={req.path}>
          <Routes>{routerRender(routes)}</Routes>
        </StaticRouter>
      </HttpContext.Provider>
    </Provider>
  );
  // 服务器渲染css，实现的原理类似与数据的注水与脱水
  const cssStr = context.css.length ? context.css.join("\n") : "";

  return `
    <html>
      <head>
      <title>怪我过分执迷</title>
      <meta name="description" content="全球领先的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。">
      <style>${cssStr}</style> 
      </head>
      <body>
        <h1>ssr</h1>
        <div id='root'>${content}</div>
        <!--数据注水 -->
        <script>
          window.context = {
            state: ${JSON.stringify(store.getState())}
          }
        </script>
        <script src='./index.js'></script>
      </body>
    </html>
  `;
};

export { render };
