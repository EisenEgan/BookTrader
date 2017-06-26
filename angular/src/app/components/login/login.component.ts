import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any
  formSubmitted: Boolean = false
  errorMessage: String
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = {
      email: '',
      password: ''
    }
  }

  onLogin(form: NgForm) {
    this.formSubmitted = true
    if (form.valid) {
      const user = {
        email: this.user.email,
        password: this.user.password
      }
      this.authService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['']);
        } else {
          console.log('herp')
          console.log(data.msg)
          this.errorMessage = data.msg
          console.log(this.errorMessage)
          //this.router.navigate(['login']);
        }
      }, err => {
        console.log(err)
        this.errorMessage = err.message
      });
    }
  }
}
