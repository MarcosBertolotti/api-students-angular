import { Injectable } from '@angular/core';
import { Student } from 'src/app/models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentAsyncService {;

  private apiURL = 'https://utn2019-avanzada2-tp8.herokuapp.com/api/students/';

  private httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  add(student : Student): Observable<any>
  {
    return this.http.post(this.apiURL, student, this.httpOptions);
  }

  getAll(): Observable<any>
  {
    return this.http.get(this.apiURL);
  }

  getById(studentId: number): Observable<any>
  {
    return this.http.get(this.apiURL + studentId);
  }

  update(student: Student): Observable<any>
  {
    return this.http.patch(this.apiURL + student.studentId, student, this.httpOptions);
  }

  deleteById(studentId: number): Observable<any>
  {
    return this.http.delete(this.apiURL + studentId);
  }

  getStudentByEmail(email: String): Observable<any>
  {
    return this.http.get(this.apiURL + "identities?email=" + email);
  }

  getStudentByDni(dni: number): Observable<any>
  {
    return this.http.get(this.apiURL + "identities?dni=" + dni);
  }

}

