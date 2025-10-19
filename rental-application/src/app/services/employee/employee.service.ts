import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../../model/EmployeeDTO';
import { EmployeeRegisterDTO } from '../../model/EmployeeRegisterDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/users/employees`;
  
  constructor(private http: HttpClient) { }
  
  getAllEmployees(): Observable<EmployeeDTO[]> {
    return this.http.get<EmployeeDTO[]>(`${this.apiUrl}`);
  }
  
  createNewEmployee(emp: EmployeeRegisterDTO): Observable<EmployeeDTO> {
    return this.http.post<EmployeeDTO>(`${this.apiUrl}`, emp);
  }
  
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  updateEmployee(emp: EmployeeDTO): Observable<EmployeeDTO> {
    return this.http.put<EmployeeDTO>(`${this.apiUrl}/${emp.id}`, emp);
  }
  getEmployeeById(id: number): Observable<EmployeeDTO> {
      return this.http.get<EmployeeDTO>(`${this.apiUrl}/${id}`);
  }
}
