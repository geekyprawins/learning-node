const assert = require("assert");

exports.insertDocument = (db, document, collection, callback) => {
  // create
  const coll = db.collection(collection);
  return coll.insertOne(document);
};

exports.findDocuments = (db, collection, callback) => {
  // read
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};
exports.removeDocument = (db, document, collection, callback) => {
  //delete
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};
exports.updateDocument = (db, document, update, collection, callback) => {
  //update
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};
