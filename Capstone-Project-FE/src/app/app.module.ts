import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { ProfiloUtenteComponent } from './component/profilo-utente/profilo-utente.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { ListaLottiComponent } from './component/lista-lotti/lista-lotti.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { DettagliLottoComponent } from './component/dettagli-lotto/dettagli-lotto.component';
import { GeneraleComponent } from './component/aggiungi-lotto/generale/generale.component';
import { DatiLottoComponent } from './component/aggiungi-lotto/dati-lotto/dati-lotto.component';
import { FotoLottoComponent } from './component/aggiungi-lotto/foto-lotto/foto-lotto.component';
import { ValoreLottoComponent } from './component/aggiungi-lotto/valore-lotto/valore-lotto.component';
import { SpedizioneLottoComponent } from './component/aggiungi-lotto/spedizione-lotto/spedizione-lotto.component';
import { CapitalcasePipe } from './pipes/capitalcase.pipe';
import { RiepilogoComponent } from './component/aggiungi-lotto/riepilogo/riepilogo.component';
import { RichiesteLottiComponent } from './component/richieste-lotti/richieste-lotti.component';
import { NotificheComponent } from './component/notifiche/notifiche.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfiloUtenteComponent,
    ListaLottiComponent,
    NavbarComponent,
    FooterComponent,
    DettagliLottoComponent,
    GeneraleComponent,
    DatiLottoComponent,
    FotoLottoComponent,
    ValoreLottoComponent,
    SpedizioneLottoComponent,
    CapitalcasePipe,
    RiepilogoComponent,
    RichiesteLottiComponent,
    NotificheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthRoutingModule,
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
