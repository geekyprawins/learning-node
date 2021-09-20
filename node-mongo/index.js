const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://127.0.0.1:27017/";
const dbName = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log("Connected to MONGO DB");

  const db = client.db(dbName);

  const collection = db.collection("dishes");

  collection.insertOne(
    { name: "Noodles", description: "Long, non-sticky" },
    (err, result) => {
      assert.equal(err, null);

      console.log("After Insert:\n");
      console.log(result);

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("Found:\n", docs);

        db.dropCollection("dishes", (err, result) => {
          assert.equal(err, null);
          client.close();
        });
      });
    }
  );
});
