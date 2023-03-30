import { Opera } from "./opera.interface";
import { Utente } from "./utente.interface";

export interface Ordine {

  id: number,
  opera: Opera,
  compratore: Utente,
	valuta: string,
  prezzo: number,
  speseTrasporto: number,
  commissione: number,
  totale: number

}
