import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CareerService {

  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/careers/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>
  {
    return this.http.get(this.apiURL);
  }

  getById(careerId: number): Observable<any>
  {
    return this.http.get(this.apiURL + careerId);
  }

}
