import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/IReservation';
import { Observable } from 'rxjs';
import { BASE_RESERVATION_API_URL } from '../const';

@Injectable({
  providedIn: 'root'
})
export class CustomerReservationService {
  constructor(private http: HttpClient) {}

  getMyReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${BASE_RESERVATION_API_URL}/my`);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${BASE_RESERVATION_API_URL}`, reservation);
  }

  cancelReservation(id: string): Observable<Reservation> {
    return this.http.patch<Reservation>(`${BASE_RESERVATION_API_URL}/${id}`, { status: 'canceled' });
  }
}