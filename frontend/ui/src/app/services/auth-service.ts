import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of, pipe, tap } from 'rxjs';
import { IUser } from '../models/IUser';
import { Router } from '@angular/router';
import { BASE_AUTH_API_URL, TOKEN_KEY } from '../const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  // JWT 解码（Base64 解码 payload）
  private decodeToken(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      console.error('Invalid JWT:', e);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    let payload = null;

    if (token) {
      payload = this.decodeToken(token);
    }

    return payload?.role || null;
  }

  // if login
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  }

  register(username: string, email: string, password: string, role?: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${BASE_AUTH_API_URL}/register`, {
      name: username,
      email,
      password
    });
  }

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<{ token: string }>(`${BASE_AUTH_API_URL}/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem(TOKEN_KEY, res.token);
        }),
        map(res => res.token)
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
