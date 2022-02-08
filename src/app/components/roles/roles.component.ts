import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIsPath } from 'src/app/models/apisPath';
import { Autority } from 'src/app/models/autority';
import { Roles } from 'src/app/models/roles';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public role: Roles = new Roles();
  actifError: boolean = false;
  apisPath: APIsPath = new APIsPath();
  autorities: any; 
  autoritiesSelected: any[] = new Array();
  choisirAutority =0;
  successAjout=0;
  constructor(private router: Router,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
    this.getAutorities();
  }

  ajouter(): void{
    this.actifError = false;
    if(
      this.role.role == null ){
      this.actifError = true;
    }else{
      if(this.autoritiesSelected.length == 0){
        this.choisirAutority =1;
      }else{
        this.role.autorisations = this.autoritiesSelected;
        this.ressourcesService.postRessource(this.apisPath.administrationAPIBasePath+"/roles/save/", this.role)
          .subscribe(response =>{
            if(response != null){
              this.successAjout = 1;
            }else{
              alert("Erreur d'enregistrement.");
            }
          },err=>{          
            this.router.navigateByUrl("/pagenotfound");
        }
        );
      }
    }
  }

  getAutorities(): void{
      this.ressourcesService.getRessource(this.apisPath.administrationAPIBasePath+"/autorisations")
        .subscribe(response =>{
          if(response != null){
            this.autorities = response;
          }else{
            alert("Veillez enregistrer d'abord les droits d'accès.");
          }
        },err=>{          
          alert("Erreur d'accès à la BD.");
          this.router.navigateByUrl("/pagenotfound");
      });
  }

  onChangeAutority($event: any){
    let id = $event.target.value;
    if($event.target.checked){
      this.autoritiesSelected.push(this.autorities[id]);
    }else{
      this.autoritiesSelected = this.autoritiesSelected.filter(m=>m != this.autorities[$event.target.value]);
      console.log(this.autoritiesSelected)
    }   
  }

}
