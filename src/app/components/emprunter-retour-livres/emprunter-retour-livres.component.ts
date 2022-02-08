import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIsPath } from 'src/app/models/apisPath';
import { EmpruntLivre } from 'src/app/models/EmpruntLivre';
import { AppUsers } from 'src/app/models/user';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-emprunter-retour-livres',
  templateUrl: './emprunter-retour-livres.component.html',
  styleUrls: ['./emprunter-retour-livres.component.css']
})
export class EmprunterRetourLivresComponent implements OnInit {

  livre: any;
  user!: any;
  code!: any;
  cin!: any;
  actifError = false;
  echechRecherche=0;
  empruntRetour =0;
  apisPath: APIsPath = new APIsPath(); 

  constructor(private router: Router,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
  }

  rechercher(){
    if(
      this.code == null || this.cin == null){
      this.actifError = true;
    }else{      
    this.ressourcesService.getRessource(this.apisPath.livreAPIBasePath+"/livres/code/"+this.code)
    .subscribe(reponse =>{
        if(reponse != null){
          this.livre = reponse;
          this.ressourcesService.getRessource(this.apisPath.membreAPIBasePath+"/appuser/matricule/"+this.cin)
          .subscribe(res =>{
            if(res!=null){
              this.user = res;
            }else{
              this.echechRecherche =1;              
            }
          }, err=>{
            this.router.navigateByUrl("/pagenotfound");            
          })
        }else{
          this.echechRecherche =1;
        }
    }, err =>{      
      this.router.navigateByUrl("/pagenotfound");
    });
    }
  }
  emprunter(){
    let emprunt : EmpruntLivre = new EmpruntLivre();
    emprunt.idappuser = this.user.id;
    emprunt.idlivre = this.livre.id;       
    this.ressourcesService.postRessource(this.apisPath.livreAPIBasePath+"/appusers/livre/emprunter", emprunt)
    .subscribe(reponse =>{
      if(reponse != null){
        this.echechRecherche = 2;
      }else{
        this.echechRecherche= 3;
      }
    },eer =>{
      this.router.navigateByUrl("/pagenotfound");      
    });   

  }
  emprunterRetour(oppNum: any){
    this.empruntRetour = oppNum;
  }
  
  rendreLivre(){
    let emprunt : EmpruntLivre = new EmpruntLivre();
    emprunt.idappuser = this.user.id;
    emprunt.idlivre = this.livre.id;       
    this.ressourcesService.postRessource(this.apisPath.livreAPIBasePath+"/appusers/livre/arendre", emprunt)
    .subscribe(reponse =>{
      if(reponse != null){
        this.echechRecherche = 2;
      }else{
        this.echechRecherche= 3;
      }
    },eer =>{
      this.router.navigateByUrl("/pagenotfound");      
    });   

  }
}
