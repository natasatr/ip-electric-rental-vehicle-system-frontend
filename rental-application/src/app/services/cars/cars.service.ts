import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElectricCarDTO } from '../../model/ElectricCarDTO';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private apiUrl = `${environment.apiUrl}/vehicles`;
  private fileUrl = `${environment.apiUrl}/files`;

  constructor(private http: HttpClient) { }

  getCars(): Observable<ElectricCarDTO[]> {
    return this.http.get<ElectricCarDTO[]>(`${this.apiUrl}/cars`);
  }

  createElectricCar(car: ElectricCarDTO): Observable<ElectricCarDTO> {
    console.log('create csv')
    return this.http.post<ElectricCarDTO>(`${this.apiUrl}/cars`, car);
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.fileUrl +'/upload', formData, 
      {responseType: 'text',
      withCredentials:true
    });
  }

  deleteElectricCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cars/${id}`);
  }

  getCarById(id: number): Observable<ElectricCarDTO> {
        return this.http.get<ElectricCarDTO>(`${this.apiUrl}/cars/${id}`);
  }
}
