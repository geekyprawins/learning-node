const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";

const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected to server!!");

  Dishes.create({
    name: "Pizza",
    description: "Cheezy and topped!",
  })
    .then((dish) => {
      console.log(dish);
      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: {
            description: "Updated dish",
          },
        },
        {
          new: true,
        }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);
      dish.comments.push({
        rating: 5,
        comment: "I am grrot",
        author: "Praveen  Varma",
      });

      return dish.save();
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.deleteMany({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
