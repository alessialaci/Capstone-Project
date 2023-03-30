import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { TokenInterceptor } from './auth/token.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { ListaLottiComponent } from './component/lista-lotti/lista-lotti.component';
import { DettagliLottoComponent } from './component/dettagli-lotto/dettagli-lotto.component';
import { ProfiloUtenteComponent } from './component/profilo-utente/profilo-utente.component';
import { NotificheComponent } from './component/notifiche/notifiche.component';
import { DettagliNotificaComponent } from './component/dettagli-notifica/dettagli-notifica.component';
import { ProgressBarComponent } from './component/aggiungi-lotto/progress-bar/progress-bar.component';
import { DatiLottoComponent } from './component/aggiungi-lotto/dati-lotto/dati-lotto.component';
import { FotoLottoComponent } from './component/aggiungi-lotto/foto-lotto/foto-lotto.component';
import { ValoreLottoComponent } from './component/aggiungi-lotto/valore-lotto/valore-lotto.component';
import { SpedizioneLottoComponent } from './component/aggiungi-lotto/spedizione-lotto/spedizione-lotto.component';
import { RiepilogoComponent } from './component/aggiungi-lotto/riepilogo/riepilogo.component';
import { OrdiniComponent } from './component/ordini/ordini.component';

import { CapitalcasePipe } from './pipes/capitalcase.pipe';
import { TimerComponent } from './component/timer/timer.component';

import { ProvaComponent } from './component/prova/prova.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ListaLottiComponent,
    DettagliLottoComponent,
    ProfiloUtenteComponent,
    NotificheComponent,
    DettagliNotificaComponent,
    ProgressBarComponent,
    DatiLottoComponent,
    FotoLottoComponent,
    ValoreLottoComponent,
    SpedizioneLottoComponent,
    RiepilogoComponent,
    OrdiniComponent,
    CapitalcasePipe,
    TimerComponent,

    ProvaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
