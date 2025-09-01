import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-reservations-component',
  imports: [],
  templateUrl: './manage-reservations-component.html',
  styleUrl: './manage-reservations-component.scss'
})
export class ManageReservationsComponent {
private authService = inject(AuthService);
  private router = inject(Router);

  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }

  logout(): void {
    this.authService.logout();    
  }
}
