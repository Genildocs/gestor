import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  registerUser(data: any) {
    return this.http.post(
      'https://api-gestor-x0c7.onrender.com/api/v1/users/register',
      data
    );
  }
}
