var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
  console.log(`requested url is ${req.url}`);
  res.writeHead(200, { "Content-Type": "application/json" });

  var myObject = {
    name: "Praveen",
    age: 18,
    work: "Student",
    country: "India",
  };

  res.end(JSON.stringify(myObject));
});
server.listen(2001, "127.0.0.1");
console.log("Listening service began at http://127.0.0.1:2001");
