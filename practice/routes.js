var fs = require("fs");
var http = require("http");

var server = http.createServer(function (req, res) {
  console.log(`Request made: ${req.url}`);

  if (req.url === "/home" || req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/home.html").pipe(res);
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/contact.html").pipe(res);
  } else if (req.url === "/api") {
    var myObj = [
      { name: "Praveen", age: 18 },
      {
        name: "John",
        age: 20,
      },
      { name: "George", age: 30 },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(myObj));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/404.html").pipe(res);
  }
});
server.listen(3001, "127.0.0.1");
console.log("Yessir, listening to port 3001 at http://127.0.0.1:3001");
