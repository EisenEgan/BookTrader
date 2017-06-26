import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: any
  formSubmitted: boolean = false
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = {
      name: '',
      email: '',
      password: ''
    }
  }

  onRegister(form: NgForm) {
    this.formSubmitted = true
    if (form.valid) {
      const user = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      }
      this.authService.registerUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['']);
        } else {
          this.router.navigate(['register'])
        }
      });
    }
  }

  getErrorMessage(state: any) {
    console.log(state.errors.minlength)
    return 'herp'
  }

}
