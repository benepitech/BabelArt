import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  IUserData  from '../types/user.type';

const API_URL = 'http://localhost:8000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Promise<any>>(API_URL + 'users', httpOptions).toPromise();;
     
  }

  getUser(id: string){
    return this.http.get<Promise<any>>(API_URL + `users/${id}`, httpOptions).toPromise();
  }



  deleteUser(id: number) {
    return this.http.delete<any>(API_URL + `users/${id}`, httpOptions);
  }

  

  update(id: number, user: IUserData): Observable<any> {
    return this.http.patch(
      API_URL + `users/${id}`,
      JSON.stringify(user),
      httpOptions
    );
  }


  findByName(username:string) {
    return this.http.get<Promise<any>>(API_URL + `/users?username=${username}`,httpOptions).toPromise();
  }

  addSale(seller_id:any){
    return this.http.patch(API_URL + `users/sales/${seller_id}`,httpOptions);
  } 
  
}
