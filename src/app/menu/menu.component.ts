import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../list-students/list-students.component';
import { Student } from '../model/student';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isUserLoggedOnline : boolean = false;
  student: Student= new Student();
  jsonStudent:any;
  

  constructor(public authentication:HardcodedAuthenticationService,private router:Router) { 
    let anyway : any= localStorage.getItem("student");
     this.jsonStudent = JSON.parse(anyway) as Student;
     this.student = this.jsonStudent;
  }

  ngOnInit(): void {
    
  }

  isAdminOrSuperVisior(){
    if(this.student.role === "ADMIN" || this.student.role === "SUPERVISOR")
    { 
      return true;
    }
    else{
      return false;
    }
  }

  welcomemenu(){
    this.router.navigate(['welcome',this.student.userName])
  }
}
