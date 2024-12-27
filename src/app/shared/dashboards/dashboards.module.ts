import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { HomeComponent } from './home/home.component';
import { ContasComponent } from './home/contas/contas.component';
import { ComponentsModule } from '../components/components.module';
import { TransacoesComponent } from './home/transacoes/transacoes.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';

@NgModule({
  declarations: [HomeComponent, ContasComponent, TransacoesComponent],
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
