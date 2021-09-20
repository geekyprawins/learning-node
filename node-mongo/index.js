const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://127.0.0.1:27017/";
const dbName = "conFusion";
const dbOper = require("./operations.js");

MongoClient.connect(url)
  .then((err, client) => {
    assert.equal(err, null);
    console.log("Connected to MONGO DB");

    const db = client.db(dbName);

    //   const collection = db.collection("dishes");

    //   collection.insertOne(
    //     { name: "Noodles", description: "Long, non-sticky" },
    //     (err, result) => {
    //       assert.equal(err, null);

    //       console.log("After Insert:\n");
    //       console.log(result);

    //       collection.find({}).toArray((err, docs) => {
    //         assert.equal(err, null);
    //         console.log("Found:\n", docs);

    //         db.dropCollection("dishes", (err, result) => {
    //           assert.equal(err, null);
    //           client.close();
    //         });
    //       });
    //     }
    //   );

    // using dbOper
    dbOper
      .insertDocument(
        db,
        { name: "Manchuria", description: "Hot and juicy" },
        "dishes"
      )
      .then((result) => {
        console.log("Insert doc\n", result);

        return dbOper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found docs:\n", docs);

        return dbOper.updateDocument(
          db,
          { name: "Manchuria" },
          { description: "Spice N Ice" },
          "dishes"
        );
      })
      .then((result) => {
        console.log("Updated doc:\n", result.result);
        return dbOper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found:\n", docs);
        return db.dropCollection("dishes");
      })
      .then((result) => {
        console.log("Dropped collection : ", result);

        return client.close();
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
