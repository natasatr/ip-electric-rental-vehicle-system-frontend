import { Component } from '@angular/core';
import { LoginDTO } from '../../model/LoginDTO';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Role } from '../../enums/Role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: LoginDTO = {username: '', password: ''};
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log("klik na login");
    this.errorMessage = '';
    this.authService.login(this.loginData)
      .subscribe({
        next: token => {
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log(payload);
          const role = payload.role || payload.roles?.[0] || '';
          console.log(role);
          switch(role) {
            case Role.ADMIN.toString(): 
              console.log("admin page" + Role.ADMIN);
              this.router.navigate(['/admin']);
              break;
            case Role.MANAGER:
              this.router.navigate(['/manager']);
              break;
            case Role.OPERATOR:
              this.router.navigate(['/operator']);
              break;
           //default:
            //  console.log("bla");
          }
        },
        error: err => {
          this.errorMessage = 'Wrong username or password. Please, try again.'
        }
      });
  }


}
