import { EtatLivre } from "./etatLivre";
import { Type } from "./type";

export class Livre{
    id!: any;
    code!: string;
    titre!: string;
    nombrePage!: any
    dateedition!: any ;
    nombreexemplaire : any= 1;
    types: Type[]  = new Array();
    etatLivres : EtatLivre[] = new Array();
}