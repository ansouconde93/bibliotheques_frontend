import { Autority } from "./autority";

export class Roles{
    id! : any;
    role!: string;
    susppendu!: boolean ; // = true si le role est susppendu et false sinon
    autorisations: any[] = new Array();
}