import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  oldpassword: String
  newpassword: String
  city: String
  state: String
  user: Object

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.user = data.user
      this.city = data.user.city
      this.state = data.user.state
    }, err => {
      console.log(err)
    })
  }

  changePassword() {
    if (this.oldpassword && this.newpassword) {
      this.authService.changePassword(this.oldpassword, this.newpassword).subscribe(data => {
        if (data.success) {
          this.oldpassword = ""
          this.newpassword = ""
          console.log('password updated!')
        }
      })
    } else {
      console.log('fill out both fields')
    }
  }

  updateUserProfile() {
    this.authService.changeLocation(this.city, this.state).subscribe(data => {
      if (data.success) {
        console.log('location updated')
      } else {
        console.log('An error occurred.')
      }
    })
  }
}
