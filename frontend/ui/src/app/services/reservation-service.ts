import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_RESERVATION_API_URL } from '../const';

export interface Reservation {
  _id?: string;
  customerId?: string;
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  partySize: number;
  notes?: string;
  status?: 'active' | 'canceled';
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
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
