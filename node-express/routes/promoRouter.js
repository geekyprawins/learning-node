const express = require("express");

const bodyParser = require("body-parser");
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Promotions");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the promo: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT not supported");
  })
  .delete((req, res, next) => {
    res.end("Deleting the promotions");
  });

promoRouter
  .route("/:promoId")
  .get((req, res, next) => {
    res.end("Sending details of promotion: " + req.params.promoId);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST not supported");
  })
  .put((req, res, next) => {
    res.write("Updating the dish " + req.params.promoId);
    res.end(
      "Will update the promo " + req.body.name + " with " + req.body.description
    );
  })
  .delete((req, res, next) => {
    res.end("Deleting the promo: " + req.params.promoId);
  });
module.exports = promoRouter;
