import { Component } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  cards = [
    {title: 'Vehicles', route: '/vehicles',icon: 'fas fa-car'},
    {title: 'Manufacturer', route: '/manufacturer', icon: 'fas fa-industry'},
    {title: 'Users', route: '/users', icon: 'fas fa-users'}
  ]
}
