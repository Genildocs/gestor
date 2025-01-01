import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaidaRoutingModule } from './saida-routing.module';
import { SaidaComponent } from './saida.component';


@NgModule({
  declarations: [
    SaidaComponent
  ],
  imports: [
    CommonModule,
    SaidaRoutingModule
  ]
})
export class SaidaModule { }
