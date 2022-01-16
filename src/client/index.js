import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Routes from "../Routes";
import thunk from "redux-thunk";

const reducer = (state = { name: "faith" }, action) => {
  return state;
};
const store = createStore(reducer, applyMiddleware(thunk));
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>{Routes}</BrowserRouter>
    </Provider>
  );
};

ReactDom.hydrate(<App />, document.getElementById("root"));
