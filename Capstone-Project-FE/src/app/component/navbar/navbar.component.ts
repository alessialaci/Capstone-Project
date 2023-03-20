import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userId: number | undefined;

  constructor(private ss: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    let authUser: any = window.sessionStorage.getItem('auth-user');
    if(authUser) {
      let parseUser = JSON.parse(authUser);
      this.userId = parseUser.id;
    } else {
      console.log("utente non loggato");
    }
  }

  logout() {
    this.ss.clean();
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.ss.isLoggedIn();
  }

}
