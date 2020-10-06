const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://node-user:7TIFCEwXaOnBgOf0@completenodejs-cluster0.wdl2t.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client => {
    console.log('Connected');
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log('Connect failed', err)
  });
};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'Database not found.'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
