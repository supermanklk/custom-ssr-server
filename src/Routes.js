import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/index";
import JKSister from "./containers/Tang/index";

export default (
  <div>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/jk" exact element={<JKSister />} />
    </Routes>
  </div>
);
