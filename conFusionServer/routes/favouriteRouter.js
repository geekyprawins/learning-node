const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Favourite = require("../models/favourite");
const authenticate = require("../authenticate");
const cors = require("./cors");
const favouriteRouter = express.Router();
favouriteRouter.use(bodyParser.json());

favoriteRouter.route("/")
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourite.findOne({ user: req.user._id })
    .populate("user")
    .populate("dishes")
    .then((favourite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favourite);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourite.findOne({ user: req.user._id })
    .then((favourite) => {
        if (favourite != null) {
            res.statusCode = 403;
            res.setHeader("Content-Type", "application/json");
            res.json({ message: "You already have a favourite" });
        } else {
            Favourite.create({ user: req.user._id })
            .then((favourite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favourite);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favourite");
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourite.findOneAndRemove({ user: req.user._id })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
}
);

favoriteRouter.route("/:dishId")
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourite.findOne({ user: req.user._id })
    .populate("user")
    .populate("dishes")
    .then((favourite) => {
        if (favourite != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favourite);
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.json({ message: "Favourite not found" });
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /favourite/" + req.params.dishId);
}
)
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourite.findOne({ user: req.user._id })
    .then((favourite) => {
        if (favourite != null) {
            favourite.dishes.push(req.params.dishId);
            favourite.save()
            .then((favourite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favourite);
            }, (err) => next(err))
            .catch((err) => next(err));
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.json({ message: "Favourite not found" });
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}
)
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourite.findOne({ user: req.user._id })
    .then((favourite) => {
        if (favourite != null) {
            favourite.dishes.remove(req.params.dishId);
            favourite.save()
            .then((favourite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favourite);
            }, (err) => next(err))
            .catch((err) => next(err));
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.json({ message: "Favourite not found" });
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}
);




