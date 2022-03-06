import express from 'express';
import path from 'path';
import chalk from 'chalk';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.get('/', function (_req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console(err);
  } else {
    console.log(chalk.green("Start app in dev mode..."));
    open(`http://localhost:${port}`);
  }
});
