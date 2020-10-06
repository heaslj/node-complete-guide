const mongodb = require("mongodb");
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, id) {
    this.name = username;
    this.email = email;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let saveOp;

    if (_id) {
      saveOp = db.collection('users')
        .createOne({ _id: _id }, this);
    } else {
      // wait for update implementation
    }
    saveOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users')
      .findOne(new mongodb.ObjectId(userId))
      .then(user => {
        console.log('findById: ', user);
        return user;
      })
      .catch(err => {
        console.log(err);
      })
  }
};

module.exports = User;
