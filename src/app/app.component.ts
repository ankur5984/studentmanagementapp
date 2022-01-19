import { Component } from '@angular/core';

//@component --> decorators all anotation here in angular
@Component({
  selector: 'app-root',//tag name -> selector as attributes in component check in index.html
  templateUrl: './app.component.html', // where is html for above specific component
 // template: '<h1>{{title}}</h1>',
  styleUrls: ['./app.component.css'] // where is styling for above specific component
})
export class AppComponent {
  title = 'studentmanagementapp';
}
