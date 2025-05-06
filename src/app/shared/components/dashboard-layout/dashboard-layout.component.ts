import { Component } from '@angular/core';
import { ManipularDomService } from '../../services/manipular-dom.service';
@Component({
  selector: 'app-dashboard-layout',
  template: `
    <app-header></app-header>
    <app-side-bar></app-side-bar>
    <div
      [class.md:ml-[250px]]="currentStateSideBar"
      [class.md:ml-0]="!currentStateSideBar"
    >
      <router-outlet></router-outlet>
    </div>
  `,
})
export class DashboardLayoutComponent {
  currentStateSideBar!: boolean;
  constructor(private manipularDomService: ManipularDomService) {
    this.manipularDomService.getStateSideBar().subscribe((state) => {
      this.currentStateSideBar = state;
    });
  }
}
