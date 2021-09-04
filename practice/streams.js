var http = require("http");
var fs = require("fs");
// readable stream

var myReadStream = fs.createReadStream(__dirname + "/dummy.txt", "utf8");
var myWriteStream = fs.createWriteStream(__dirname + "/writeMePlease.txt");

myReadStream.on("data", function (chunk) {
  console.log("New chunk received: \n");
  //   console.log(chunk);
  myWriteStream.write(chunk);
});

// writable stream
