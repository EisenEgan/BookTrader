import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
//import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  // getProfile(user) {
  //   let headers = new Headers()
  //   headers.append('Content-Type', 'application/json')
  //   return this.http.post('http://localhost:3000/users/', user, { headers: headers })
  //     .map(res => res.json())
  // }

}
