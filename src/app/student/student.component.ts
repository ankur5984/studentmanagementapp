import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDataService } from '../service/data/student-data.service';
import { Role} from '../list-students/list-students.component';
import { Student } from '../model/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  existingStudent : Student;
  id:number

  // id:number
  // existingStudent: Student;
  constructor(private studentService:StudentDataService, private route:ActivatedRoute, private router:Router) { 
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
   // this.existingStudent = new Student(this.id,"Ankur","ankur","admin123","admin123","+91-9041917232","","ankur.prasad@randstadrisesmart.com","Hazaribag,Jharkhand",Role.ADMIN);
    
    if(this.id != 0){
      this.studentService.retrieveStudent(this.id).subscribe(
        data=>{this.existingStudent = data;
        console.log(this.existingStudent);}
      )
    }  
  }

  updateStudent(){
    console.log("Records saved successfully")
    this.studentService.updateStudent(this.existingStudent,this.id)
    .subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['students'])
      }
    )
  }
}
