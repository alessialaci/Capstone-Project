import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userId: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    let authUser: any = window.sessionStorage.getItem('auth-user');
    let parseUser = JSON.parse(authUser);
    this.userId = parseUser.id;
  }

}
