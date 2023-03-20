import { Opera } from "./opera.interface";
import { Utente } from "./utente.interface";

export interface Offerta {
  id: number,
  data: Date,
  opera: Opera,
  utente: Utente,
  offerta: number
}
