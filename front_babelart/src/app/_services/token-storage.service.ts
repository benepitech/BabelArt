import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const TOKEN_KEY = 'auth-token';

//const USER_KEY = 'auth-user';
const API_URL = 'http://127.0.0.1:8000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};



@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor(private http: HttpClient) {}
  

  signOut(): void {
    window.sessionStorage.clear();
    this.http.get<Promise<any>>(API_URL + `logout`).toPromise();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

 /*  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  } */

  public getUser(): any {      
  
    return this.http.get<Promise<any>>(API_URL + `get_user`).toPromise();

/*     const user = window.sessionStorage.getItem(USER_KEY); 
    if (user) {
      return JSON.parse(user);
    }

    return {}; */
  }
}
