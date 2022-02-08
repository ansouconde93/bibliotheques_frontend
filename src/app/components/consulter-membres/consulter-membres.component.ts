import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIsPath } from 'src/app/models/apisPath';
import { Membre } from 'src/app/models/membre';
import { UserWithRoles } from 'src/app/models/userWithRoles';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-consulter-membres',
  templateUrl: './consulter-membres.component.html',
  styleUrls: ['./consulter-membres.component.css']
})
export class ConsulterMembresComponent implements OnInit {

  public user: UserWithRoles = new UserWithRoles();
  actifError: boolean = false;
  emailFormat: boolean = true;
  apisPath: APIsPath = new APIsPath();    
  public membresRoles: UserWithRoles[] = new Array();
  successAjout =0;
  rolesNameSelected: string[] = new Array();
  pasVal =0;
  modif =0;

  constructor(private router: Router,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
    this.getMembresWith();
  }

  ajouter(): void{
    this.actifError = false;
    let regexp = new RegExp('[a-z0-9._%+-]{1,}@[a-z0-9.-]{2,}[.][a-z]{2,}');
    this.emailFormat = regexp.test(this.user.appUser.email);
    if(
      this.user.appUser.email == null || this.emailFormat== false
    ){
      this.actifError = true;
    }else{
        if(this.rolesNameSelected.length >0){
          this.user.rolesName = this.rolesNameSelected;

        }
        this.ressourcesService.postUser(this.apisPath.membreAPIBasePath+"/appusers/save", this.user)
        .subscribe(response =>{
          if(response != null){
            this.successAjout=1;
          }else{
            //indiquer le signal d'échec d'enregistrement ici
          }
        },err=>{          
          this.router.navigateByUrl("/pagenotfound");
      });
      
    }
  }
 
  rolename: any;
  membres: any;
  getMembresWith(): void{
    this.ressourcesService.getRessource(this.apisPath.membreAPIBasePath+"/appusers")
      .subscribe(response =>{
        if(response != null){
          this.membres = response;
          for(let i=0; i < this.membres.length; i++){
            this.ressourcesService.getRessource(this.apisPath.administrationAPIBasePath+"/membres/roles/"+this.membres[i].id)
            .subscribe(res =>{
              let ur: UserWithRoles = new UserWithRoles();
              this.rolename = res
              ur.appUser = this.membres[i];
              ur.rolesName = this.rolename;
              this.membresRoles.push(ur);
            },err=>{
              alert("Erreur d'accès à la BD.");
              this.router.navigateByUrl("/pagenotfound");
            });
          }
        }else{
          alert("Veillez enregistrer d'abord les roles.");
        }
      },err=>{          
        alert("Erreur d'accès à la BD.");
        this.router.navigateByUrl("/pagenotfound");
    });
  }

  onChangeAutority($event: any){
    let id = $event.target.value;
    if($event.target.checked){
      this.rolesNameSelected.push(this.user.rolesName[id]);
    }else{
      this.rolesNameSelected = this.rolesNameSelected.filter(m=>m != this.user.rolesName[$event.target.value]);
    }   
  }

  supprimer(id: any){
    this.ressourcesService.postRessource(this.apisPath.membreAPIBasePath+"/membres/delete",id)
    .subscribe(response =>{
      if(response != null){
        this.getMembresWith();
      }else{
        this.pasVal=2;
      }
    },err=>{          
      alert("Erreur d'accès à la BD.");
      this.router.navigateByUrl("/pagenotfound");
  });
}
modifier(usr: any){
  this.modif =1;
  this.successAjout =0;
  this.user = usr;
}
}