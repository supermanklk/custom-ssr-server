const express = require("express");
const app = express();
const port = 3000;
import Home from "./containers/Home/index";
import React from "react";
import { renderToString } from "react-dom/server";

const content = renderToString(<Home />);

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head></head>
      <body>
        <h1>ssr</h1>
        ${content}
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
