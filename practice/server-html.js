var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
  console.log(`requested url is ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/html" });
  var myReadStream = fs.createReadStream(__dirname + "/home.html", "utf8");
  myReadStream.pipe(res);
});
server.listen(2000, "127.0.0.1");
console.log("Listening service began at http://127.0.0.1:2000");
