var fs=require('fs');

// read the file
var readMe = fs.readFileSync('./readme.txt',
'utf8'

);
console.log(readMe);
//write to file
fs.writeFileSync('writeme.txt',readMe);

// async version 
fs.readFile('./readme.txt',
'utf8', function(err, data){
    fs.writeFile('newWrite.txt', data,function(err, result) {
        if(err) console.log('error', err);
      });
});



