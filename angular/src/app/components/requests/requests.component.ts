import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  outstanding: number = 0
  unapproved: number = 0
  constructor() { }

  ngOnInit() {
  }

}
