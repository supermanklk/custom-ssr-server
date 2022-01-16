const express = require("express");
const app = express();
const port = 3000;
import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import Routes from "../Routes";
// import Home from "../containers/Home/index";

// express的中间件， public是根目录下的
// 以 .js 结尾的是静态文件
// static 代表的是静态
// static 是中间件
app.use(express.static("public"));

app.get("*", (req, res) => {
  //  location={req.path} 这个是必须的，原因是服务器端无法感觉浏览器的地址，所以需要获取地址
  const content = renderToString(
    <StaticRouter location={req.path} context={{}}>
      {Routes}
    </StaticRouter>
  );

  res.send(`
    <html>
      <head></head>
      <body>
        <h1>ssr</h1>
        <!--不要出现空格-->
        <div id='root'>${content}</div> 
        <script src='./index.js'></script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
