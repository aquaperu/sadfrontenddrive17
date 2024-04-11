import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {restendpoint} from '../../endpoint/restendpoint'

export interface User{
  email: string,
  password: string,
}
export interface loginForm {
  email: string,
  password: string,
}

export interface registerForm {
  email: string | undefined,
  password: string | undefined,
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private ApiUrlBase: string;
  private ApiUrlLogin: string;
  private ApiUrlRegister: string;

  constructor(private http: HttpClient) {
    this.ApiUrlBase = restendpoint.base;
    this.ApiUrlLogin = restendpoint.usuario.login;
    this.ApiUrlRegister = restendpoint.usuario.register
   }

   signIn(user: registerForm): Observable<any> {
    return this.http.post(`${this.ApiUrlBase}${this.ApiUrlRegister}`, user);
   }

   login(user: loginForm): Observable<any> {
    //https://192.168.1.86:3033/usuario/login
    
    return this.http.post(`${this.ApiUrlBase}${this.ApiUrlLogin}`, user)
   }

}
