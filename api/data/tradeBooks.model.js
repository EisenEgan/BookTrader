var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var tradeBookSchema = new Schema({
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

var TradeBook = mongoose.model('TradeBook', tradeBookSchema)

module.exports = TradeBook
