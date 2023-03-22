import { Opera } from "./opera.interface";
import { Utente } from "./utente.interface";

export interface Notifica {
  id: number,
  utente: Utente,
  opera: Opera,
  messaggio: string,
  visualizzato: boolean
}
