import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUsers } from '../models/user';
import { UserWithRoles } from '../models/userWithRoles';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {

  public host: string = "http://localhost:3002";
  
  constructor(private http: HttpClient,
    private authenticationService: AuthentificationService) {}

  public getRessource(url:any){
    let token = this.authenticationService.getAuthenticatedUserToken();
     return this.http.get(this.host+url/*,{
      headers: new HttpHeaders(
        {
          'Authorization':token
        }
      )
    }*/
    );
  } 

  public postRessource(url:string, ressources: any){
    let token = this.authenticationService.getAuthenticatedUserToken();
    return this.http.post<any>(this.host+url, ressources);
 }

 public deleteRessource(url:any){
  let token = this.authenticationService.getAuthenticatedUserToken();
  return this.http.delete(this.host+url/*,{
    headers: new HttpHeaders(
      {
        'Authorization':token
      }
    )
  }*/
  );
 } 
 
 //saving user in db not need authentification
 public postUser(url:string, ressources: UserWithRoles){
  return this.http.post<AppUsers>(this.host+url, ressources/*, {
    headers: new HttpHeaders(
      {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Origin, Accept, X-Requested-With, X-PINGOTHER, Content-Type,'
        + 'Access-Control-Request-Method, Access-Control-Request-Headers',
        'Access-Control-Expose-Headers':'Access-Control-Allow-Origin, Access-Control-Allow-Credentials',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,OPTIONS,HEAD,CONNECT,TRACE,PATCH'
      }
    )}*/
  );
} 
 
}
