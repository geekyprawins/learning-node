var express = require("express");
const bodyParser = require("body-parser");
var User = require("../models/user");
var passport = require("passport");
var router = express.Router();
var authentication = require("../authentication");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", function (req, res, next) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    }
  ); // end of User.register
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    var token = authentication.getToken({ _id: req.user._id });
    res.status(200).json({
      success: true,
      token: token,
      status: "Login successful!",
    });
  });
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
