import React from "react";
import ReactDom from "react-dom";
import Home from "../containers/Home";
import { BrowserRouter } from "react-router-dom";
import Routes from "../Routes";

const App = () => {
  return <BrowserRouter>{Routes}</BrowserRouter>;
};

ReactDom.hydrate(<App />, document.getElementById("root"));
