const Path = require("path");
const nodeExternals = require("webpack-node-externals");
const { merge } = require("webpack-merge");
const config = require("./webpack.base");

const serverConfig = {
  target: "node",
  mode: "development",
  entry: "./src/server/index.js",
  output: {
    filename: "bundle.js",
    path: Path.resolve(__dirname, "build"),
  },
  externals: [nodeExternals()], // 防止react代码里面有node modules的模块不用处理，比如 express
};

module.exports = merge(config, serverConfig);
