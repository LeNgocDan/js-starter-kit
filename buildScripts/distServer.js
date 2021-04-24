import express from 'express';
import path from 'path';
import open from 'open';
import compression from "compression";

const port = 3000;
const app = express();

app.use(express.static("dist"));
app.use(compression());

/*
app.get("*", function (_req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
*/

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
