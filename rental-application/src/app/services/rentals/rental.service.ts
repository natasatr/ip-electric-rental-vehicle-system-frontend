import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleRentalInfoDTO } from '../../model/VehicleRentalDTO';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = `${environment.apiUrl}/rentals`;

  constructor(private http: HttpClient) {}

  getRentalsByVehicleName(vehicleId: number): Observable<VehicleRentalInfoDTO[]> {
    return this.http.get<VehicleRentalInfoDTO[]>(`${this.apiUrl}/vehicle/${vehicleId}`);
  }
  getAllRentals(): Observable<VehicleRentalInfoDTO[]> {
  return this.http.get<VehicleRentalInfoDTO[]>(`${this.apiUrl}`);
}
}
