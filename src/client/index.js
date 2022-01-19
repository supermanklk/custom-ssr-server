import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "../Routes";
import getStore from "../store";

const routerRender = (routes) => {
  return routes.map((item, index) => {
    return (
      <Route key={index} path={item.path} element={item.element}>
        {item.children ? routerRender(item.children) : null}
      </Route>
    );
  });
};

const App = () => {
  return (
    <Provider store={getStore()}>
      <BrowserRouter>
        {/*{Routes}*/}
        <Routes>
          {routerRender(routes)}
          {/*{routes.map((route) => (*/}
          {/*  <Route {...route} />*/}
          {/*))}*/}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

ReactDom.hydrate(<App />, document.getElementById("root"));
