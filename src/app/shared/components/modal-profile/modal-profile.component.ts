import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrl: './modal-profile.component.css',
})
export class ModalProfileComponent implements OnInit {
  nome: string = 'John';
  email: string = 'john@example.com';

  @Input('isVisible') isVisible!: boolean;

  constructor(public authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] && changes['isVisible'].currentValue) {
    }
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logoutUser();
  }
}
