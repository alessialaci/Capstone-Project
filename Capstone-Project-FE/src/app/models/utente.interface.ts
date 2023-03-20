import { Opera } from "./opera.interface";

export interface Utente {
  id: number;
  nome: string;
  cognome: string;
  username: string;
  email: string;
  password: string;
  foto: string;
  attivo: boolean;
  preferiti: Opera[];
}
