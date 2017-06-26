import { Component, OnInit } from '@angular/core';

import { BookService } from '../../services/book.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Object;
  id: String
  constructor(private bookService: BookService) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'))
    this.id = user._id
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data
    }, err => {
      console.log(err)
    })
  }

  requestBook(bookId) {
    this.bookService.requestBook(bookId, this.id).subscribe(data => {
      this.books = data
      // if (data.success) {
      //   this.bookService.getAllBooks().subscribe(data => {
      //     this.books = data
      //   }, err => {
      //     console.log(err)
      //   })
      // }
    })
  }

}
