import { Injectable } from '@angular/core';

//@injectable makes this class as service and we can use it and inject in anywhere.
@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) {
  //  console.log("before "+this.isUserLoggedIn());
    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem('authenticatedUser',username);
    //  console.log("after "+this.isUserLoggedIn());
      return true;
    }
    return false;
  }

  //getthe item from session storage
  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user===null); //user===null --> user not logged in
  }

  logout(){
    sessionStorage.removeItem("authenticatedUser");
    localStorage.removeItem("student");
  }
}
