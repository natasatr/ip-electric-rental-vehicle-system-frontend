import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrl: './admin-card.component.css'
})
export class AdminCardComponent {
  @Input() title!: string;
  @Input() route!: string;
  @Input() icon!: string;

  constructor(private router: Router) {}

  navigate() {
    
    this.router.navigate([this.route]);
  }

}
