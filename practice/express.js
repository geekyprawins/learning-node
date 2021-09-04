var express = require("express");
var bodyParser= require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })


console.log("Listening began at http://127.0.0.1:2020");

// ejs
app.set('view engine', 'ejs');

// middleware and static files
app.use('/assets', express.static('assets'));

// routing
app.get("/", function (req, res) {
  //   res.send("This is the home page!!!!!!");
//   res.sendFile(__dirname + "/home.html");
res.render('home');
});

app.get("/contact", function (req, res) {
//   res.send("This is the contact page!!!");

// query strings

console.log(req.query);
res.render('contact', {qs: req.query});

});
// post requests
app.post("/contact",urlencodedParser, function (req, res) {
   
   console.log(req.body);
    res.render('contact-success', {data: req.body});
    
    });

// route parameters
app.get("/profile/:name", function (req, res) {
//   res.send("You wanted to see a profile with name of : " + req.params.name);
var data={age: 18, job:'Student',
hobbies: ['eating', 'sleeping', 'coding']
};
res.render('profile', {person: req.params.name, data: data});

});
app.listen(2020);



