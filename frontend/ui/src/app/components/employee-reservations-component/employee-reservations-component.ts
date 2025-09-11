import { Component } from '@angular/core';
import { Reservation } from '../../services/reservation-service';
import { EmployeeReservationService } from '../../services/employee-reservation-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-reservations-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-reservations-component.html',
  styleUrl: './employee-reservations-component.scss'
})
export class EmployeeReservationsComponent {
  reservations: Reservation[] = [];
  filters = { name: '', email: '', phone: '', status: '', startDate: '', endDate: '' };

  constructor(private emReservationService: EmployeeReservationService) {
    this.loadReservations();
  }

  loadReservations() {
    this.emReservationService.getReservations(this.filters).subscribe(data => {
      this.reservations = data;
    });
  }


  updateStatus(id: string, newStatus: string) {
    this.emReservationService.updateStatus(id, newStatus).subscribe(() => {
      this.loadReservations(); 
    });
  }
}
