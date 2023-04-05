import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/models/utente.interface';
import { StorageService } from 'src/app/auth/storage.service';
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
  numeroNotifiche: number | undefined;

  constructor(private ss: StorageService, private us: UtentiService, private ns: NotificheService, private router: Router) { }

  ngOnInit(): void {
    this.getUtenteId();
  }

  // Per recuperare l'id dell'utente loggato
  getUtenteId() {
    let authUser: any = window.sessionStorage.getItem('auth-user');
    if(authUser) {
      let parseUser = JSON.parse(authUser);
      this.userId = parseUser.id;
      this.getUtente(this.userId!);
    }
  }

  // Per recuperare l'utente loggato
  getUtente(id: number) {
    this.us.getUtenteById(id).subscribe(ut => {
      this.utente = ut;
      this.getNumeroNotifiche()
    })
  }

  // Per recuperare il numero delle notifiche legato all'utente loggato
  getNumeroNotifiche() {
    if (this.utente) {
      this.ns.getNotificheByUtente(this.utente!).subscribe(not => {
        this.numeroNotifiche = not.filter(not => not.visualizzato == false).length;
      });
    } else {
      console.log("Utente non definito");
    }
  }

  // Per fare il logout
  logout() {
    this.ss.clean();
    this.router.navigate(['/']);
  }

  // Per controllare se l'utente è loggato
  isLoggedIn() {
    return this.ss.isLoggedIn();
  }

}
