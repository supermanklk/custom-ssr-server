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
