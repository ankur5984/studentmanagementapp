import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { __assign } from 'tslib';
import { Role } from '../list-students/list-students.component';
import { StudentDataService } from '../service/data/student-data.service';

export class StudentObject{
  private id : any;
    private name : string;
    private userName : String;
    private password : String;
    private confirmPassword : String;
    private phone : String;
    private imageUrl : String;
    private email : String;
    private address : String;
    private role : Role

  constructor(
    private _name : string,
    private _userName : String,
    private _password : String,
    private _confirmPassword : String,
    private _phone : String,
    private _imageUrl : String,
    private _email : String,
    private _address : String,
    private _role : Role
  ){
    this.name = _name;
    this.userName = _userName;
    this.password = _password;
    this.confirmPassword = _confirmPassword;
    this.phone = _phone;
    this.email = _email;
    this.address = _address;
    this.role = _role

  }

}

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  step:number=1;
  submitted = false;
  student : StudentObject = new StudentObject("","","","","","","","",Role.ADMIN);
  //name : any;
  //to use reactive forms we need to create groups
  multiStep : FormGroup = new FormGroup({
    studentDetails: new FormGroup({
      name: new FormControl('',Validators.required),
      username: new FormControl(''),
      role: new FormControl('null')
    }),
    contactDetails: new FormGroup({
      phone: new FormControl(''),
      email: new FormControl('',Validators.required),
      address: new FormControl('')
    }),
    passwordDetails: new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    })
  })
  constructor(private router: Router,private service:StudentDataService) { }

  ngOnInit(): void {
  }

  
  
  submit(){
    this.submitted=true;
    if(this.multiStep.controls['studentDetails'].invalid && this.step==1){
      return;

    }
    if(this.multiStep.controls['contactDetails'].invalid && this.step==2){
      return;

    }

    // if(this.multiStep.controls['passwordDetails'].invalid && this.step==3){
    //   return;

    // }

    let name = this.multiStep.value.studentDetails.name;
    let userName = this.multiStep.value.studentDetails.username;
    let role = this.multiStep.value.studentDetails.role;
    let phone = this.multiStep.value.contactDetails.phone;
    let email = this.multiStep.value.contactDetails.email;
    let address = this.multiStep.value.contactDetails.address;
    let password = this.multiStep.value.passwordDetails.password;
    let confirmPassword = this.multiStep.value.passwordDetails.confirmPassword;
    console.log(name)

    this.step+=1;
    if(this.step > 3){
      this.student = new StudentObject(name,userName,password,confirmPassword,phone,"",email,address,role);
      console.log(this.student);
      this.service.addStudent(this.student).subscribe(
        (res:any)=>{
          console.log(res);
        }
      )
      this.router.navigate(['thankyou']);
    }
  }

  previous(){
    this.step= this.step-1;
  }

  get studentDetails(){
  //  console.log((this.multiStep.controls['studentDetails'] as FormGroup).controls)
    return (this.multiStep.controls['studentDetails'] as FormGroup).controls ;
    
  }

  get contactDetails(){
    return (this.multiStep.controls['contactDetails'] as FormGroup).controls ;
  }

  // get passwordDetails(){
  //   return (this.multiStep.controls['passwordDetails'] as FormGroup).controls ;
  // }

  isPasswordMatch(){
    // console.log((this.multiStep.controls['passwordDetails'].value.password === 
    // this.multiStep.controls['passwordDetails'].value.confirmPassword)? true:false);
    // return (this.multiStep.controls['passwordDetails'].value.password === 
    // this.multiStep.controls['passwordDetails'].value.confirmPassword)? true:false;
    let password= this.multiStep.value.passwordDetails.password;
    let confirmPassword = this.multiStep.value.passwordDetails.confirmPassword;
    return password === confirmPassword;
  }

 
}
