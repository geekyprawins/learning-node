var http = require("http");
var fs= require('fs');
var server = http.createServer(function (req, res) {
    console.log(`Request made: ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/plain" });

var myReadStream = fs.createReadStream(__dirname+'/dummy.txt','utf8');
myReadStream.pipe(res);
// since res is writestream, remove res.end()
});
server.listen(8081, "127.0.0.1");
console.log("Yessir, listening to port 8081 at http://127.0.0.1:8081");
