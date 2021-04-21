import path from "path";

export default {
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: "bundle.js",
  },
  plugins: [],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
};
