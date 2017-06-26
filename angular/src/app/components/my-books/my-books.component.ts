import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service'
import { BookService } from '../../services/book.service'
@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  book: String = ""
  user: Object
  constructor(
    private authService: AuthService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.user = data.user
    }, err => {
      console.log(err)
    })
  }

  userDetails() {
    this.authService.getProfile().subscribe(data => {
      this.user = data.user
    }, err => {
      console.log(err)
    })
  }

  searchBooks(term: String) {
    if (term) {
      this.bookService.searchAndAddBook(term, this.user).subscribe(data => {
        if (data.success) {
          this.user = data.user
        } else {
          console.log('Book not found.')
        }
      })
    } else {
      console.log('A book must be provided.')
    }
  }

  removeBook(id: String) {
    this.bookService.removeBook(this.user, id).subscribe(data => {
      if (data.success) {
        this.userDetails()
      }
    })
  }
}
