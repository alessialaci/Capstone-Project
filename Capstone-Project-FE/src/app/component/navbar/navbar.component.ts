import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { Utente } from 'src/app/models/utente.interface';
import { NotificheService } from 'src/app/services/notifiche.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userId: number | undefined;
  utente: Utente | undefined;
  notifiche: number | undefined;

  constructor(private us: UtentiService, private ns: NotificheService, private ss: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.getUserId();

    if(this.userId) {
      this.getUtente();
    }

  }

  getUserId() {
    let authUser: any = window.sessionStorage.getItem('auth-user');
    if(authUser) {
      let parseUser = JSON.parse(authUser);
      this.userId = parseUser.id;
    }
  }

  getUtente() {
    this.us.getUtenteById(this.userId!).subscribe(ut => {
      this.utente = ut;
      this.getNotifiche()
    })
  }

  getNotifiche() {
    if (this.utente) {
      this.ns.getNotificheByUtente(this.utente!).subscribe(not => {
        this.notifiche = not.filter(not => not.visualizzato == false).length;
      });
    } else {
      console.log("Utente non definito");
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
