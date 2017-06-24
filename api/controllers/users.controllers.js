// const mongoose = require('mongoose');
// var User = mongoose.model('User');
//
// module.exports.getUserById = function(id, callback){
//   User.findById(id, callback);
// }
//
// module.exports.getUserByUsername = function(username, callback){
//   const query = {username: username}
//   User.findOne(query, callback);
// }
//
// module.exports.addUser = function(newUser, callback){
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//       if(err) throw err;
//       newUser.password = hash;
//       newUser.save(callback);
//     });
//   });
// }
//
// module.exports.comparePassword = function(candidatePassword, hash, callback){
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//     if(err) throw err;
//     callback(null, isMatch);
//   });
// }
