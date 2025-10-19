import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManufacturerDTO } from '../../model/ManufacturerDTO';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private apiUrl = `${environment.apiUrl}/manufacturer`;
  
  constructor(private http: HttpClient) { }
  
  getManufacturer(): Observable<ManufacturerDTO[]> {
    return this.http.get<ManufacturerDTO[]>(`${this.apiUrl}`);
  }
  
  createManufacturer(manufacturer: ManufacturerDTO): Observable<ManufacturerDTO> {
    return this.http.post<ManufacturerDTO>(`${this.apiUrl}`, manufacturer);
  }
  
  deleteManufacturer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateManufacturer(manufacturer: ManufacturerDTO): Observable<ManufacturerDTO> {
    return this.http.put<ManufacturerDTO>(`${this.apiUrl}/${manufacturer.id}`, manufacturer);
  }

  getManufacturerById(id:number): Observable<ManufacturerDTO> {
    return this.http.get<ManufacturerDTO>(`${this.apiUrl}/${id}`)
  }
}
