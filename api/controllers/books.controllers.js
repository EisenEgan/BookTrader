var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var TradeBook = mongoose.model('TradeBook')
var User = mongoose.model('User')
var ObjectID = require('mongodb').ObjectID

module.exports.bookFindOne = function(req, res) {
  Book.find({$text: {$search: req.body.term}})
      .limit(1)
      .exec(function(err, book) {
        if (err) {
          console.log(err)
          res.status(500).json({success: false, error: 'Something went wrong.'})
        } else if (!book) {
          res.status(404).json({success: false, error: 'No results found'})
        } else {
          res.status(200).json({success: true, book: book})
        }
      })
}

module.exports.findAndAddBook = function(req, res) {
  var user = req.body.user
  Book.findOne({$text: {$search: req.body.term}})
      //.limit(1)
      .exec(function(err, book) {
        if (err) {
          res.status(500).json({success: false, error: 'Something went wrong.'})
        } else if (!book) {
          res.status(404).json({success: false, error: 'No results found'})
        } else {
          User.findById(user._id).exec((err, user) => {
            //delete user.books
            var newBook = {
              title: book.title,
              imageUrl: book.imageUrl,
              authors: book.authors,
              user: user._id
            }
            var tradeBook = new TradeBook(newBook)
            user.books.push(tradeBook)
            user.save((err) => {
              if (err) {
                res.status(500).json({success:false, error: 'Something went wrong'})
              } else {
                tradeBook.save((err) => {
                  if (err) {
                    res.status(500).json({success:false, error: 'Something went wrong'})
                  } else {
                    res.status(200).json({success:true, user: user})
                  }
                })
              }
            })
          })
          //res.status(200).json({success: true, book: book})
        }
      })
}

module.exports.getAllBooks = function(req, res) {
  TradeBook
    .find()
    .exec(function(err, books) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(books);
      }
    });
}

module.exports.removeBook = function(req, res) {
//   Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }, function (err, tank) {
//   if (err) return handleError(err);
//   res.send(tank);
// });
//   Dive.update({ _id: diveId }, { "$pull": { "divers": { "user": userIdToRemove } }}, { safe: true, multi:true }, function(err, obj) {
//     //do something smart
//   });
  User.findByIdAndUpdate(req.body.user._id, {"$pull": {"books": {"_id": req.body.bookId}}}, (err, user) => {
    if(err) {
      res.status(500).json(err)
    } else {
      TradeBook.findByIdAndRemove(req.body.bookId, (err, tradebook) => {
        if(err) {
          res.status(500).json(err)
        }
        res.status(200).json({success: 200})
      })
    }
  })
  // User.findById(req.body.user._id).exec((err, user) => {
  //   if (err) {
  //     res.status(500).json(err)
  //   } else {
  //     // var newBooks = user.books;
  //     // newBooks.filter(book => {
  //     //
  //     // })
  //     console.log(user.books)
  //     user.books.filter(book => {
  //       book._id != req.body.bookId
  //       //book._id != ObjectID(req.body.bookId)
  //     })
  //     console.log(user.books)
  //     res.status(500).json(err)
  //   }
  // })
}
//bookId, userId
module.exports.requestBook = function(req, res) {
  TradeBook.findByIdAndUpdate(req.body.bookId, {$set: {userRequestingTrade : req.body.userId}}, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      TradeBook
        .find()
        .exec(function(err, books) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.json(books);
          }
        });
    }
  })
}

module.exports.cancelRequest = function(req, res) {
  TradeBook.findByIdAndUpdate(req.body.bookId, { $unset: { userRequestingTrade: "" }}, (err) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json({success: true, msg: 'Request Cancelled'})
    }
  })
}

module.exports.rejectRequest = function(req, res) {
  TradeBook.findByIdAndUpdate(req.body.bookId, { $unset: { userRequestingTrade: "" }}, (err) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json({success: true, msg: 'Request Rejected'})
    }
  })
}

module.exports.approveRequest = function(req, res) {
  TradeBook.findByIdAndUpdate(req.body.bookId, { $set: { traded: true }}, (err) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json({success: true, msg: 'Request Approved'})
    }
  })
}
