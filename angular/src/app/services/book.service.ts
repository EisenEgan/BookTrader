import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'

@Injectable()
export class BookService {

  constructor(private http: Http) { }

  searchAndAddBook(term, user) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    var body = { term: term, user: user }
    return this.http.post('http://localhost:3000/api/books', body, { headers: headers })
      .map(res => res.json())
  }

  getAllBooks() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:3000/api/books', { headers: headers })
      .map(res => res.json())
  }

  removeBook(user, bookId) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    var body = { user: user, bookId: bookId }
    return this.http.post('http://localhost:3000/api/books/remove', body, { headers: headers })
      .map(res => res.json())
  }

  requestBook(bookId, userId) {
    var body = { userId: userId, bookId: bookId }
    return this.http.post('http://localhost:3000/api/books/request', body)
      .map(res => res.json())
  }

  cancelRequest(bookId, userId) {
    var body = { userId: userId, bookId: bookId }
    return this.http.post('http://localhost:3000/api/books/cancel', body)
      .map(res => res.json())
  }

  rejectRequest(bookId, userId) {
    var body = { userId: userId, bookId: bookId }
    return this.http.post('http://localhost:3000/api/books/reject', body)
      .map(res => res.json())
  }

  acceptRequest(bookId, userId) {
    var body = { userId: userId, bookId: bookId }
    return this.http.post('http://localhost:3000/api/books/accept', body)
      .map(res => res.json())
  }
}
