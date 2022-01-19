import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RouteGuardService } from './service/route-guard.service';
import { StudentComponent } from './student/student.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  //we declare all the routes here.
  //define object
  //default route is route
  {path:'',component: LoginComponent},//condition : when we can Activate,--> using RouteGuardService
  {path:'login',component: LoginComponent},
  {path:'welcome/:name',component: WelcomeComponent, canActivate:[RouteGuardService]},
  {path:'students',component: ListStudentsComponent, canActivate:[RouteGuardService]},
  {path:'logout',component: LogoutComponent, canActivate:[RouteGuardService]},
  {path:'update/:id',component:StudentComponent, canActivate:[RouteGuardService]},
  {path:'add/:id',component:StudentComponent, canActivate:[RouteGuardService]},
  {path:'register',component:RegisterStudentComponent},
  {path:'thankyou',component:ThankyouComponent},
  {path:'**',component: ErrorComponent}//path='**' means anything other than defined route show error page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
