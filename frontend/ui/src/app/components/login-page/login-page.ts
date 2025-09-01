import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const payload = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    };

    this.authService.login(payload.email!, payload.password!).subscribe({
      next: (token) => {
        const role = this.authService.getUserRole();
        
        if(role === 'admin') {
          this.router.navigate(['/amdin/users']);
        } else if (role === 'customer') {
          this.router.navigate(['/reservation']);
        } else if (role === 'employee') {
          this.router.navigate(['/admin-dashboard']);
        }

      },
      error: err => console.error(err.error.message || 'Login failed')
    });
  }
}
