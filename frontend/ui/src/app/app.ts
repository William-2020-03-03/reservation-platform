import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // protected readonly title = signal('ui');

  private auth = inject(AuthService);
  private router = inject(Router);

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }
  get role() {
    return this.auth.getUserRole();
  }

  logout() {
    this.auth.logout();
     this.router.navigate(['/employee/reservations']);
    // location.reload(); // 或者使用 Router 导航到 login
  }
}
