var http = require("http");

var server = http.createServer(function (req, res) {
    console.log(`Request made: ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/plain" });

  res.end("Hello Praveen, welcome to Node!");
});
server.listen(3000, "127.0.0.1");
console.log("Yessir, listening to port 3000 at http://127.0.0.1:3000");
