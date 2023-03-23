import { TimerComponent } from "../component/timer/timer.component";
import { CondizioniOpera } from "../enums/condizioni-opera.enum";
import { StatoLotto } from "../enums/stato-lotto.enum";
import { TecnicaOpera } from "../enums/tecnica-opera.enum";
import { TipoOpera } from "../enums/tipo-opera.enum";
import { Foto } from "./foto.interface";
import { Utente } from "./utente.interface";

export interface Opera {
  id: number,
  tipo: TipoOpera,
  titolo: string,
  descrizione: string,
  autore: Utente,
  tecnica: TecnicaOpera,
  condizioni: CondizioniOpera,
  anno: number,
  altezza: number,
  lunghezza: number,
  larghezza: number
  peso: number,
  stimaPrezzo: number,
  prezzoMinimo: number,
  offerta: number,
  statoLotto: StatoLotto,
  timer: TimerComponent,
  scadenzaTimer: Date,
  foto: Foto[]
}
