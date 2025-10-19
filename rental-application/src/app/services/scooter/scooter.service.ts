import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElectricScooterDTO } from '../../model/ElectricScooterDTO';

@Injectable({
  providedIn: 'root'
})
export class ScooterService {

  private apiUrl = `${environment.apiUrl}/vehicles`;
  private fileUrl = `${environment.apiUrl}/files`;
  
  constructor(private http: HttpClient) { }
  
  getScooters(): Observable<ElectricScooterDTO[]> {
    return this.http.get<ElectricScooterDTO[]>(`${this.apiUrl}/scooters`);
  }
  
  createElectricScooters(scooter: ElectricScooterDTO): Observable<ElectricScooterDTO> {
    return this.http.post<ElectricScooterDTO>(`${this.apiUrl}/scooters`, scooter);
  }
  
  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.fileUrl +'/upload', formData, 
      {responseType: 'text',
      withCredentials:true
    });
  }
  
  deleteElectricScooter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/scooters/${id}`);
  }
  getScooterById(id: number): Observable<ElectricScooterDTO> {
        return this.http.get<ElectricScooterDTO>(`${this.apiUrl}/${id}`);
      }
}
