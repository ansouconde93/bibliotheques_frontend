import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIsPath } from 'src/app/models/apisPath';
import { Livre } from 'src/app/models/livre';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {

  public livre: Livre = new Livre();
  actifError: boolean = false;
  apisPath: APIsPath = new APIsPath();
  successAjout=0;

  constructor(private router: Router,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
  }
  ajouter(): void{
    this.actifError = false;
    if(
      this.livre.code == null ||
      this.livre.dateedition== null ||
      this.livre.nombrePage==null ||
      this.livre.titre==null ){
      this.actifError = true;
    }else{
      this.livre.id = null;
      this.ressourcesService.postRessource(this.apisPath.livreAPIBasePath+"/livres/save", this.livre)
        .subscribe(response =>{
          if(response != null){
            this.successAjout=1;
          }else{
            //indiquer le signal d'échec d'enregistrement ici
          }
        },err=>{          
          this.router.navigateByUrl("/pagenotfound");
      }
      );
    }
  }

}
