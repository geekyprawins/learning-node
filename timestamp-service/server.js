// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// actual codeblock
app.get('/api/:date?', (req,res) =>{

// better approach
const date = req.params.date;
let dt;
if(!date){

  dt = new Date();
}
else {

if(!isNaN(date)){

dt = new Date(parseInt(date));

}
else {
  dt = new Date(date);
}

}

if(dt.toString()=== 'Invalid Date'){

  res.json({error: dt.toString()});
}
else {

  res.json({'unix': dt.getTime() , 'utc' : dt.toUTCString()});
}

  // let date = new Date(date);

// res.send(date_num.toString());

// res.send(date);

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
// var date = req.params.date;
// // console.log(typeof date);
// if(!Number(date)){
// var date_num= new Date(date).getTime();
// var date_final = new Date(date_num);
// // res.send(date_final);
//   // unix_time= date;
//   // utc_time = new Date(unix_time * 1000);
//   res.json({'unix': date_num , 'utc': date_final});
//   }
//   // Thu, 01 Jan 1970 00:00:00 GMT
//   else
//   { 
//     var dateObject = new Date(Number(date));
//     var date_final = dateObject.toLocaleString("en-US", {weekday: "short"})+', '
//     +dateObject.toLocaleString("en-US", {day: "numeric"})+' '
//     +dateObject.toLocaleString("en-US", {month: "short"})+' '
//     +dateObject.toLocaleString("en-US", {year: "numeric"})+ ' '
//     + dateObject.toLocaleString("en-US", {hour: "numeric"}).slice(0,2)+':'
//     +
// dateObject.toLocaleString("en-US", {minute: "numeric"}) +':'+
// dateObject.toLocaleString("en-US", {second: "numeric"}) +' GMT' ; 
//     res.json({'unix':date,'utc': date_final});