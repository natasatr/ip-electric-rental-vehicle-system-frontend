import { Component } from '@angular/core';
import { EmployeeRegisterDTO } from '../../model/EmployeeRegisterDTO';
import { Role } from '../../enums/Role';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerData: EmployeeRegisterDTO = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    role: Role.ADMIN
  };
  errorMessage: string='';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.errorMessage='';
    this.authService.register(this.registerData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        this.errorMessage = err.error || "Error during registration.";
      }
    });
  }

}
