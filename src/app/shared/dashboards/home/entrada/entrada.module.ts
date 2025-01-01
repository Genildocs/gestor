import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradaRoutingModule } from './entrada-routing.module';
import { EntradaComponent } from './entrada.component';


@NgModule({
  declarations: [
    EntradaComponent
  ],
  imports: [
    CommonModule,
    EntradaRoutingModule
  ]
})
export class EntradaModule { }
