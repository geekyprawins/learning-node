var express = require("express");
const bodyParser = require("body-parser");
var User = require("../models/user");

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user !== null) {
        res.status(400).send("Username already exists");
        next;
      } else {
        return User.create({
          username: req.body.username,
          password: req.body.password,
        });
      }
    })
    .then(
      (user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      },
      (err) => {
        next(err);
      }
    );
});

router.post("/login", (req, res, next) => {
  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error("Not authenticated");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }
    var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    var userName = auth[0];
    var password = auth[1];
    User.findOne({ username: userName })
      .then((user) => {
        if (user === null) {
          var err = new Error("User not found");
          err.status = 403;
          return next(err);
        } else if (user.password !== password) {
          var err = new Error("Wrong password");
          err.status = 403;
          return next(err);
        } else if (user.username === userName && user.password === password) {
          // res.cookie("user", "admin", { signed: true });
          req.session.user = "authenticated";
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(user);
        }
      })
      .catch((err) => next);
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(req.session.user);
  }
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in");
    err.status = 403;
    return next(err);
  }
});

module.exports = router;
