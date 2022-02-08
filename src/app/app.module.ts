import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MotPasseOublierComponent } from './components/mot-passe-oublier/mot-passe-oublier.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { RolesComponent } from './components/roles/roles.component';
import { AutoritiesComponent } from './components/autorities/autorities.component';
import { HttpClientModule } from '@angular/common/http';
import { LivreComponent } from './components/livre/livre.component';
import { MembreComponent } from './components/membre/membre.component';
import { ConsulterAutoritiesComponent } from './components/consulter-autorities/consulter-autorities.component';
import { ConsulterRolesComponent } from './components/consulter-roles/consulter-roles.component';
import { ConsulterMembresComponent } from './components/consulter-membres/consulter-membres.component';
import { ConsulterLivresComponent } from './components/consulter-livres/consulter-livres.component';
import { EmprunterRetourLivresComponent } from './components/emprunter-retour-livres/emprunter-retour-livres.component';

@NgModule({
  declarations: [
    AppComponent,
    MotPasseOublierComponent,
    ConnexionComponent,
    InscriptionComponent,
    AcceuilComponent,
    PageNotFoundComponent,
    RolesComponent,
    AutoritiesComponent,
    LivreComponent,
    MembreComponent,
    ConsulterAutoritiesComponent,
    ConsulterRolesComponent,
    ConsulterMembresComponent,
    ConsulterLivresComponent,
    EmprunterRetourLivresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
