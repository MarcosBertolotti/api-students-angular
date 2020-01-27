import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private url = 'https://utn2019-avanzada2-tp8.herokuapp.com/';
  private urlSignUp = this.url + 'sign-up/';
  private urlUsersIdentities = 'https://utn2019-avanzada2-tp8.herokuapp.com/users/identities?email=';

  private httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any>{

    return this.http.post(this.urlSignUp, user ,this.httpOptions);
  }

  getAll(): Observable<any>{

    return this.http.get(this.urlSignUp);
  }

  getUserByEmail(email: String): Observable<any>{

    return this.http.get(this.urlUsersIdentities + email);
  }
  
}
