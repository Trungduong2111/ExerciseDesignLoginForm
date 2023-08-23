import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }
  getUserList(): Observable<any> {
    return this._http.get('http://localhost:3000/user')
  };

  addUser(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/user', data)
  }
}
