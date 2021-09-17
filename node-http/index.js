const http = require("http");
const hostname = "localhost";
const port = 3000;
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // console.log(req.headers);
  console.log("Request for " + req.url + " by method " + req.method);
  if (req.method == "GET") {
    var fileUrl;
    if (req.url == "/") {
      fileUrl = "/index.html";
    } else {
      fileUrl = req.url;
    }
    var filePath = path.resolve("./public" + fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == ".html") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.end("404 Not Found");
          return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        // res.end("<html><body><h1>WELCOME NODE JS</h1></body></html>");
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        "<html><body><h1>Error 404: " +
          fileUrl +
          " not a HTML file</h1></body></html>"
      );
    }
  } else {
    res.statusCode = 404;
    res.end("404 Not Found/NOT SUPPORTED");
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
