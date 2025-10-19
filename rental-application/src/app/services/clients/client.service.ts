import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDTO } from '../../model/ClientDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}/users/clients`;

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<ClientDTO[]> {
    return this.http.get<ClientDTO[]>(this.apiUrl);
  }

  getClientById(id: number): Observable<ClientDTO> {
    return this.http.get<ClientDTO>(`${this.apiUrl}/${id}`);
  }

  blockClient(id: number):Observable<ClientDTO> {
    return this.http.put<ClientDTO>(`${this.apiUrl}/${id}/block`,{});
  }

  unblockClient(id: number):Observable<ClientDTO> {
    return this.http.put<ClientDTO>(`${this.apiUrl}/${id}/unblock`,{});
  }
}
