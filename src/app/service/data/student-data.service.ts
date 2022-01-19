import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/model/student';
// import { Student } from 'src/app/list-students/list-students.component';
import { StudentObject } from 'src/app/register-student/register-student.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  private apiServerUrl = environment.apiServerUrl;
  constructor(
    private http: HttpClient
  ) { }

  public getAllStudents(): Observable<Student[]> {
    // console.log(this.http.get("http://localhost:8080/do.api.student/all"))
    let basicAuthHeaderString = this.createBasicAuthenticationHeader();
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<Student[]>(`${this.apiServerUrl}/all`, {headers:headers});
  }

  public addStudent(student: StudentObject): Observable<Student> {
    // console.log(this.http.get("http://localhost:8080/do.api.student/all"))
    // return this.http.post<Student>(`${http://localhost:8080/do.api.student}/add",student);
    return this.http.post<Student>(`${this.apiServerUrl}/add`, student);
  }

  public retrieveStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiServerUrl}/fetchById/${id}`);
  }

  public updateStudent(student: Student, id: number): Observable<Student> {
    //  console.log(this.http.get("http://localhost:8080/do.api.student/all"))
    // return this.http.post<Student>(`${http://localhost:8080/do.api.student}/update/${id}`,student);
    return this.http.put<Student>(`${this.apiServerUrl}/update/${id}`, student);
  }

  public deleteStudent(id: number): Observable<void> {
    //  console.log(this.http.get("http://localhost:8080/do.api.student/all"))
    // return this.http.post<Student>(`${http://localhost:8080/do.api.student}/add",student);
    let student_id = new HttpParams().set('id', id);
    return this.http.delete<void>(`${this.apiServerUrl}/removeById`, { params: student_id });
  }

  public getAuthenticatedUserLogin(username:string,password:string): Observable<Student>{
    let basicAuthHeaderString = this.createBasicAuthenticationHeader();
    let headers = new HttpHeaders({
      'Authorization':basicAuthHeaderString
    })
    let params = new HttpParams().set('username',username).set('password',password)
    return this.http.post<Student>(`${this.apiServerUrl}/authentication`,{params},{headers:headers})
  }

  public createBasicAuthenticationHeader() {
    let username = 'admin';
    let password = 'admin123';
    let authtoken = 'Basic ' + window.btoa(username + ":" + password); //byte64 -> using btoa it will encode in base64 format.
    return authtoken;
  }
}
