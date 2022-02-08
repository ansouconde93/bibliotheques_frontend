import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIsPath } from 'src/app/models/apisPath';
import { Autority } from 'src/app/models/autority';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-consulter-autorities',
  templateUrl: './consulter-autorities.component.html',
  styleUrls: ['./consulter-autorities.component.css']
})
export class ConsulterAutoritiesComponent implements OnInit {
  
  apisPath: APIsPath = new APIsPath();
  autorities: any; 
  pasVal=0;
  modif=0;
  successAjout =0;
  autority: any;
  actifDesactif = false;

  constructor(private router: Router,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
    this.getAutorities();
  }

  getAutorities(): void{
    this.ressourcesService.getRessource(this.apisPath.administrationAPIBasePath+"/autorisations")
      .subscribe(response =>{
        if(response != null){
          this.autorities = response;
        }else{
          this.pasVal=1;
        }
      },err=>{          
        alert("Erreur d'accès à la BD.");
        this.router.navigateByUrl("/pagenotfound");
    });
  }
  supprimer(id: any){
      this.ressourcesService.postRessource(this.apisPath.administrationAPIBasePath+"/autorisations/delete",id)
      .subscribe(response =>{
        if(response != null){
          this.getAutorities();
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
    this.autority = aut;
  }

  ajouter(): void{
      this.autority.susppendu = this.actifDesactif;
      console.log(this.autority);
      this.ressourcesService.postRessource(this.apisPath.administrationAPIBasePath+"/autorisations/save", this.autority)
        .subscribe(response =>{
          if(response != null){
            this.successAjout = 1;
            this.modif=0;
            this.getAutorities();
          }else{
            //indiquer le signal d'échec d'enregistrement ici
          }
        },err=>{          
          this.router.navigateByUrl("/pagenotfound");
      }
      );
    
  }
}
