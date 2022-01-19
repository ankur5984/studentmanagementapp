import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { StudentDataService } from '../service/data/student-data.service';

// export class Student{
//   constructor(
//     public id : number,
//     public name : string,
//     public userName : String,
//     public password : String,
//     public confirmPassword : String,
//     public phone : String,
//     public imageUrl : String,
//     public email : String,
//     public address : String,
//     public role : Role
//   ){

//   }
// }

export enum Role{
  init,ADMIN,STUDENT,SUPERVISOR
}

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  //how to create list here
  public role:Role = Role.ADMIN ;
  status : boolean = false;
  listOfStudents: Student[] = [];
  message: string = '';
  //way to create student object
  // student = {
  //   id : 1,
  //   name : 'Admin',
  //   role : 'admin'
  // }
  
//way to create student object
  // student = {
  //   id : 1,
  //   name : 'Admin',
  //   role : 'admin'
  // }


  constructor(private students:StudentDataService,private router:Router) {
   }

  ngOnInit(): void {
   this.refreshList();
  }

  refreshList(){
    this.students.getAllStudents().subscribe(
      data => {this.listOfStudents = data;}
     )
  }

  sleep(ms:any) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async init() {
    console.log(1);
    await this.sleep(10);
    console.log(2);
  }

  deleteStudent(id: number){
    console.log("item deleted with id: "+ id);
    this.students.deleteStudent(id).subscribe(
      data => {
        console.log(data);
        this.message = "Removed Student from the List";
        // window.location.reload();
        window.setTimeout(function(){location.reload()},3000);
        this.refreshList();
      }
    )
  }

  editStudentDetails(id:number){
    console.log("navigate to update page " +id);
    this.router.navigate(['update',id]);

  }

  addStudent(id:number){
    console.log("navigate to add student page");
    this.router.navigate(['add',id]);
  }

  saveOrUpdate(id:number){
    (id !=null)?this.editStudentDetails(id):this.addStudent(id);
  }
  
}
