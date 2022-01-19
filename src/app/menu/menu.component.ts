import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isUserLoggedOnline : boolean = false;

  constructor(public authentication:HardcodedAuthenticationService) { }

  ngOnInit(): void {
    //this.isUserLoggedOnline = this.authentication.isUserLoggedIn()
  }

}
