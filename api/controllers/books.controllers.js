var mongoose = require('mongoose');
var Book = mongoose.model('Book');

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
