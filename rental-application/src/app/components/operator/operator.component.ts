import { Component } from '@angular/core';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrl: './operator.component.css'
})
export class OperatorComponent {
cards = [
      {title: 'Rents', route: '/rents'},
      {title: 'Clients', route: '/users/clients'},
      {title: 'Malfunction', route: '/malfunctions'}
    ]
}
