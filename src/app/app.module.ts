import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudentComponent } from './student/student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterStudentComponent } from './register-student/register-student.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';



@NgModule({//ngModule --> every component should be associated
  declarations: [// components are declared
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListStudentsComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    StudentComponent,
    RegisterStudentComponent,
    ThankyouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:HttpIntercepterBasicAuthService,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
