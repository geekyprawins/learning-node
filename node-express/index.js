const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const hostname = "localhost";
const port = 3000;
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(bodyParser.json());
const dishRouter = require('./routes/dish-router')
app.use('/dishes', dishRouter)
// another
app.get("/dishes/:dishId", (req, res, next) => {
  res.end("Sending details of dish: " + req.params.dishId);
});
app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;
  res.end("POST not supported");
});
app.put("/dishes/:dishId", (req, res, next) => {
  res.write("Updating the dish " + req.params.dishId);
  res.end(
    "Will update the dish " + req.body.name + "with " + req.body.description
  );
});
app.delete("/dishes/:dishId", (req, res, next) => {
  res.end("Deleting the dish: " + req.params.dishId);
});

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  //   console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello Peter");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:3000`);
});
