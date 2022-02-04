import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../types/user.model';

const API_URL = 'http://localhost:8000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUsers(): Observable<any> {
    let data = this.http.get(API_URL + 'users', httpOptions);
    return data;
  }

  getUser(id: number): Observable<any> {
    let data = this.http.get(API_URL + `/users/${id}`, httpOptions);
    return data;
  }

  deleteUser(id: number) {
    return this.http.delete<void>(API_URL + `/users/${id}`, httpOptions);
  }

  update(id: number, user: User): Observable<any> {
    return this.http.put(
      API_URL + `/users/${id}`,
      JSON.stringify(user),
      httpOptions
    );
  }

  create(user: User): Observable<any> {
    return this.http.post<User>(API_URL + 'register', httpOptions);
  }
}
