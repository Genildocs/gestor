import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrl: './modal-profile.component.css',
})
export class ModalProfileComponent {
  nome: string = 'John';
  email: string = 'john@example.com';
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logoutUser();
  }
}
