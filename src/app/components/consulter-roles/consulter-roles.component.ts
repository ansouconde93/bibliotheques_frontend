import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIsPath } from 'src/app/models/apisPath';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-consulter-roles',
  templateUrl: './consulter-roles.component.html',
  styleUrls: ['./consulter-roles.component.css']
})
export class ConsulterRolesComponent implements OnInit {

  apisPath: APIsPath = new APIsPath();
  roles: any; 
  pasVal=0;
  modif=0;
  successAjout =0;
  role: any;
  actifDesactif = false;
  autoritiesSelected: any[] = new Array();

  constructor(private router: Router,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void{
    this.ressourcesService.getRessource(this.apisPath.administrationAPIBasePath+"/roles")
      .subscribe(response =>{
        if(response != null){
          this.roles = response;
        }else{
          this.pasVal=1;
        }
      },err=>{          
        alert("Erreur d'accès à la BD.");
        this.router.navigateByUrl("/pagenotfound");
    });
  }
  supprimer(id: any){
      this.ressourcesService.postRessource(this.apisPath.administrationAPIBasePath+"/roles/delete",id)
      .subscribe(response =>{
        if(response != null){
          this.ressourcesService.postRessource(this.apisPath.administrationAPIBasePath+"/membres/delete",id)
          .subscribe(res=>{
            this.getRoles();
          })
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
    this.role = aut;
  }

  ajouter(): void{
      this.role.susppendu = this.actifDesactif;
      if(this.autoritiesSelected.length >0){
        this.role.autorisations = this.autoritiesSelected;
      }
      console.log(this.role);
      this.ressourcesService.postRessource(this.apisPath.administrationAPIBasePath+"/roles/update/"+this.role.id, this.role)
        .subscribe(response =>{
          if(response != null){
            this.successAjout = 1;
            this.modif=0;
            this.getRoles();
          }else{
            //indiquer le signal d'échec d'enregistrement ici
          }
        },err=>{          
          this.router.navigateByUrl("/pagenotfound");
      }
      );
    
  }
  

  onChangeAutority($event: any){
    let id = $event.target.value;
    if($event.target.checked){
      this.autoritiesSelected.push(this.role.autorisations[id]);
    }else{
      this.autoritiesSelected = this.autoritiesSelected.filter(m=>m != this.role.autorisations[$event.target.value]);
    }   
  }
}
