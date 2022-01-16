const express = require("express");
const app = express();
import { render } from "./utils";

const port = 3000;

// express的中间件， public是根目录下的
// 以 .js 结尾的是静态文件
// static 代表的是静态
// static 是中间件
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.send(render(req));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
