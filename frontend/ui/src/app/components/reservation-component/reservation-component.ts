import { Component, inject } from '@angular/core';
import { Reservation, ReservationService } from '../../services/reservation-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reservation-component.html',
  styleUrl: './reservation-component.scss'
})
export class ReservationComponent {

    
    private authService = inject(AuthService);
  private router = inject(Router);
    private reservationService = inject(ReservationService);

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
