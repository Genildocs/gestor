import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  LoginResponse,
  Register as RegisterUser,
  User,
} from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://api-gestor-hz59.onrender.com/api/v1/auth';
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'userData';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.initializeUser();
  }

  private initializeUser(): void {
    const user = this.getCurrentUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  registerUser(data: {
    register: RegisterUser[];
  }): Observable<{ register: RegisterUser[] }> {
    return this.http
      .post<{ register: RegisterUser[] }>(`${this.API_URL}/register`, data)
      .pipe(catchError(this.handleError));
  }

  loginUser(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap((response) => {
          if (!response.token) {
            throw new Error('Token não recebido do servidor');
          }
          this.handleLoginSuccess(response);
        }),
        catchError(this.handleError)
      );
  }

  private handleLoginSuccess(response: LoginResponse): void {
    this.saveToken(response.token);
    const user = this.getCurrentUser();
    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  logoutUser(): void {
    this.clearAuthData();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const expirationTime = (decodedToken as any).exp * 1000;
      return Date.now() < expirationTime;
    } catch {
      this.clearAuthData();
      return false;
    }
  }

  private saveToken(token: string): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Erro ao salvar token:', error);
      throw new Error('Não foi possível salvar o token de autenticação');
    }
  }

  private clearAuthData(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    } catch (error) {
      console.error('Erro ao limpar dados de autenticação:', error);
    }
  }

  getCurrentUser(): User | null {
    try {
      const token = this.getToken();
      if (!token) return null;

      const decodedToken = jwtDecode(token);
      return decodedToken as User;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      this.clearAuthData();
      return null;
    }
  }

  refreshToken(): Observable<LoginResponse> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('Token não encontrado'));
    }

    return this.http
      .post<LoginResponse>(`${this.API_URL}/refresh-token`, { token })
      .pipe(
        tap((response) => this.handleLoginSuccess(response)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro na operação';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  updateUserData(userData: Partial<User>): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      this.currentUserSubject.next(updatedUser);
      localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
    }
  }
}
