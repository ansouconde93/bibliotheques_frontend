import { Livre } from "./livre";

export class Auteur{
    id!: number;
    nom!: string;
    prenom!: string ;
    nationnalite!: string ;
    addresse!: string ;
    livres: Livre[] = new Array();
}