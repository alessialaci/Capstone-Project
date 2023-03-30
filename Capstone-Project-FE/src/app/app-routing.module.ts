import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { ProfiloUtenteComponent } from './component/profilo-utente/profilo-utente.component';
import { AuthGuard } from './auth/auth.guard';
import { ListaLottiComponent } from './component/lista-lotti/lista-lotti.component';
import { DettagliLottoComponent } from './component/dettagli-lotto/dettagli-lotto.component';
import { DatiLottoComponent } from './component/aggiungi-lotto/dati-lotto/dati-lotto.component';
import { FotoLottoComponent } from './component/aggiungi-lotto/foto-lotto/foto-lotto.component';
import { ValoreLottoComponent } from './component/aggiungi-lotto/valore-lotto/valore-lotto.component';
import { SpedizioneLottoComponent } from './component/aggiungi-lotto/spedizione-lotto/spedizione-lotto.component';
import { RiepilogoComponent } from './component/aggiungi-lotto/riepilogo/riepilogo.component';
import { DettagliNotificaComponent } from './component/dettagli-notifica/dettagli-notifica.component';
import { OrdiniComponent } from './component/ordini/ordini.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProvaComponent } from './component/prova/prova.component';
import { ProgressBarComponent } from './component/aggiungi-lotto/progress-bar/progress-bar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'lista-lotti',
    component: ListaLottiComponent
  },
  {
    path: 'dettagli-lotto/:id',
    component: DettagliLottoComponent,
  },
  {
    path: 'profilo-utente/:id',
    component: ProfiloUtenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aggiungi-lotto',
    component: ProgressBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dati',
        component: DatiLottoComponent
      },
      {
        path: 'foto',
        component: FotoLottoComponent
      },
      {
        path: 'valore',
        component: ValoreLottoComponent
      },
      {
        path: 'spedizione',
        component: SpedizioneLottoComponent
      },
      {
        path: 'riepilogo',
        component: RiepilogoComponent
      }
    ]
  },
  {
    path: 'prova',
    component: ProvaComponent
  },
  {
    path: 'dettagli-notifiche/:id',
    component: DettagliNotificaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ordini',
    component: OrdiniComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
