import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/index";
import JKSister from "./containers/Tang/index";
import IntroduceMe from "./containers/IntroduceMe/index";

export default [
  {
    key: "home",
    path: "/",
    // <Outlet />组件是一个视图窗口，单单这么讲比较抽象。他其实就是当你使用嵌套路由的时候，子组件的渲染窗口。用过Vue的人都知道，vue的router是有嵌套路由的，
    // 但是react在v6之前都没有一个比较简单方便的路由，他的嵌套路由实现是用组件套路由方式实现。现在有了嵌套路由后就方便很多，跟vue的路由一样，使用起来得心应手，
    // 也比较符合逻辑。<Outlet />就提供了在父页面的路由的一个子页面渲染窗口，也就是说，当路由找到子页面后，会通过<Outlet />渲染到页面上
    // element: (
    //   <div>
    //     <Home></Home>
    //     <Outlet /> //
    //   </div>
    // ),
    element: (
      <div>
        <Home></Home>
        <Outlet />
      </div>
    ),
    exact: true, // 精确匹配
    loadData: Home.loadData, // 如果有 Home.loadData 说明是ssr时候要展示组件的数据
    children: [
      {
        key: "ttt",
        path: "/ttt",
        element: <IntroduceMe />,
        exact: true, // 精确匹配
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
