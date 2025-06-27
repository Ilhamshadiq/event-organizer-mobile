import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  }

  register(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);

    return this.http.post(`${this.apiUrl}/api/auth/register`, formData, {
      withCredentials: true,
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, credentials, {
      withCredentials: true,
    });
  }

  getRole(): string {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      console.warn('⚠️ Tidak ada user di localStorage');
      return '';
    }
    const user = JSON.parse(userStr);
    console.log('📦 getRole() ->', user.role);
    return user?.role || '';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    console.log('🔐 isLoggedIn() ->', !!token);
    return !!token;
  }

logout(): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  });

  return this.http.post(`${this.apiUrl}/api/auth/logout`, {}, { headers });
}
}
