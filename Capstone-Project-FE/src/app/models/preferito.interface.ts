import { Opera } from "./opera.interface";
import { Utente } from "./utente.interface";

export interface Preferito {
  id: number,
  utente: Utente,
  opera: Opera
}
