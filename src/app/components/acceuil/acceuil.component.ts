import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  ajout=0;
  affiche=0
  constructor() { }

  ngOnInit(): void {
  }

  modifierVariableAjout(operationNum: number): void{
    this.ajout =operationNum;
    this.affiche =0
  }
  modifierVariableAfficher(opAff:number){
    this.affiche=opAff;
    this.ajout=0;
  }
}
