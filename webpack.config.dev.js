const webpack = require('webpack');
import common from './webpack.common';
import merge from 'webpack-merge';

export default merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    })
  ],
});
