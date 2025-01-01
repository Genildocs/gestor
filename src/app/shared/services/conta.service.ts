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
  private apiUrl = 'https://api-gestor-x0c7.onrender.com/api/v1';
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  createConta(data: Contas[]) {
    return this.http.post(`${this.apiUrl}/contas`, data, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  getContas() {
    return this.http.get(`${this.apiUrl}/contas`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  deleteConta(id: string): Observable<{ contas: Contas[] }> {
    return this.http.delete<{ contas: Contas[] }>(
      `${this.apiUrl}/contas/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
}
