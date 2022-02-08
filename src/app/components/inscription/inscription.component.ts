import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIsPath } from 'src/app/models/apisPath';
import { UserWithRoles } from 'src/app/models/userWithRoles';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  
  user: UserWithRoles = new UserWithRoles();
  actifError: boolean = false;
  emailFormat: boolean = true;
  apisPath: APIsPath = new APIsPath();
  public repeatPassword: string = '';

  constructor(private router: Router,
    private ressourcesService: RessourcesService) { }
  ngOnInit(): void {
  }
  public enregistrerCompteEtAllerAAcceuil(): void{
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
      this.user.rolesName.push("etudiant");
      this.user.rolesName.push("user");
      this.ressourcesService.postUser(this.apisPath.membreAPIBasePath+"/appusers/save", this.user)
        .subscribe(response =>{
          if(response != null){
            this.router.navigateByUrl("/acceuil");
          }
        },err=>{          
          this.router.navigateByUrl("/pagenotfound");
      }
      );
    }
  }
}
