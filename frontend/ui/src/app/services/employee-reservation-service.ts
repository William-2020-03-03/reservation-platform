import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from './reservation-service';
import { Observable } from 'rxjs';
import { BASE_EMPLOYEE_API_URL } from '../const';

@Injectable({
  providedIn: 'root'
})
export class EmployeeReservationService {
    constructor (private http: HttpClient) {}

  getReservations(params: any): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(BASE_EMPLOYEE_API_URL, { params });
  }

  updateStatus(id: string, status: string): Observable<Reservation> {;
    return this.http.patch<Reservation>(`${BASE_EMPLOYEE_API_URL}/${id}`, { status });
  }
}
