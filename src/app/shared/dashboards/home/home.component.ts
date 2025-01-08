import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  sidebarElement!: HTMLElement;

  receberSidebar(value: HTMLElement) {
    if (value) {
      this.sidebarElement = value;
    }
  }
}
