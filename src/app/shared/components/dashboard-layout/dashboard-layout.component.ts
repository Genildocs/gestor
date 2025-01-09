import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  template: `
    <app-header></app-header>
    <app-side-bar></app-side-bar>
    <router-outlet></router-outlet>
  `,
})
export class DashboardLayoutComponent {}
