import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private usrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onsubmit(form: NgForm) {
    try {
      await this.usrv.register(form.value).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'Registrazione Effettuata!',
            text: 'Fai il login per poter proseguire.',
          });
          this.router.navigate(['/login'])
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

}
