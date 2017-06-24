var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
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
  }
});
bookSchema.index({title: 'text', authors: 'text'});
var Book = mongoose.model('Book', bookSchema)

module.exports = Book
