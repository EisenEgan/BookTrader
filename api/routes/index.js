var express = require('express')
var router = express.Router()

var ctrlBooks = require('../controllers/books.controllers.js')

router.route('/books')
  //.post(ctrlBooks.bookFindOne)
  .get(ctrlBooks.getAllBooks)
  .post(ctrlBooks.findAndAddBook)

router.route('/books/remove')
  .post(ctrlBooks.removeBook)

router.route('/books/request')
  .post(ctrlBooks.requestBook)

router.route('/books/cancel')
  .post(ctrlBooks.cancelRequest)

router.route('/books/reject')
  .post(ctrlBooks.rejectRequest)

router.route('/books/approve')
  .post(ctrlBooks.approveRequest)

module.exports = router
