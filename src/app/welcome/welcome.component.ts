//simmilar as java here we write package com.app.core 

//importing class or here component from other java lib or packages 
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { Role } from '../list-students/list-students.component';
import { LoginComponent } from '../login/login.component';
import { Student } from '../model/student';
import { StudentObject } from '../register-student/register-student.component';
import { TokenBasedAuthenticationService } from '../service/token-based-authentication.service';

//@component scan -> value = com.app.core.web
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {
  
  username = '';
  name = '';
  message = 'Some welcome Message';
  user: string = '';
  student: Student= new Student();
  jsonStudent:any;


  constructor(private route: ActivatedRoute, private loginUser: TokenBasedAuthenticationService) {
    let anyway : any= localStorage.getItem("student");
    console.log(anyway);
  //  this.student = JSON.parse(localStorage.getItem('student'))
     this.jsonStudent = JSON.parse(anyway) as Student;
  }

  
  ngOnInit(): void {

    console.log(this.message);
   

    this.username = this.route.snapshot.params['name'];
    this.student = this.jsonStudent;

    



  }

  
  ngAfterViewInit() {

  }


  getStudent() {

  }


}
//we can write n no of classes which together with method is called modules. concept cam in es6