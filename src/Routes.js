import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/index";

export default (
  <div>
    <Routes>
      <Route path="/" exact element={<Home />} />
    </Routes>
  </div>
);
