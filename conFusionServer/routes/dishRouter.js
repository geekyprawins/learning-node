const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Dishes = require("../dishes");

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    Dishes.find({})
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    // res.end("DISHES");
  })
  .post((req, res, next) => {
    Dishes.create(req.body)
      .then(
        (dish) => {
          console.log("Dish created ", dish);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
    // res.end(
    //   "Will add the dish: " +
    //     req.body.name +
    //     " with details: " +
    //     req.body.description
    // );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT not supported");
  })
  .delete((req, res, next) => {
    Dishes.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    // res.end("Deleting the dishes");
  });

dishRouter
  .route("/:dishId")
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        (dish) => {
          console.log("Dish created ", dish);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    res.end("Sending details of dish: " + req.params.dishId);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST not supported");
  })
  .put((req, res, next) => {
    Dishes.findByIdAndUpdate(
      req.params.dishId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (dish) => {
          console.log("Dish created ", dish);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    // res.write("Updating the dish " + req.params.dishId);
    // res.end(
    //   "Will update the dish " + req.body.name + " with " + req.body.description
    // );
  })
  .delete((req, res, next) => {
    Dishes.findByIdAndDelete(req.params.dishId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    // res.end("Deleting the dish: " + req.params.dishId);
  });

// COMMENTS Handling

dishRouter
  .route("/:dishId/comments")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        (dish) => {
          if (dish != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish.comments);
          } else {
            err = new Error("Dish " + req.params.dishId + " not exits");
            err.statusCode = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    // res.end("DISHES");
  })
  .post((req, res, next) => {
    Dishes.findById(req.body)
      .then(
        (dish) => {
          if (dish != null) {
            dish.comments.push(req.body);
            dish.save().then((dish) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(dish);
            });
          } else {
            err = new Error("Dish " + req.params.dishId + " not exits");
            err.statusCode = 404;
            return next(err);
          }

          // console.log("Dish created ", dish);
          // res.statusCode = 200;
          // res.setHeader("Content-Type", "application/json");
          // res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
    // res.end(
    //   "Will add the dish: " +
    //     req.body.name +
    //     " with details: " +
    //     req.body.description
    // );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT not supported");
  })
  .delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        (dish) => {
          if (dish != null) {
            dish.comments.push(req.body);
            for (var i = dish.comments.length - 1; i >= 0; i--) {
              dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save().then((dish) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(dish);
            });
          } else {
            err = new Error("Dish " + req.params.dishId + " not exits");
            err.statusCode = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    // res.end("Deleting the dishes");
  });
// ***************** // 

dishRouter
  .route("/:dishId/comments/:commentId")
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        (dish) => {
          if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish.comments.id(req.params.commentId));
          } else if (dish == null) {
            err = new Error("Dish " + req.params.dishId + " not exits");
            err.statusCode = 404;
            return next(err);
          } else {
            err = new Error("Dish " + req.params.commentId + " not exits");
            err.statusCode = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    // res.end("Sending details of dish: " + req.params.dishId);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST not supported");
  })
  .put((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        (dish) => {
          if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
              dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
              dish.comments.id(req.params.commentId).comment = req.body.comment;
            }

            dish.save().then(
              (dish) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(dish);
              },
              (err) => next(err)
            );
          } else if (dish == null) {
            err = new Error("Dish " + req.params.dishId + " not exits");
            err.statusCode = 404;
            return next(err);
          } else {
            err = new Error("Dish " + req.params.commentId + " not exits");
            err.statusCode = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        (dish) => {
          if (dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.push(req.body);
            for (var i = dish.comments.length - 1; i >= 0; i--) {
              dish.comments.id(req.params.commentId).remove();
            }
            dish.save().then((dish) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(dish);
            });
          } else if (dish == null) {
            err = new Error("Dish " + req.params.dishId + " not exits");
            err.statusCode = 404;
            return next(err);
          } else {
            err = new Error("Dish " + req.params.commentId + " not exits");
            err.statusCode = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    // res.end("Deleting the dish: " + req.params.dishId);
  });
module.exports = dishRouter;
