import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { HomeComponent } from './home/home.component';
import { ContasComponent } from './contas/contas.component';


@NgModule({
  declarations: [
    HomeComponent,
    ContasComponent
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { }
