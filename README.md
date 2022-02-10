###环境依赖
node v14.18.1+

npm v6.14.15+

### 欢迎访问
https://ssr.supermanklk.cn/

###部署启动
1. 安装全部变量
   nodemon 2.0.15
2. npm install  //安装node运行环境
3. npm run dev


###特性
1、React 
2、Redux 
3、SSR 
4、Express 
5、路由



###V1.0.0 版本内容更新
1. 新功能     ccccccccc
2. 新功能     ddddddddd

### FAQ: ssr渲染会遇见什么问题以及对应的解决方案？

# SSR 原理与实践

名词解释：

`TTFP`： 首屏展示事件


CSR

弊端：TTFP、SEO

解决：把单页面应用改成服务器端渲染的应用

现在主流的服务端渲染框架：Nuxt.js(Vue)  Next.js(React)

本教程主要内容：从0开始搭建React技术栈下的SSR框架

安装

```less
$: mkdir server
$: cd server
$: npm init 
$: npm install express --save
```

node对ES6的支持是非常好的

服务器渲染就是页面在服务器已经被渲染好了，服务器知识把它返回。

传统的React应用是客户端渲染，是由js渲染出来的。

CSR


浏览器发送请求

服务器返回HTML

浏览器发送bundle.js请求

服务器返回bundle.js

浏览器执行bundle.js中的React代码

SSR

浏览器发送请求

服务器运行React代码生成页面

服务器返回页面

---


在服务器端写React的代码

首先要安装React

```less
npm install react --save
```

此刻还不能运行react的代码，默认node下只支持conmon.js模块。

但是React的语法是esModule的语法。

就算你的代码写成如下也不能在服务器端运行，因为在react里面我们用了jsx的语法。这种语法也通过webpack编译打包之后才能正常的运行。但是此刻我们的项目里面根本没有做任何webpack的配置。

```less
// import React from "react";
const React = require("react");

const Home = () => {
  return <div>home</div>;
};

module.exports = {
  default: Home,
};
// export default Home;
```

服务器端webpack的配置

package.json

```
"scripts": {
  "start": "node ./src/index.js"
},
```

```less
$: npm install webpack webpack-cli ---save

```

webpack.server.js

```less
const Path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  target: "node",
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: Path.resolve(__dirname, "build"),
  },
  externals: [nodeExternals()], // 防止react代码里面有node modules的模块不用处理，比如 express
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "react",
            "stage-0",
            [
              "env",
              {
                targets: {
                  browsers: ["last 2 versions"],
                },
              },
            ],
          ],
        },
      },
    ],
  },
};
```

因为我们现在已经引入了webpack打包所以以下代码就可以改写

```less
const express = require("express")
改写为
import express from "express";
```

```less
const React = require("react");

const Home = () => {
  return <div>home</div>;
};

export default Home;
```

### 建立在虚拟DOM上的服务器渲染

//客户端渲染
// React代码在浏览器上执行,消耗的是用户浏览器的性能
//服务器端渲染
// React代码在服务器上执行,消耗的是服务器端的性能

### webpack 的自动打包与服务器自动重启

解决在修改代码之后页面自动刷新



watch 是监听，就是监听 webpack 配置的 entry 入口文件以及该文件的依赖文件，只要检测到有变化 webpack都会帮你重新的编译一次。

```less
"build": "webpack --config webpack.server.js --watch"
```

服务器自动重启

```less
$: sudo npm install nodemon -g
```

```less

"start": "nodemon build && node \"./build/bundle.js\"" , // nodemon会监听 build目录是否有变化，如果有变化就重新执行 node ./build/bundle.js 【\" 转译】

"start": "node ./build/bundle.js",
```

## 使用npm-run-all提升开发效率



```less
$: npm install npm-run-all -g
```

## 什么是同构？

同构:一套React代码,在服务器端执行一次,再客户端再执行一次

```less
const React = require("react");
const Home = () => {
  return (
    <div>
      <div>welcome to my home!!</div>
      <button
        onClick={() => {
          alert("click");
        }}
      >
        click
      </button>
    </div>
  );
};
export default Home;
```



以下警告⚠️的原因是我们在做同构的时候，在cline渲染的时候就不要再用 ReactDom.render() , 而是要用 `hydrate`



## 服务器端渲染中的路由 staticRouter



安装路由

commit提交详情

[https://github.com/supermanklk/custom-ssr-server/commit/05db3201383f8ef9073f8d8c97fa8f629e9b0dae](https://github.com/supermanklk/custom-ssr-server/commit/05db3201383f8ef9073f8d8c97fa8f629e9b0dae)

```less
$:npm install react-router-dom --save
```

服务器渲染只发生在我们第一次进入页面的时候

只有我们访问的第一个页面才会发生服务器渲染，之后所有的页面以及路由都是被浏览器接管

## 同构项目引入redux

```less
componentDidMount 不会在服务器渲染中执行
componentWillMount 会在服务器渲染中执行
```

# 服务器的数据渲染（重点）

react-router-dom 针对ssr渲染数据获取的解决方案：

[https://v5.reactrouter.com/web/guides/server-rendering](https://v5.reactrouter.com/web/guides/server-rendering)

## 服务器渲染异步获取数据常见的问题？

1、 favicon处理，浏览器会偷偷发一个请求 favicon的请求，这个请求会到我们的接口里面，解决就是在public下面放一个图标。

2、多级路由问题处理

## react-router-dom的matchPath与react-router-config的 matchRoutes的区别、应该使用那个？

`使用`

`区别`  matchPath是匹配的外层路由， matchRoutes会匹配嵌套路由。

ps：目前 react-router-dom v6 已经支持 matchRoutes 了，之前是用的第三方的 react-router-config的 matchRoutes。

## 数据的脱水与注水

> *为什么在服务器做了数据渲染，打开页面会先白一会之后再出现数据。 而把页面javascript禁止掉就瞬间出来了？*
>

闪白屏的效果图
[http://faith-2021-001.oss-cn-hangzhou.aliyuncs.com/20220119/1642568511227845.gif](http://faith-2021-001.oss-cn-hangzhou.aliyuncs.com/20220119/1642568511227845.gif)

`1、服务器ssr渲染时候已经加载了要渲染的数据
2、到客户端页面会重新渲染，此刻拿到的store是客户端的，此刻会空，因此页面会白
3、接下来客户端再渲染，拿到数据再渲染`



`数据脱水`

/Users/xxxxxxxx/Desktop/xxxxxx/xxxxxx/server/src/store/index.js

```jsx
export const getClientStore = () => {
  // 数据脱水
  // 我们把存储在window上的数据直接拿来用
  const defaultStore = window.context.state;
  return createStore(reducer, defaultStore, applyMiddleware(thunk));
};
```

`数据注水`

/Users/xxxxx/Desktop/xxxxxx/xxxxxxxx_project/server/src/server/utils.js

```jsx
return `
    <html>
      <head></head>
      <body>
        <h1>ssr</h1>
        <div id='root'>${content}</div>
        <!--数据注水 -->
        <script>
          window.context = {
            state: ${JSON.stringify(store.getState())}
          }
        </script>
        <script src='./index.js'></script>
      </body>
    </html>
  `;
```

## 引入代理服务器 express-http-proxy

## 服务器端请求和客户端请求不同处理

## 异步数据请求什么情况需要在client和server端都请求？ 什么时候只需要在server端请求？

1、如果一个组件始终在页面展示，比如header组件，不管怎样切换路由，都会被展示，那么该组件的数据请求只需要在server端请求就可以，就是loadData。

2、如果一个页面路由分为 【新闻、音乐、主页】， 那么他们都要在server和client执行，原因是如果首次渲染访问了音乐，那么此刻新闻就没被渲染，切换到新闻的时候就是本地client加载数据了。

SEO



1、title与 description的真正作用？
目前三代浏览器 title与 description 对网站的搜索引擎优化占了很少一部分的作用，它们的用处主要是用户搜到之后通过【更丰富的标题】与【更加详细的描述】增加点击率

2、如何做好SEO

```jsx
文字优化
1、原创，中文翻译英文，翻译德语，翻译中文。

链接优化
1、链接上都是一类的网站， 比如你的教育网站，链接到游戏网站就不好。 链接分为外链与内链。 内链都是和网站相关的， 增加外链，别人的网站上有你的网站链接。

多媒体
1、图片高清、原创。 现在浏览器其实已经有识别媒体的能力。

```

3、通过 react-helmet 动态title与description

[https://github.com/nfl/react-helmet](https://github.com/nfl/react-helmet)

```jsx

客户端使用

import React from "react";
import {Helmet} from "react-helmet";

class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            ...
        </div>
    );
  }
};

Server Usage 服务器使用

```

