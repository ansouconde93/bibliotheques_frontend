import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { AutoritiesComponent } from './components/autorities/autorities.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { MotPasseOublierComponent } from './components/mot-passe-oublier/mot-passe-oublier.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RolesComponent } from './components/roles/roles.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'motpasseoublier', component: MotPasseOublierComponent },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'role', component: RolesComponent },
  { path: 'autority', component: AutoritiesComponent },
  { path: '',   redirectTo: 'acceuil', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
