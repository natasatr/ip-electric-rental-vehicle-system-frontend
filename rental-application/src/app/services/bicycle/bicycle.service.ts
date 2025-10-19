import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElectricBicycleDTO } from '../../model/ElectricBicycleDTO';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {
  private apiUrl = `${environment.apiUrl}/vehicles/bicycles`;
  private fileUrl = `${environment.apiUrl}/files`;
  
  constructor(private http: HttpClient) { }
  
    getBikes(): Observable<ElectricBicycleDTO[]> {
      return this.http.get<ElectricBicycleDTO[]>(`${this.apiUrl}`);
    }
  
    createBike(bike: ElectricBicycleDTO): Observable<ElectricBicycleDTO> {
      return this.http.post<ElectricBicycleDTO>(`${this.apiUrl}`, bike);
    }
  
    uploadFile(file: File): Observable<string> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post(this.fileUrl +'/upload', formData, 
        {responseType: 'text',
        withCredentials:true
      });
    }
  
    deleteBike(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    getBikeById(id: number): Observable<ElectricBicycleDTO> {
      return this.http.get<ElectricBicycleDTO>(`${this.apiUrl}/${id}`);
    }
}
