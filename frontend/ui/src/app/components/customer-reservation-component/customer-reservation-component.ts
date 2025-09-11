import { Component, inject } from '@angular/core';
import { Reservation } from '../../models/IReservation';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CustomerReservationService } from '../../services/customer-reservation-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-reservation-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-reservation-component.html',
  styleUrl: './customer-reservation-component.scss'
})
export class CustomerReservationComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private reservationService = inject(CustomerReservationService);

  reservations: Reservation[] = [];
  showForm = false;

  timeSlots = [
    '18:00–19:30',
    '19:30–21:00',
    '21:00–22:30'
  ];

  newReservation: Reservation = {
    customerName: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '',
    partySize: 1,
    notes: '',
    status: 'active'
  };

  ngOnInit() {
    this.loadMyReservations();
  }

  resetForm() {
    this.newReservation = {
      customerName: '',
      phone: '',
      email: '',
      date: '',
      timeSlot: '',
      partySize: 1,
      notes: '',
      status: 'active'
    };
  }

  loadMyReservations() {
    this.reservationService.getMyReservations().subscribe(res => {
      console.log(res);
      this.reservations = res;
    });
  }

  addReservation() {
    this.reservationService.createReservation(this.newReservation).subscribe(res => {
      this.reservations.push(res);
      this.showForm = false;
      this.resetForm();
    });
  }

  cancelReservation(id: string) {
    if (confirm('确定要取消这条预约吗？')) {
      this.reservationService.cancelReservation(id)
        .subscribe(() => {
          this.reservations = this.reservations.map(r =>
            r._id === id ? { ...r, status: 'canceled' } : r
          );
        });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
