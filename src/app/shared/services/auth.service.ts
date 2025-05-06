import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { Register as ResgisterUser } from '../interfaces/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api-gestor-hz59.onrender.com/api/v1/auth';
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(data: {
    register: ResgisterUser[];
  }): Observable<{ register: ResgisterUser[] }> {
    return this.http.post<{ register: ResgisterUser[] }>(
      `${this.apiUrl}/register`,
      data
    );
  }

  loginUser(
    email: string,
    password: string
  ): Observable<{ token: string; username: string }> {
    return this.http
      .post<{ token: string; username: string }>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((resp) => {
          if (!resp.token) {
            throw new Error('Token não recebido do servidor');
          }
          this.saveToken(resp.token);
          return resp;
        }),
        catchError((error) => {
          this.clearToken();
          throw error;
        })
      );
  }

  logoutUser(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth/login']);
  }

  // saveToken(token: string): void {
  //   localStorage.setItem('authToken', token);
  // }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  private saveToken(token: string): void {
    try {
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Erro ao salvar token:', error);
      throw new Error('Não foi possível salvar o token de autenticação');
    }
  }

  private clearToken(): void {
    try {
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Erro ao remover token:', error);
    }
  }
}
