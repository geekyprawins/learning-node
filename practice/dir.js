var fs = require("fs");
// delete file
fs.unlink("writeme.txt");

// // create directories

fs.mkdirSync("newDir");
console.log("Deleting newDir.....");
fs.rmdirSync("newDir");

// async implementation

fs.mkdir("dir1", function () {
  fs.readFile("readme.txt", "utf8", function (err, data) {
    fs.writeFile("./dir1/writeMePls.txt", data, () => {});
  });
});

fs.unlink("./dir1/writeMePls.txt", function () {
  fs.rmdir("dir1");
}); 
