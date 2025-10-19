import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { stat } from 'fs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false;
  private authSub!: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.authSub = this.authService.getAuthStatus().subscribe(
          (status: boolean) => {
              this.isLoggedIn = status;
      }
    );
    
    }

    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
