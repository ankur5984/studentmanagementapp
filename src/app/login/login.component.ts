import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../list-students/list-students.component';
import { Student } from '../model/student';
import { StudentObject } from '../register-student/register-student.component';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { TokenBasedAuthenticationService } from '../service/token-based-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // username: string;
  // password: string
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;
  student: Student;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authentication: HardcodedAuthenticationService,
    private serviceAuthentication: TokenBasedAuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.serviceAuthentication
      .getAuthenticatedUserLogin(
        this.loginForm.value.username,
        this.loginForm.value.password
      )
      .subscribe(
        (data: Student) => {
          if (data) {
            this.student = data;
            this.serviceAuthentication.emitdata(data);
            localStorage.setItem('student', JSON.stringify(data));
            this.invalidLogin = false;
            //redirect to welcome page.
            // using dependency injection.
            this.router.navigate(['welcome', this.loginForm.value.username]);
          }
        },
        (err: Error) => {
          this.invalidLogin = true;
          console.log(err);
        }
      );
  }

  // handleAuthorizedUserLogin() {
  //   //if(this.username === "admin" && this.password === "admin123" )
  //   this.serviceAuthentication
  //     .getAuthenticatedUserLogin(this.username, this.password)
  //     .subscribe(
  //       (data: Student) => {
  //         if (data) {
  //           this.student = data;
  //           this.serviceAuthentication.emitdata(data);
  //           localStorage.setItem('student', JSON.stringify(data));
  //           this.invalidLogin = false;
  //           //redirect to welcome page. so need a router instance.to navigate to other routes page. how?
  //           // using dependency injection.go to constructor now.
  //           this.router.navigate(['welcome', this.username]); //it will navigate to specific page.
  //         }
  //       },
  //       (error) => {
  //         this.invalidLogin = true;
  //         console.log(error);
  //       }
  //     );
  // }

  register() {
    this.router.navigate(['register']);
  }
}

//types of binding
//1. single way binding
// username = {{}} -> interpolation

//2. 2-way binding ==> ngModel====>[(ngModel)] = modelelement
//ngModel --> angular directives

//3. (event)=method()
//4. *ngIf --> ng directive if condition on html tags

//5. now how to route when login button clicked.

//6. *ngFor --> *ngFor = 'let variable of listsvariable'

//7 routerLink = '/router_path' in <a router=''> </a>
