import { Component, OnInit } from '@angular/core';

import { BookService } from '../../services/book.service'

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  outstandingBooks: Number
  unapprovedBooks: Number
  id: String
  booksOutstanding = []
  booksUnapproved = []
  showOutstanding: Boolean = false
  showUnapproved: Boolean = false
  // booksRecieved = []
  // tradedBooks = []
  constructor(private bookService: BookService) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'))
    this.id = user._id
    this.bookService.getAllBooks().subscribe(data => {
      data.forEach(book => {
        if (book.userRequestingTrade && book.userRequestingTrade == this.id && !book.traded) {
          this.booksOutstanding.push(book)
        } else if (book.user == this.id && book.userRequestingTrade && !book.traded) {
          this.booksUnapproved.push(book)
          // } else if (book.userRequestingTrade && book.userRequestingTrade == this.id && user.traded) {
          //   this.booksRecieved.push(book)
          // } else if (book.user == this.id && book.userRequestingTrade && user.traded) {
          //   this.tradedBooks.push(book)
        }
      })
      this.outstandingBooks = this.booksOutstanding.length
      this.unapprovedBooks = this.booksUnapproved.length
    }, err => {
      console.log(err)
    })
  }

  outstanding() {
    this.showUnapproved = false
    this.showOutstanding = !this.showOutstanding
  }

  unapproved() {
    this.showOutstanding = false
    this.showUnapproved = !this.showUnapproved
  }

  cancelRequest(book) {
    this.bookService.cancelRequest(book._id, this.id).subscribe(data => {
      if (data.success) {
        var index = this.booksOutstanding.indexOf(book)
        this.booksOutstanding.splice(index, 1)
        this.outstandingBooks = this.booksOutstanding.length
      }
    })
  }

  approveTrade(book) {
    this.bookService.acceptRequest(book._id, this.id).subscribe(data => {
      if (data.success) {
        var index = this.booksUnapproved.indexOf(book)
        this.booksUnapproved.splice(index, 1)
        this.unapprovedBooks = this.booksUnapproved.length
      }
    })
  }

  rejectTrade(book) {
    this.bookService.rejectRequest(book._id, this.id).subscribe(data => {
      if (data.success) {
        var index = this.booksUnapproved.indexOf(book)
        this.booksUnapproved.splice(index, 1)
        this.unapprovedBooks = this.booksUnapproved.length
      }
    })
  }
}
