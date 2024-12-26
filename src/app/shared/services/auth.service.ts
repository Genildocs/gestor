import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api-gestor-x0c7.onrender.com/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  loginUser(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logoutUser(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth/login']);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
