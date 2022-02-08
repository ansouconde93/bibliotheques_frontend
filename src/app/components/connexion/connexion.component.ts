import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Membre } from 'src/app/models/membre';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  actifError: boolean = false;
  public membre: Membre = new Membre();
  constructor(private router: Router,
    private authentificationService: AuthentificationService,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
  }

  public seConnecter(): void{
    this.actifError = false;
    if(this.membre.username == null || this.membre.password == null){
      this.actifError = true;
    }else{
      this.authentificationService.onLogin(this.membre)
        .subscribe(jwtToken =>{
            if(jwtToken != null){
              let token = jwtToken.headers.get("Authorization");
              this.authentificationService.saveTokenLocalStorage(token);
              this.router.navigateByUrl("/acceuil");
            }else{            
              this.router.navigateByUrl("/inscription");
            }
          },err=>{
            this.router.navigateByUrl("/pagenotfound");
        }
      );
    }
  }
}
