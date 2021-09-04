var http = require("http");
var fs = require("fs");
// readable stream

var myReadStream = fs.createReadStream(__dirname + "/dummy.txt", "utf8");
var myWriteStream = fs.createWriteStream(__dirname + "/writeMePlease.txt");

// pipe
myReadStream.pipe(myWriteStream);
