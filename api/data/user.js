const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//var Book = require('./books.model')
var TradeBook = require('./tradeBooks.model.js')
const config = require('../../config/database');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TradeBook = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  authors : {
    type : [String],
    required : true
  },
  imageUrl : {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    required: true
  },
  userRequestingTrade: {
    type: ObjectId
  },
  traded : {
    type: Boolean,
    default: false
  }
});
// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  city: String,
  state: String,
  books: {
    type: [TradeBook],
    default: []
  },
  // traded: {
  //   type: [Boolean],
  //   default: []
  // }
});


//const User = module.exports = mongoose.model('User', UserSchema)
var User = mongoose.model('User', UserSchema)
module.exports = User

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
  const query = {email: email}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

// module.exports.changePassword = function() {
//   User.fin
// }

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
