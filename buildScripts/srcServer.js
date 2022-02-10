import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3002;
const app = express();
const compiler = webpack(config);

app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.get("/users", (_req, res) => {
  res.json([
    { "id": 1, "firstName": "Le Ngoc", "lastName": "Dan", "email": "dan@gmail.com" },
    { "id": 2, "firstName": "Le Quang", "lastName": "Nhat", "email": "nhat@gmail.com" }
  ]);
})

app.get('/', function (_req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
