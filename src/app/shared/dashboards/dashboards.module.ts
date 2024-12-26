import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { HomeComponent } from './home/home.component';
import { ContasComponent } from './home/contas/contas.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [HomeComponent, ContasComponent],
  imports: [CommonModule, DashboardsRoutingModule, ComponentsModule],
})
export class DashboardsModule {}
