import { Component } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  cards = [
      {title: 'Vehicles', route: '/vehicles'},
      {title: 'Manufacturer', route: '/manufacturer'},
      {title: 'Users', route: '/users'},
      {title: 'Rents', route: '/rents'},
      {title: 'Malfunction', route: '/malfunctions'},
      {title: 'Statistics', route: '/malfunctions'},
      {title: 'Price for Rents',route:'/prices'}
    ]
}
