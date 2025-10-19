import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeRegisterDTO } from '../model/EmployeeRegisterDTO';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EmployeeDTO } from '../model/EmployeeDTO';
import { LoginDTO } from '../model/LoginDTO';
import { environment } from '../environment/environment';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private isLoggedInUserState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private storageService: StorageServiceService) { }

  register(registerDTO: EmployeeRegisterDTO): Observable<EmployeeDTO> {
    return this.http.post<EmployeeDTO>(this.apiUrl + '/register', registerDTO);
  }

  login(loginDTO: LoginDTO): Observable<string> {
    console.log("provjera login-a");
    return this.http.post(this.apiUrl + '/login', loginDTO, {responseType: 'text'})
    .pipe(
      tap(token => {
        this.storageService.setItem('jwtToken', token);
        this.isLoggedInUserState.next(true);
      })
    );
  }

  logout(): void {
    this.storageService.removeItem('jwtToken');
    this.isLoggedInUserState.next(false);
  }

  getToken(): string | null {
    return this.storageService.getItem('jwtToken');
  }

  isLoggedIn() : boolean {
    return !!this.getToken();
  }
  
  getAuthStatus(): Observable<boolean> {
    return this.isLoggedInUserState.asObservable();
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}
