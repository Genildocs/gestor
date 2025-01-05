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
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { CalendarComponent } from './home/calendar/calendar.component';
import { ContasComponent } from './home/contas/contas.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './home/profile/profile.component';
import { TransacoesComponent } from './home/transacoes/transacoes.component';
import { RelatorioComponent } from './home/relatorio/relatorio.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContasComponent,
    TransacoesComponent,
    ProfileComponent,
    CalendarComponent,
    RelatorioComponent,
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
  ],
})
export class DashboardsModule {}
