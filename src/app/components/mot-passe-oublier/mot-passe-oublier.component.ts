import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUsers } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-mot-passe-oublier',
  templateUrl: './mot-passe-oublier.component.html',
  styleUrls: ['./mot-passe-oublier.component.css']
})
export class MotPasseOublierComponent implements OnInit {

  user: AppUsers = new AppUsers();
  actifError: boolean = false;
  emailFormat: boolean = true;
  constructor(private router: Router,
    private authentificationService: AuthentificationService,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
  }
  public modifierMotPasse(): void{
    this.actifError = false;
    let regexp = new RegExp('[a-z0-9._%+-]{1,}@[a-z0-9.-]{2,}[.][a-z]{2,}');
    this.emailFormat = regexp.test(this.user.email);
    if(
      this.user.matricule == null ||
      this.user.email == null ||
      this.emailFormat == false
    ){
      this.actifError = true;
    }else{
      //juste une simulation de modification de mot de passe
      this.router.navigateByUrl("/acceuil");
    }
  }
}
