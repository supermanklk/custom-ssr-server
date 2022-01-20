import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/index";
import JKSister from "./containers/Tang/index";
import IntroduceMe from "./containers/IntroduceMe/index";
import Header from "./components/Header/index";

export default [
  {
    key: "home",
    path: "/",
    element: (
      <div>
        <Header />
        <Outlet />
      </div>
    ),
    exact: true, // 精确匹配

    children: [
      {
        key: "ttt",
        path: "/ttt",
        element: <IntroduceMe />,
        exact: true, // 精确匹配
        // loadData: Home.loadData,
      },
      {
        key: "main",
        path: "/",
        element: <Home />,
        exact: true, // 精确匹配
        loadData: Home.loadData, // 如果有 Home.loadData 说明是ssr时候要展示组件的数据
        // loadData: Home.loadData,
      },
    ],
  },
  {
    key: "jk",
    path: "/jk",
    element: <JKSister />,
    exact: true, // 精确匹配
    // loadData: Home.loadData,
  },
];

// 这种写法不适合解决ssr服务器数据渲染的能力
// export default (
//   <div>
//     <Routes>
//       <Route path="/" exact element={<Home />} />
//       <Route path="/jk" exact element={<JKSister />} />
//     </Routes>
//   </div>
// );
