import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  stateLinks: boolean = true;

  selectStateLinks() {
    this.stateLinks = !this.stateLinks;
  }
}
