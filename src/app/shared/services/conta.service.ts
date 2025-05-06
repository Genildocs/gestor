import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Contas } from '../interfaces/contas';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private apiUrl = 'https://api-gestor-hz59.onrender.com/api/v1';
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  token(): { headers: { Authorization: string } } {
    const token = localStorage.getItem('authToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`, this.token());
  }

  createConta(data: any) {
    return this.http.post(`${this.apiUrl}/contas`, data, this.token());
  }

  getContas() {
    return this.http.get(`${this.apiUrl}/contas`, this.token());
  }

  deleteConta(id: string): Observable<{ contas: Contas[] }> {
    return this.http.delete<{ contas: Contas[] }>(
      `${this.apiUrl}/contas/${id}`,
      this.token()
    );
  }

  updateConta(id: string, data: any): Observable<{ contas: Contas[] }> {
    return this.http.put<{ contas: Contas[] }>(
      `${this.apiUrl}/contas/${id}`,
      data,
      this.token()
    );
  }
}
