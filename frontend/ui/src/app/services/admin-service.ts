import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_ADMIN_API_URL } from '../const';
import { Observable } from 'rxjs';

export interface RegisterUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'employee';

  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  
    getUsers(q?: string): Observable<RegisterUser[]> {
      return  this.http.get<any[]>(`${BASE_ADMIN_API_URL}/users`, { params: q ? { q } : {} });
    }
  
    updateRole(userId: string, role: string): Observable<RegisterUser> {
      return  this.http.put<RegisterUser>(`${BASE_ADMIN_API_URL}/users/${userId}`, { role });
    }
}
