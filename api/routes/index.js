var express = require('express')
var router = express.Router()

var ctrlBooks = require('../controllers/books.controllers.js')

router.route('/books')
  .post(ctrlBooks.bookFindOne)

module.exports = router
