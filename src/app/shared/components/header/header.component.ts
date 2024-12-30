import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isVisible: boolean = false;

  modalVisble() {
    this.isVisible = !this.isVisible;
  }

  toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('showSidebar');
  }
}
