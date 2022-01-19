import { getStore } from "../store";
const express = require("express");
const app = express();
import proxy from "express-http-proxy";
import { render } from "./utils";
import { matchRoutes, Route, Routes } from "react-router-dom";
import routes from "../Routes";
const port = 3000;

// express的中间件， public是根目录下的
// 以 .js 结尾的是静态文件
// static 代表的是静态
// static 是中间件
app.use(express.static("public"));

// 代理服务器
// http://localhost:3000/api2/question/getQuestionList
// req.url = /question/getQuestionList
// https://kj.supermanklk.cn + proxyReqPathResolver()
// https://kj.supermanklk.cn + /question/getQuestionList
app.use(
  "/api2",
  proxy("https://kj.supermanklk.cn", {
    proxyReqPathResolver: function (req) {
      return req.url;
    },
  })
);

app.get("*", (req, res) => {
  const store = getStore();
  const matchedRoutes = matchRoutes(routes, req.path);
  const promises = [];
  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store));
    }
  });
  // Promise.all(promises).then(() => {
  res.send(render(store, routes, req));
  // });
});

// app.get("*", (req, res) => {
//   // matchRoutes(routes,)
//
//   // ssr本身没有处理异步数据的能力，因为 didmount本身不会被执行
//   const store = getStore();
//   // 此刻我们要在服务器返回html之前将store数据填充。
//   // 第一步，在对应首屏渲染的组件内增加 loadData方法
//   // 第二步，我们要知道当前要渲染那个组件的数据（当前应该获取哪些组件的数据）,此刻store里面到底应该填充什么，我们需要结合用户请求地址和路由做判断，
//   // 如果用户访问根目录，那么我们就要获取根目录所对应组件的数据
//   // 第三步，改造我们的路由, 根据路由的路径，往store里面加数据
//
//   // 如果此刻我们请求的路径与配置的路由匹配上我们进行保存
//   // const matchedRoutes = [];
//   // const promises = [];
//   // routes.some((route) => {
//   //   const match = matchPath(req.path, route.path);
//   //   if (match) {
//   //     matchedRoutes.push(route);
//   //   }
//   // });
//   // // 让 matchRoutes 里面所有的组件对应的loadData方法执行一次,获取每个组件所要的数据，然后让数据塞到store里面
//   // console.log("faith=============ssr要渲染数据匹配上的路径", matchedRoutes);
//
//   // 优化，因为 matchPath 只能匹配一层路由，所以要使用 matchRoutes
//   const matchedRoutes = matchRoutes(routes, req.path);
//   const promises = [];
//
//   // 让 matchRoutes 里面所有的组件对应的loadData方法执行一次,获取每个组件所要的数据，然后让数据塞到store里面
//   // console.log("faith=============ssr要渲染数据匹配上的路径", matchedRoutes);
//   // Promise.all(promises).then((data) => {});
//
//   // 解释 store.getState拿不到数据的原因
//   // matchedRoutes.forEach((item) => {
//   //   item.route.loadData && (item.route.loadData(store));
//   // });
//   // store.getState()); 是拿不到数据的，因为请求是异步的
//
//   matchedRoutes.forEach((item) => {
//     if (item.route.loadData) {
//       promises.push(item.route.loadData(store));
//     }
//   });
//
//   Promise.all(promises).then(() => {
//     res.send(render(store, routes, req));
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
