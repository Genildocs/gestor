import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api-gestor-x0c7.onrender.com/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  loginUser(
    email: string,
    password: string
  ): Observable<{ token: string; username: string }> {
    return this.http.post<{ token: string; username: string }>(
      `${this.apiUrl}/login`,
      {
        email,
        password,
      }
    );
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
