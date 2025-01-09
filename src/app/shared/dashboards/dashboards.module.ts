import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
import { FluidModule } from 'primeng/fluid';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ComponentsModule } from '../components/components.module';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { ContasComponent } from './contas/contas.component';
import { HomeComponent } from './home/home.component';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    HomeComponent,
    ContasComponent,
    TransacoesComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    ComponentsModule,
    Dialog,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FluidModule,
    DatePickerModule,
    InputTextModule,
    InputNumber,
    ProfileModule,
  ],
})
export class DashboardsModule {}
