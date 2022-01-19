import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Role } from '../list-students/list-students.component';
import { Student } from '../model/student';
import { StudentObject } from '../register-student/register-student.component';

export class User{
  constructor(public username:string,public password:string){

  }
}

//@injectable makes this class as service and we can use it and inject in anywhere.
@Injectable({
  providedIn: 'root'
})
export class TokenBasedAuthenticationService {
  apiServerUrl = environment.apiServerUrl;
 user:User;
 private data = new Subject<any>();
  public data$ = this.data.asObservable();

  emitdata(x: any){
    this.data.next(x);
  }

  constructor(private http:HttpClient) { }

  authenticate(username: string, password: string) {
  //  console.log("before "+this.isUserLoggedIn());
    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem('authenticatedUser',username);
    //  console.log("after "+this.isUserLoggedIn());
      return true;
    }
    return false;
  }

   getAuthenticatedUserLogin(username:string,password:string): Observable<Student>{
    let user = 'admin';
    let pass = 'admin123'
    let basicAuthHeaderString = 'Basic ' + window.btoa(user + ":" + pass); 
    let headers = new HttpHeaders({Authorization:basicAuthHeaderString});
    this.user = new User(username,password);
   // let params = new HttpParams().set('username',username).set('password',password);
    console.log(headers)
   /// console.log(params)
    return this.http.post<Student>(`${this.apiServerUrl}/authentication`,this.user,{headers})
    .pipe(
      map (
        (data:Student) =>{
          sessionStorage.setItem('authenticatedUser',username);
          return data;
        }
      )
    );
  }

  getUserByUserName(username:string): Observable<Student>{
    // let user = 'admin';
    // let pass = 'admin123'
    // let basicAuthHeaderString = 'Basic ' + window.btoa(user + ":" + pass); 
    // let headers = new HttpHeaders({Authorization:basicAuthHeaderString});
    // console.log
   this.user = new User(username,"");
    //let student_user_name = new HttpParams().set('username',username);
  //   console.log("with headers"+headers)
  //  /// console.log(params)
    //return this.http.get<StudentObject>(`${this.apiServerUrl}/getByName`,this.user);
    return this.http.get<Student>(`${this.apiServerUrl}/getByName`)
  }

  

  // public createBasicAuthenticationHeader() {
  //   let username = 'admin';
  //   let password = 'admin123';
  //   let authtoken = 'Basic ' + window.btoa(username + ":" + password); //byte64 -> using btoa it will encode in base64 format.
  //   return authtoken;
  // }

  //getthe item from session storage
  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user===null); //user===null --> user not logged in
  }

  logout(){
    sessionStorage.removeItem("authenticatedUser");
  }
}
