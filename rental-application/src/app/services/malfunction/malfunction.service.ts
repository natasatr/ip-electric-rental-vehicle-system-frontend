import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MalfunctionDTO } from '../../model/MalfunctionDTO';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionService {
  private apiUrl = `${environment.apiUrl}/malfunctions`;
  
  constructor(private http: HttpClient) { }

  getMalfunctionsByVehicleId(vehicleId: number): Observable<MalfunctionDTO[]> {
    return this.http.get<MalfunctionDTO[]>(`${this.apiUrl}/vehicle/${vehicleId}`);
  }

  deleteMalfunction(malfunctionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${malfunctionId}`);
  }

  createMalfunction(malfunctionData: any): Observable<MalfunctionDTO> {
    return this.http.post<MalfunctionDTO>(this.apiUrl, malfunctionData);
  }
}
