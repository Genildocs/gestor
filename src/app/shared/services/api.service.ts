import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get('https://api-gestor-x0c7.onrender.com/api/v1/users');
  }
}
