import { Livre } from "./livre";

export class Emprunt{
    id!: number;
    dateemprunt!: Date;
    dateretour!: Date ;
    nombreRappel!: number;
    livre!: Livre; 
}