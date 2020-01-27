import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url= 'https://utn2019-avanzada2-tp8.herokuapp.com/login';

  private httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any>
  {
    const observable = this.http.post(this.url, user, this.httpOptions);
      
    observable.subscribe(
      response => {
        localStorage.setItem('token', response['jwt']);
      },
      error => {
        console.log(error);
      }
    );
    return observable;
  }

  logout(): void 
  {
    localStorage.removeItem('token');
  }

  isLogged(): boolean
  {
    return localStorage.getItem('token') ? true : false;
  }
  
}
