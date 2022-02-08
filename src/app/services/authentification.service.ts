import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Membre } from '../models/membre';
import { AppUsers } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public host: string = "http://localhost:3002";
  public isAdmin = false;
  public username: any =null;

  constructor(private http: HttpClient, private router: Router) {
      this.decodeUserAccesToken();
     }

  public onLogin(membre:Membre){
    /*
    {observe:'response'} spring security n'avoie pas le format json, et on ne veux pas le format json ici
    */
    return this.http.post(this.host+ '/login', membre,{observe:'response'});
  }
  //save token: it is access token
  public saveTokenLocalStorage(jwt: any){
    localStorage.setItem("authenticatedUser",jwt);
  }
  //get authenticated user token: it is access token 
  public getAuthenticatedUserToken(): any{
    return localStorage.getItem("authenticatedUser");
  }  
  //remove authenticated user token: it is access token 
  public removeAuthenticatedUserToken(): any{
    return localStorage.removeItem("authenticatedUser");
  }
  /**
   * decoding user access token
   */
  public decodeUserAccesToken(){
    let accessToken: string= this.getAuthenticatedUserToken();
    if(accessToken!=null){
      accessToken = accessToken.replace("Bearer ","");//remove header Bearer
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(accessToken);
      this.username = decodedToken.sub;
      for(let i = 0; i < decodedToken.roles.length; i++ ){
        if(decodedToken.roles[i].authority == "admin"){
          this.isAdmin = true;
          break;
        }
      }
    }
  }
}
