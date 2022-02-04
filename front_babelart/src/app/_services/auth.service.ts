import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8000/api/';

// const AUTH_API = 'http://localhost:80OO/api/auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }
  
    
  
  register(username: string, email: string, address: string, phone:string, password: string, password_confirmation: string ): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      address,
      phone,
      password,
      password_confirmation
      
    }, httpOptions);
  }
}