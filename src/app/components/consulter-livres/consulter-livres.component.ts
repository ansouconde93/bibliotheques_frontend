import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIsPath } from 'src/app/models/apisPath';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-consulter-livres',
  templateUrl: './consulter-livres.component.html',
  styleUrls: ['./consulter-livres.component.css']
})
export class ConsulterLivresComponent implements OnInit {
   
  apisPath: APIsPath = new APIsPath();
  livres: any; 
  pasVal=0;
  modif=0;
  successAjout =0;
  livre: any;

  constructor(private router: Router,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
    this.getLivres();
  }

  getLivres(): void{
    this.ressourcesService.getRessource(this.apisPath.livreAPIBasePath+"/livres")
      .subscribe(response =>{
        if(response != null){
          this.livres = response;
        }else{
          this.pasVal=1;
        }
      },err=>{          
        alert("Erreur d'accès à la BD.");
        this.router.navigateByUrl("/pagenotfound");
    });
  }
  supprimer(id: any){
      this.ressourcesService.postRessource(this.apisPath.livreAPIBasePath+"/livres/delete",id)
      .subscribe(response =>{
        if(response != null){
          this.getLivres();
        }else{
          this.pasVal=2;
        }
      },err=>{          
        alert("Erreur d'accès à la BD.");
        this.router.navigateByUrl("/pagenotfound");
    });
  }
  modifier(aut: any){
    this.modif =1;
    this.successAjout =0;
    this.livre = aut;
  }

  ajouter(): void{
      this.ressourcesService.postRessource(this.apisPath.livreAPIBasePath+"/livres/update/"+this.livre.id, this.livre)
        .subscribe(response =>{
          if(response != null){
            this.successAjout = 1;
            this.modif=0;
            this.getLivres();
          }else{
            //indiquer le signal d'échec d'enregistrement ici
          }
        },err=>{          
          this.router.navigateByUrl("/pagenotfound");
      }
      );
    
  }
}