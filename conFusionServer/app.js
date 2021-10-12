var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var FileStore = require("session-file-store");
var passport = require("passport");
var authenticate = require("./authentication");
var config = require("./config");


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dishesRouter = require("./routes/dishRouter");
var promotionsRouter = require("./routes/promoRouter");
var leadersRouter = require("./routes/leaderRouter");
var uploadRouter = require("./routes/uploadRouter");

const mongoose = require("mongoose");
const Dishes = require("./dishes");
const url = config.mongoUrl;
const connect = mongoose.connect(url);


connect.then(
  (db) => {
    console.log("Connected to server!!!");
  },
  (err) => {
    console.log(err);
  }
);
var app = express();

app.all("*", (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(
      307,
      "https://" + req.hostname + ":" + app.get("secPort") + req.url
    );
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookies here
// app.use(cookieParser("123-456-789"));

app.use(passport.initialize());
// app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
// authentication middleware

app.use(express.static(path.join(__dirname, "public")));

app.use("/dishes", dishesRouter);
app.use("/promotions", promotionsRouter);
app.use("/leaders", leadersRouter);
app.use("/imageUpload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;