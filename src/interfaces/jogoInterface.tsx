import { INiveis } from "./niveisInterface";

export interface IJogos {
  id: number;
  nome: string;
  logo: string;
  path: string;
  sobre: string;
  niveis: INiveis[];
}