import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIsPath } from 'src/app/models/apisPath';
import { AppUsers } from 'src/app/models/user';
import { UserWithRoles } from 'src/app/models/userWithRoles';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {

  public user: UserWithRoles = new UserWithRoles();
  actifError: boolean = false;
  repeatPassword: string='';
  emailFormat: boolean = true;
  apisPath: APIsPath = new APIsPath();
  roles: any;
  successAjout =0;
  choisir =0;
  rolesNameSelected: string[] = new Array();

  constructor(private router: Router,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
    this.getRoles();
  }
  ajouter(): void{
    this.actifError = false;
    let regexp = new RegExp('[a-z0-9._%+-]{1,}@[a-z0-9.-]{2,}[.][a-z]{2,}');
    this.emailFormat = regexp.test(this.user.appUser.email);
    if(
      this.user.appUser.nom == null ||this.user.appUser.prenom == null ||
      this.user.appUser.matricule == null ||
      this.user.appUser.email == null || this.user.appUser.section == null ||
      this.user.appUser.telephone == null || this.user.appUser.password == null ||
      this.user.appUser.password != this.repeatPassword ||this.emailFormat== false
    ){
      this.actifError = true;
    }else{
      if(this.rolesNameSelected.length == 0){
        this.choisir =1;
      }else{
        this.user.rolesName = this.rolesNameSelected;
      this.ressourcesService.postUser(this.apisPath.membreAPIBasePath+"/appusers/save", this.user)
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
 
  getRoles(): void{
    this.ressourcesService.getRessource(this.apisPath.administrationAPIBasePath+"/roles")
      .subscribe(response =>{
        if(response != null){
          this.roles = response;
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
      this.rolesNameSelected.push(this.roles[id].role);
    }else{
      this.rolesNameSelected = this.rolesNameSelected.filter(m=>m != this.roles[$event.target.value].role);
    }   
  }

}
