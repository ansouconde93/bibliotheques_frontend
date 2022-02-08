import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIsPath } from 'src/app/models/apisPath';
import { Autority } from 'src/app/models/autority';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-autorities',
  templateUrl: './autorities.component.html',
  styleUrls: ['./autorities.component.css']
})
export class AutoritiesComponent implements OnInit {
  public autority: Autority = new Autority();
  actifError: boolean = false;
  apisPath: APIsPath = new APIsPath();
  successAjout = 0;
  constructor(private router: Router,
    private ressourcesService: RessourcesService) { }

  ngOnInit(): void {
  }

  ajouter(): void{
    this.actifError = false;
    if(
      this.autority.autority == null ){
      this.actifError = true;
    }else{
      this.autority.id = null;
      this.ressourcesService.postRessource(this.apisPath.administrationAPIBasePath+"/autorisations/save", this.autority)
        .subscribe(response =>{
          if(response != null){
            this.successAjout = 1;
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
